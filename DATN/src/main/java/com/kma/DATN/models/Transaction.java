package com.kma.DATN.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@Entity
@Builder
@Table(name = "transactions")
@NoArgsConstructor
public class Transaction {
    @Id
    @Column(updatable = false)
    private String transactionCode;
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private LocalDateTime transactionTime;
    @Column(nullable = false)
    @Min(value = 0, message = "Value must be non-negative")
    private Long amount;
    @Column(nullable = false)
    private String senderAccountNumber;
    @Column(nullable = false)
    private String senderFullName;
    @Column
    private String recipientAccountNumber;
    @Column
    private String recipientFullName;
    @Column(length = 200, nullable = false)
    private String description;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus = TransactionStatus.WAIT_FOR_PIN;

//    @JsonIgnore
//    @Column(nullable = false)
//    private Boolean verify = false;
//    @JsonIgnore
//    @Column(nullable = false)
//    private Boolean sendMail = false;

//    @JsonIgnore
//    @OneToOne(mappedBy = "transactionCode")
//    private TransactionExtra transactionExtra;

//    @JsonIgnore
//    @OneToMany(mappedBy = "transaction")
//    private List<TriggerLog> triggerLogs;
//    @JsonIgnore
//    @ManyToOne()
//    @JoinColumn(name = "SENDER_ACCOUNT_ID", referencedColumnName = "transactionsSender")
//    private Account senderAccount;
//    @JsonIgnore
//    @ManyToOne()
//    @JoinColumn(name = "RECIPIENT_ACCOUNT_ID", referencedColumnName = "transactionsRecipient")
//    private Account recipientAccount;

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionCode='" + transactionCode + '\'' +
                ", transactionTime=" + transactionTime +
                ", amount=" + amount +
                ", senderAccountNumber='" + senderAccountNumber + '\'' +
                ", senderFullName='" + senderFullName + '\'' +
                ", recipientAccountNumber='" + recipientAccountNumber + '\'' +
                ", recipientFullName='" + recipientFullName + '\'' +
                ", description='" + description + '\'' +
                ", transactionType=" + transactionType +
                ", transactionStatus=" + transactionStatus +
                '}';
    }
}
