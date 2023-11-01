package com.kma.DATN.services.impl;//package com.kma.DATN.services.impl;

import com.kma.DATN.DTO.AccountRequestDto;
import com.kma.DATN.models.*;
import com.kma.DATN.repositories.AccountRepository;
import com.kma.DATN.repositories.TokenRepository;
import com.kma.DATN.repositories.UserRepository;
import com.kma.DATN.services.IAccountService;
import com.kma.DATN.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl implements IAccountService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final TokenRepository tokenRepository;
    @Autowired
    private final AccountRepository accountRepository;


    @Override
    public User extractUser(HttpServletRequest request) {

        if (request.getHeader("Authorization") != null) {
            if (!request.getHeader("Authorization").startsWith("Bearer "))
                throw new RuntimeException("Token is invalid.");
            JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
            String token = request.getHeader("Authorization").substring(7);
            Token tokenInRepo = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token invalid, not found in data"));
            if (tokenInRepo.getTokenType() != TokenType.BEARER)
                throw new RuntimeException("Token is not Bearer token");
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
            }).orElse(null);
        }
        return null;
    }

    @Override
    public AccountRequestDto createAccount(User user) {
        String accountNumber = generateUniqueAccountNumber();
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setBalance(0L);
        account.setUser(user);
        account.setCreatedTime(LocalDateTime.now().withNano(0));
        return new AccountRequestDto(accountRepository.save(account));
    }

    @Override
    public Account createAccountWhenCreate(User user) {
        String accountNumber = generateUniqueAccountNumber();
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setBalance(0L);
        account.setUser(user);
        account.setCreatedTime(LocalDateTime.now().withNano(0));
        return accountRepository.save(account);
    }

    private String generateUniqueAccountNumber() {
        String accountNumber;
        do {
            // Generate a UUID as the account number
            accountNumber = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);
        } while (accountRepository.findByAccountNumber(accountNumber) != null);

        return accountNumber;
    }

    @Override
    public Page<AccountRequestDto> findAccountsWithPaginationAndSort(
            String accountNumber,
            String userId,
            int page,
            int limit,
            String field,
            String typeSort,
            HttpServletRequest request) {
        User user = extractUser(request);
        Pageable pageable = PageRequest.of(page, limit)
                .withSort(Sort.by(typeSort.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, field));
        return AccountRequestDto.fromAccounts(
                accountRepository.findAccountsWithPaginationAndSort(
                        accountNumber,
//                        Objects.equals(userId, "-1")?
                        user.getId()
//                        :userId
                        , pageable
                ), pageable
        );
    }

}
