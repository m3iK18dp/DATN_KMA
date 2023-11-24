package kma.datn.Listener.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private String transactionCode;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private LocalDateTime transactionTime;
    private Long amount;
    private String senderAccountNumber;
    private String senderFullName;
    private String recipientAccountNumber;
    private String recipientFullName;
    private String description;
    private TransactionType transactionType;
    private final TransactionStatus transactionStatus = TransactionStatus.WAIT_FOR_PIN;


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