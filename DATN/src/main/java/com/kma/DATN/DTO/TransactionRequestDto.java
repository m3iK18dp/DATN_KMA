package com.kma.DATN.DTO;

import com.kma.DATN.models.Transaction;
import com.kma.DATN.models.TransactionStatus;
import com.kma.DATN.models.TransactionType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
public class TransactionRequestDto {
    private String transactionCode;
    private LocalDateTime transactionTime;
    private Long amount;
    private String senderAccountNumber; //Tài khoản nguồn (sender account)
    private String senderFullName; //Tên tài khoản nguồn
    private String recipientAccountNumber; //Tài khoản nguồn (recipient account)
    private String recipientFullName; //Tên tài khoản nguồn
    private String description;
    private TransactionType transactionType;
    private TransactionStatus transactionStatus;
    private Boolean verify;

    public TransactionRequestDto(Transaction transaction) {
        this.transactionCode = transaction.getTransactionCode();
        this.transactionTime = transaction.getTransactionTime();
        this.amount = transaction.getAmount();
        this.senderAccountNumber = transaction.getSenderAccountNumber();
        this.senderFullName = transaction.getSenderFullName();
        this.recipientAccountNumber = transaction.getRecipientAccountNumber();
        this.recipientFullName = transaction.getRecipientFullName();
        this.description = transaction.getDescription();
        this.transactionType = transaction.getTransactionType();
        this.transactionStatus = transaction.getTransactionStatus();
        this.verify = null;
    }

    public TransactionRequestDto(Transaction transaction, Boolean verify) {
        this.transactionCode = transaction.getTransactionCode();
        this.transactionTime = transaction.getTransactionTime();
        this.amount = transaction.getAmount();
        this.senderAccountNumber = transaction.getSenderAccountNumber();
        this.senderFullName = transaction.getSenderFullName();
        this.recipientAccountNumber = transaction.getRecipientAccountNumber();
        this.recipientFullName = transaction.getRecipientFullName();
        this.description = transaction.getDescription();
        this.transactionType = transaction.getTransactionType();
        this.transactionStatus = transaction.getTransactionStatus();
        this.verify = verify;
    }

    public static List<TransactionRequestDto> fromTransactions(List<Transaction> transactions) {
        if (transactions == null)
            return new ArrayList<>();
        return
                transactions.stream()
                        .map(TransactionRequestDto::new)
                        .sorted((t1, t2) -> t2.getTransactionTime().compareTo(t1.getTransactionTime()))
                        .collect(Collectors.toList());
    }

    public static Page<TransactionRequestDto> fromTransactions(Page<Transaction> transactions, Pageable pageable) {
        return new PageImpl<>(
                transactions.getContent()
                        .stream()
                        .map(TransactionRequestDto::new)
                        .collect(Collectors.toList()
                        ),
                pageable,
                transactions.getTotalElements()
        );
    }
}
