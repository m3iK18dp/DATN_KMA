package com.kma.DATN.DTO;

import com.kma.DATN.models.Account;
import com.kma.DATN.models.AccountStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Setter
@Getter
public class AccountRequestDto {
    //    private Long id;
    private Long balance;
    private String accountNumber;
    private String description;
    private AccountStatus status;
    //    private List<TransactionRequestDto> transactionsSender;
    //    private List<TransactionRequestDto> transactionsRecipient;
    //    private UserRequestDto user;
    private LocalDateTime createdTime;

    public AccountRequestDto(Account account) {
        //        this.id = account.getId();
        this.balance = account.getBalance();
        this.accountNumber = account.getAccountNumber();
        //        this.description = account.getDescription();
        this.status = account.getStatus();
        //        this.transactionsSender = account.getTransactionsSender().stream().map(TransactionRequestDto::new).collect(Collectors.toList());
        //        this.transactionsRecipient = account.getTransactionsRecipient().stream().map(TransactionRequestDto::new).collect(Collectors.toList());
        //        this.user = new UserRequestDto(account.getUser());
        this.createdTime = account.getCreatedTime();
    }

    public static Page<AccountRequestDto> fromAccounts(Page<Account> bids, Pageable pageable) {
        return new PageImpl<>(
                bids.getContent()
                        .stream()
                        .map(AccountRequestDto::new)
                        .collect(Collectors.toList()
                        ),
                pageable,
                bids.getTotalElements()
        );
    }

}
