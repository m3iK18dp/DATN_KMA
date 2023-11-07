package com.kma.DATN.services;//package com.kma.DATN.services;

import com.kma.DATN.DTO.TransactionRequestDto;
import com.kma.DATN.models.TransactionStatus;
import com.kma.DATN.models.TransactionType;
import com.kma.DATN.models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.antlr.v4.runtime.misc.MultiMap;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface ITransactionService {

    User extractUser(HttpServletRequest request);

    List<TransactionRequestDto> getAllTransactionsByAccountNumber(String accountNumber);

    TransactionRequestDto cashDeposit(String accountNumber, String pin, long amount, String otp, HttpServletRequest request);

    TransactionRequestDto cashWithdrawal(String accountNumber, String pin, long amount, String otp, HttpServletRequest request);

    TransactionRequestDto fundTransfer(String senderAccountNumber, String recipientAccountNumber, String pin, long amount, String description, String otp, HttpServletRequest request);

    Page<TransactionRequestDto> findTransactionsWithPaginationAndSort(
            String transactionCode,
            String senderAccountNumber,
            String senderName,
            String recipientAccountNumber,
            String recipientName,
            TransactionType transactionType,
            TransactionStatus transactionStatus,
            LocalDateTime transactionTime,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String userId,
            String accountNumber,
            String keyword,
            boolean verify,
            int page,
            int limit,
            String field,
            String typeSort,
            HttpServletRequest request);

    List<TransactionRequestDto> findTransactions(
            String transactionCode,
            String senderAccountNumber,
            String senderName,
            String recipientAccountNumber,
            String recipientName,
            TransactionType transactionType,
            TransactionStatus transactionStatus,
            LocalDateTime transactionTime,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String userId,
            String accountNumber,
            String keyword,
            HttpServletRequest request);

    MultiMap<String, Object> getStatistics(
            String transactionCode,
            String senderAccountNumber,
            String senderName,
            String recipientAccountNumber,
            String recipientName,
            TransactionType transactionType,
            TransactionStatus transactionStatus,
            LocalDateTime localDateTime,
            LocalDateTime localDateTime1,
            LocalDateTime localDateTime2,
            String userId,
            String accountNumber,
            String keyword,
            HttpServletRequest request
    );

    MultiMap<String, Object> getStatisticBalance(
            String transactionCode,
            String senderAccountNumber,
            String senderName,
            String recipientAccountNumber,
            String recipientName,
            TransactionType transactionType,
            TransactionStatus transactionStatus,
            LocalDateTime localDateTime,
            LocalDateTime localDateTime1,
            LocalDateTime localDateTime2,
            String userId, String accountNumber,
            String keyword,
            HttpServletRequest request
    );

    MultiMap<String, Object> getStatisticsWithAccountNumber(String accountNumber, HttpServletRequest request);
}
