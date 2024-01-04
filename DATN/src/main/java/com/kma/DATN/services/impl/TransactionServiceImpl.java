package com.kma.DATN.services.impl;

import com.kma.DATN.DTO.TransactionRequestDto;
import com.kma.DATN.exception.InsufficientBalanceException;
import com.kma.DATN.exception.NotFoundException;
import com.kma.DATN.exception.UnauthorizedException;
import com.kma.DATN.fabric.DTO.TransactionFabric;
import com.kma.DATN.fabric.IHyperledgerFabricService;
import com.kma.DATN.models.*;
import com.kma.DATN.repositories.AccountRepository;
import com.kma.DATN.repositories.TokenRepository;
import com.kma.DATN.repositories.TransactionRepository;
import com.kma.DATN.repositories.UserRepository;
import com.kma.DATN.services.IOTPService;
import com.kma.DATN.services.ITransactionService;
import com.kma.DATN.util.JwtTokenUtil;
import com.kma.DATN.websocket.WebSocketService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.MultiMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements ITransactionService {
    private static final Logger logger = LogManager.getLogger(TransactionServiceImpl.class);
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final IOTPService otpService;
    @Autowired
    private final TokenRepository tokenRepository;
    @Autowired
    private final TransactionRepository transactionRepository;
    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private final IHyperledgerFabricService hyperledgerFabricService;
    @Autowired
    private final WebSocketService webSocketService;
    @Autowired
    private EntityManager entityManager;

    @Override
    public User extractUser(HttpServletRequest request) {
        if (request.getHeader("Authorization") != null) {
            if (!request.getHeader("Authorization").startsWith("Bearer "))
                throw new RuntimeException("Token is invalid.");
            JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
            String token = request.getHeader("Authorization").substring(7);
            Token tokenInRepo = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token not found in data"));
            if (tokenInRepo.getTokenType() != TokenType.BEARER)
                throw new RuntimeException("Token invalid, not found in data");
            return userRepository.findByEmail(jwtTokenUtil.extractUserName(token)).map(user -> {
                if (jwtTokenUtil.isTokenExpired(token))
                    throw new RuntimeException("Your token has expired, please re-enter to make a new token.");
                if (user.getStatus() == UserStatus.INACTIVE)
                    throw new RuntimeException(
                            "The user of the above token has been disabled.");
                if (user.getStatus() == UserStatus.NOT_YET_ACTIVE)
                    throw new RuntimeException(
                            "This user has not activated the pin code.");
                if (user.getStatus() == UserStatus.DELETED)
                    throw new RuntimeException(
                            "This user has been deleted.");
                return user;
            }).orElseThrow(() -> new RuntimeException("User not found"));
        }
        return null;
    }

    @Override
    public List<TransactionRequestDto> getAllTransactionsByAccountNumber(String accountNumber) {
        List<Transaction> transactions = transactionRepository.findTransactionsByAccountNumber(accountNumber);
        return TransactionRequestDto.fromTransactions(transactions);

    }

    @Override
    @Transactional
    public TransactionRequestDto cashDeposit(String accountNumber, String pin, long amount, String otp, HttpServletRequest request) {
        User user = extractUser(request);
        if (!otpService.checkOTP(user.getEmail(), OTPType.TRANSACTION, otp))
            throw new RuntimeException("OTP Invalid");
        if (!new BCryptPasswordEncoder().matches(pin, user.getPin())) {
            throw new UnauthorizedException("Invalid PIN");
        }
        if (user.getAccounts().stream().noneMatch(a -> Objects.equals(a.getAccountNumber(), accountNumber)))
            throw new RuntimeException("This account number is not yours");
        if (accountRepository.findByAccountNumber(accountNumber) == null) {
            throw new NotFoundException("Account not found");
        }
        entityManager.unwrap(Session.class).refresh(accountRepository.findByAccountNumber(accountNumber), LockModeType.PESSIMISTIC_WRITE);
        Transaction transaction = new Transaction();
        transaction.setTransactionCode(generateUniqueTransactionCode());
        transaction.setSenderAccountNumber(accountNumber);
        transaction.setSenderFullName(user.getFirstName() + " " + user.getLastName());
        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.DEPOSIT);
        transaction.setTransactionTime(LocalDateTime.now().withNano(0));
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setDescription("Deposit money from bank");
        if (hyperledgerFabricService.addTransaction(transaction, tokenRepository.findValidTokenByUserId(user.getId()).getTokenFabric())) {
            transactionRepository.save(transaction);
            accountRepository.changeBalance(accountNumber, amount);
        } else {
            throw new RuntimeException("Failed add transaction to fabric network");
        }
        return new TransactionRequestDto(transaction);
    }

    @Override
    @Transactional
    public TransactionRequestDto cashWithdrawal(String accountNumber, String pin, long amount, String otp, HttpServletRequest request) {
        User user = extractUser(request);
        if (!otpService.checkOTP(user.getEmail(), OTPType.TRANSACTION, otp))
            throw new RuntimeException("OTP Invalid");
        if (!new BCryptPasswordEncoder().matches(pin, user.getPin())) {
            throw new UnauthorizedException("Invalid PIN");
        }
        if (user.getAccounts().stream().noneMatch(a -> Objects.equals(a.getAccountNumber(), accountNumber)))
            throw new RuntimeException("This account number is not yours");
        Account account = accountRepository.findByAccountNumber(accountNumber);
        entityManager.unwrap(Session.class).refresh(account, LockModeType.PESSIMISTIC_WRITE);
        if (account == null) {
            throw new NotFoundException("Account not found");
        }
        if (account.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient balance");
        }
        Transaction transaction = new Transaction();
        transaction.setTransactionCode(generateUniqueTransactionCode());
        transaction.setSenderAccountNumber(accountNumber);
        transaction.setSenderFullName(user.getFirstName() + " " + user.getLastName());

        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.WITHDRAW);
        transaction.setTransactionTime(LocalDateTime.now().withNano(0));
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setDescription("Withdraw money to bank");
        if (
                hyperledgerFabricService.addTransaction(transaction, tokenRepository.findValidTokenByUserId(user.getId()).getTokenFabric())
        ) {
            transactionRepository.save(transaction);
            accountRepository.changeBalance(accountNumber, -1 * amount);
        } else {
//            accountRepository.changeBalance(accountNumber, amount);
            throw new RuntimeException("Failed add transaction to fabric network");
        }

        return new TransactionRequestDto(transaction);
    }

    @Override
    @Transactional
    public TransactionRequestDto fundTransfer(
            String senderAccountNumber,
            String recipientAccountNumber,
            String pin,
            long amount,
            String description,
            String otp,
            HttpServletRequest request) {
        User user = extractUser(request);
        if (!otpService.checkOTP(user.getEmail(), OTPType.TRANSACTION, otp))
            throw new RuntimeException("OTP Invalid");
        if (!new BCryptPasswordEncoder().matches(pin, user.getPin())) {
            throw new UnauthorizedException("Invalid PIN");
        }
        if (user.getAccounts().stream().noneMatch(a -> Objects.equals(a.getAccountNumber(), senderAccountNumber)))
            throw new RuntimeException("This account number is not yours");
        Account senderAccount = accountRepository.findByAccountNumber(senderAccountNumber);
        if (senderAccount == null) {
            throw new NotFoundException("Sender account not found");
        }
        entityManager.unwrap(Session.class).refresh(senderAccount, LockModeType.PESSIMISTIC_WRITE);
        Account recipientAccount = accountRepository.findByAccountNumber(recipientAccountNumber);
        if (recipientAccount == null) {
            throw new NotFoundException("Target account not found");
        }
        entityManager.unwrap(Session.class).refresh(recipientAccount, LockModeType.PESSIMISTIC_WRITE);
        if (senderAccount.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient balance");
        }
        Transaction transaction = new Transaction();
        transaction.setTransactionCode(generateUniqueTransactionCode());
        transaction.setSenderAccountNumber(senderAccountNumber);
        transaction.setSenderFullName(user.getFirstName() + " " + user.getLastName());
        transaction.setRecipientAccountNumber(recipientAccountNumber);
        transaction.setRecipientFullName(recipientAccount.getUser().getFirstName() + " " + recipientAccount.getUser().getLastName());
        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.TRANSFER);
        transaction.setTransactionTime(LocalDateTime.now().withNano(0));
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        if (Objects.equals(description, ""))
            transaction.setDescription("Send money to " + transaction.getRecipientFullName());
        else
            transaction.setDescription(description);
        if (hyperledgerFabricService.addTransaction(transaction, tokenRepository.findValidTokenByUserId(user.getId()).getTokenFabric())) {
            transactionRepository.save(transaction);
            accountRepository.changeBalance(senderAccountNumber, -1 * amount);
            accountRepository.changeBalance(recipientAccountNumber, amount);
            webSocketService.sendMessage(recipientAccountNumber, "refresh-trans-history");
        } else {
//            accountRepository.changeBalance(recipientAccountNumber, -1 * amount);
//            accountRepository.changeBalance(senderAccountNumber, amount);
            throw new RuntimeException("Failed add transaction to fabric network");
        }
        return new TransactionRequestDto(transaction);
    }

    @Override
    public Page<TransactionRequestDto> findTransactionsWithPaginationAndSort(String transactionCode, String senderAccountNumber, String senderName, String recipientAccountNumber, String recipientName, TransactionType transactionType, TransactionStatus transactionStatus, LocalDateTime transactionTime, LocalDateTime startTime, LocalDateTime endTime, String userId, String accountNumber, String keyword, boolean verify, int page, int limit, String field, String typeSort, HttpServletRequest request) {
        User userAuth = extractUser(request);
//        if (userAuth.getRole() != Role.ADMIN)
        userId = userAuth.getId();
        if (Objects.equals(accountNumber, ""))
            accountNumber = accountRepository.findNewestAccount();
        Pageable pageable = PageRequest.of(page, limit)
                .withSort(Sort.by(typeSort.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, field));

        Page<Transaction> transactions = transactionRepository.findTransactionsWithPaginationAndSort(
                transactionCode,
                senderAccountNumber,
                senderName,
                recipientAccountNumber,
                recipientName,
                transactionType == null ? "" : transactionType.toString(),
                transactionStatus == null ? "" : transactionStatus.toString(),
                transactionTime,
                startTime,
                endTime,
                userId,
                accountNumber,
                keyword,
                pageable);
        if (verify) {
            List<Transaction> listTransaction = transactions.getContent();
            List<TransactionFabric> listTransactionFabric = !transactions.isEmpty()
                    ? hyperledgerFabricService
                    .getTransactionByIds(
                            listTransaction.stream().map(Transaction::getTransactionCode).collect(Collectors.toList()),
                            tokenRepository.findValidTokenByUserId(userAuth.getId()).getTokenFabric()
                    )
                    : new ArrayList<>();
            return new PageImpl<>(
                    transactions.getContent()
                            .stream()
                            .map(transaction -> {
                                TransactionFabric transactionFabricFind = listTransactionFabric
                                        .stream()
                                        .filter(tf -> Objects.equals(tf.getId(), transaction.getTransactionCode()))
                                        .findFirst().orElse(null);
                                if (transactionFabricFind != null &&
                                        hyperledgerFabricService.checkTransactionWithTransactionHash(transaction, transactionFabricFind.getDataHash())
                                )
                                    return new TransactionRequestDto(transaction, Boolean.TRUE);
                                else
                                    return new TransactionRequestDto(transaction, Boolean.FALSE);

                            })
                            .collect(Collectors.toList()
                            ),
                    pageable,
                    transactions.getTotalElements()
            );
//            return new PageImpl<>(
//                    transactions.getContent().stream()
//                            .map(transaction -> {
//                                Optional<TransactionFabric> transactionFabricFind = listTransactionFabric.stream()
//                                        .filter(tf -> Objects.equals(tf.getId(), transaction.getTransactionCode()))
//                                        .findFirst();
//                                return new TransactionRequestDto(transaction, transactionFabricFind.isPresent() && new BCryptPasswordEncoder().matches(hyperledgerFabricService.convertTransactionToJSON(transaction), transactionFabricFind.get().getDataHash()));
//                            })
//                            .collect(Collectors.toList()),
//                    pageable,
//                    transactions.getTotalElements()
//            );
        }
        System.out.println(transactions.toString());
        return TransactionRequestDto.fromTransactions(
                transactions,
                pageable);
    }

    @Override
    public List<TransactionRequestDto> findTransactions(String transactionCode, String senderAccountNumber, String senderName, String recipientAccountNumber, String recipientName, TransactionType transactionType, TransactionStatus transactionStatus, LocalDateTime transactionTime, LocalDateTime startTime, LocalDateTime endTime, String userId, String accountNumber, String keyword, HttpServletRequest request) {
        User userAuth = extractUser(request);
//        if (userAuth.getRole() != Role.ADMIN)
        userId = userAuth.getId();
        if (Objects.equals(accountNumber, ""))
            accountNumber = accountRepository.findNewestAccount();
        List<Transaction> transactions = transactionRepository.findTransactionsWithFilter(
                transactionCode,
                senderAccountNumber,
                senderName,
                recipientAccountNumber,
                recipientName,
                transactionType == null ? "" : transactionType.toString(),
                transactionStatus == null ? "" : transactionStatus.toString(),
                transactionTime,
                startTime,
                endTime,
                userId,
                accountNumber,
                keyword
        );
        return TransactionRequestDto.fromTransactions(
                transactions
        );
    }

    @Override
    public MultiMap<String, Object> getStatistics(String transactionCode, String senderAccountNumber, String senderName, String recipientAccountNumber, String recipientName, TransactionType transactionType, TransactionStatus transactionStatus, LocalDateTime transactionTime, LocalDateTime startTime, LocalDateTime endTime, String userId, String accountNumber, String keyword, HttpServletRequest request) {
        MultiMap<String, Object> result = new MultiMap<>();
        List<Object> labels = new ArrayList<>();
        List<Object> deposit = new ArrayList<>();
        List<Object> withdraw = new ArrayList<>();
        List<Object> transfer = new ArrayList<>();
        List<Object> credited = new ArrayList<>();
        Long[] total = new Long[]{0L, 0L, 0L, 0L};
        User userAuth = extractUser(request);
        userId = userAuth.getId();
        if (Objects.equals(accountNumber, ""))
            accountNumber = accountRepository.findNewestAccount();
        String finalAccountNumber = accountNumber;
        List<Transaction> transactions = transactionRepository.findTransactionsWithFilter(
                transactionCode,
                senderAccountNumber,
                senderName,
                recipientAccountNumber,
                recipientName,
                transactionType == null ? "" : transactionType.toString(),
                transactionStatus == null ? "" : transactionStatus.toString(),
                transactionTime,
                startTime,
                endTime,
                userId,
                finalAccountNumber,
                keyword
        );
        transactions.forEach(transaction -> {
            labels.add(transaction.getTransactionTime().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
            if (transaction.getTransactionType() == TransactionType.DEPOSIT) {
                deposit.add(transaction.getAmount());
                total[0] += transaction.getAmount();
            }
            if (transaction.getTransactionType() == TransactionType.WITHDRAW) {
                withdraw.add(transaction.getAmount());
                total[1] += transaction.getAmount();
            }
            if (transaction.getTransactionType() == TransactionType.TRANSFER) {
                if (Objects.equals(transaction.getSenderAccountNumber(), finalAccountNumber)) {
                    transfer.add(transaction.getAmount());
                    total[2] += transaction.getAmount();
                } else {
                    credited.add(transaction.getAmount());
                    total[3] += transaction.getAmount();
                }

            }
        });
        result.put("label", labels);
        result.put("deposit", deposit);
        result.put("withdraw", withdraw);
        result.put("transfer", transfer);
        result.put("credited", credited);
        result.put("total", List.of(total));
        return result;
    }

    @Override
    public MultiMap<String, Object> getStatisticBalance(String transactionCode, String senderAccountNumber, String senderName, String recipientAccountNumber, String recipientName, TransactionType transactionType, TransactionStatus transactionStatus, LocalDateTime transactionTime, LocalDateTime startTime, LocalDateTime endTime, String userId, String accountNumber, String keyword, HttpServletRequest request) {
        MultiMap<String, Object> result = new MultiMap<>();
        List<Object> labels = new ArrayList<>();
        List<Object> balance = new ArrayList<>();
        User userAuth = extractUser(request);
        userId = userAuth.getId();

        if (Objects.equals(accountNumber, ""))
            accountNumber = accountRepository.findNewestAccount();
        String finalAccountNumber = accountNumber;
        List<Transaction> transactions = transactionRepository.findTransactionsWithFilter(
                transactionCode,
                senderAccountNumber,
                senderName,
                recipientAccountNumber,
                recipientName,
                transactionType == null ? "" : transactionType.toString(),
                transactionStatus == null ? "" : transactionStatus.toString(),
                transactionTime,
                startTime,
                endTime,
                userId,
                finalAccountNumber,
                keyword
        );
        Account account = accountRepository.findByAccountNumber(finalAccountNumber);
        labels.add(account.getCreatedTime().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
        balance.add(0L);
        AtomicInteger i = new AtomicInteger();
        transactions.forEach(transaction -> {
            labels.add(transaction.getTransactionTime().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
            if (transaction.getTransactionType() == TransactionType.DEPOSIT)
                balance.add((long) balance.get(i.get()) + transaction.getAmount());
            if (transaction.getTransactionType() == TransactionType.WITHDRAW)
                balance.add((long) balance.get(i.get()) - transaction.getAmount());
            if (transaction.getTransactionType() == TransactionType.TRANSFER) {
                if (Objects.equals(transaction.getSenderAccountNumber(), finalAccountNumber))
                    balance.add((long) balance.get(i.get()) - transaction.getAmount());
                else
                    balance.add((long) balance.get(i.get()) + transaction.getAmount());
            }
            i.getAndIncrement();
        });
        result.put("label", labels);
        result.put("balance", balance);
        return result;
    }

    @Override
    public MultiMap<String, Object> getStatisticsWithAccountNumber(String accountNumber, HttpServletRequest request) {
        MultiMap<String, Object> result = new MultiMap<>();
//        MultiMap<Integer, Long> deposit = new MultiMap<>();
        Long[] deposit = {1L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L};
        Long[] withdraw = {1L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L};
        Long[] transfer = {1L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L};
        Long[] credited = {1L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L};
        User userAuth = extractUser(request);
        if (Objects.equals(accountNumber, ""))
            accountNumber = accountRepository.findNewestAccount();
        String finalAccountNumber = accountNumber;
        List<Transaction> transactions = transactionRepository.findTransactionsWithAccountNumber(finalAccountNumber);
        AtomicInteger i = new AtomicInteger();
        int monthNow = LocalDateTime.now().getMonthValue();
        int monthPrev = LocalDateTime.now().minusMonths(1L).getMonthValue();
        transactions.forEach(transaction -> {
            if (transaction.getTransactionType() == TransactionType.DEPOSIT)
                deposit[transaction.getTransactionTime().getMonthValue()] += transaction.getAmount();
            if (transaction.getTransactionType() == TransactionType.WITHDRAW)
                withdraw[transaction.getTransactionTime().getMonthValue()] += transaction.getAmount();
            if (transaction.getTransactionType() == TransactionType.TRANSFER) {
                if (Objects.equals(transaction.getSenderAccountNumber(), finalAccountNumber))
                    transfer[transaction.getTransactionTime().getMonthValue()] += transaction.getAmount();
                else
                    credited[transaction.getTransactionTime().getMonthValue()] += transaction.getAmount();
            }
            i.getAndIncrement();
        });
        result.put("deposit", List.of(new Object[]{deposit[monthNow], deposit[monthPrev], 100.0 * deposit[monthNow] / (deposit[monthPrev] == 0 ? 1 : deposit[monthPrev])}));
        result.put("withdraw", List.of(new Object[]{withdraw[monthNow], withdraw[monthPrev], 100.0 * withdraw[monthNow] / (withdraw[monthPrev] == 0 ? 1 : withdraw[monthPrev])}));
        result.put("transfer", List.of(new Object[]{transfer[monthNow], transfer[monthPrev], 100.0 * transfer[monthNow] / (transfer[monthPrev] == 0 ? 1 : transfer[monthPrev])}));
        result.put("credited", List.of(new Object[]{credited[monthNow], credited[monthPrev], 100.0 * credited[monthNow] / (credited[monthPrev] == 0 ? 1 : credited[monthPrev])}));
        return result;
    }

    private String generateUniqueTransactionCode() {
        String transactionCode;
        do {
            // Generate a UUID as the account number
            transactionCode = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10);
        } while (transactionRepository.findByTransactionCode(transactionCode) != null);
        return transactionCode;
    }
}
