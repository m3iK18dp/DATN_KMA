package com.kma.DATN.controllers;

import com.kma.DATN.DTO.TransactionRequestDto;
import com.kma.DATN.models.ResponseObject;
import com.kma.DATN.models.TransactionStatus;
import com.kma.DATN.models.TransactionType;
import com.kma.DATN.services.ITransactionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.MultiMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    @Autowired
    private final ITransactionService transactionService;

    @GetMapping()
    public ResponseObject<Page<TransactionRequestDto>> getTransaction(@RequestParam(value = "_transaction_code", defaultValue = "") String transactionCode,
                                                                      @RequestParam(value = "_sender_account_number", defaultValue = "") String senderAccountNumber,
                                                                      @RequestParam(value = "_sender_name", defaultValue = "") String senderName,
                                                                      @RequestParam(value = "_recipient_account_number", defaultValue = "") String recipientAccountNumber,
                                                                      @RequestParam(value = "_recipient_name", defaultValue = "") String recipientName,
                                                                      @RequestParam(value = "_transaction_type", defaultValue = "") TransactionType transactionType,
                                                                      @RequestParam(value = "_transaction_status", defaultValue = "") TransactionStatus transactionStatus,
                                                                      @RequestParam(value = "_transaction_time", defaultValue = "") String transactionTime,
                                                                      @RequestParam(value = "_start_time", defaultValue = "") String startTime,
                                                                      @RequestParam(value = "_end_time", defaultValue = "") String endTime,
                                                                      @RequestParam(value = "_user_id", defaultValue = "-1") String userId,
                                                                      @RequestParam(value = "_account_number", defaultValue = "") String accountNumber,
                                                                      @RequestParam(value = "_keyword", defaultValue = "") String keyword,
                                                                      @RequestParam(value = "_verify", defaultValue = "false") boolean verify,
                                                                      @RequestParam(value = "_page", defaultValue = "0") int page,
                                                                      @RequestParam(value = "_limit", defaultValue = "10") int limit,
                                                                      @RequestParam(value = "_field", defaultValue = "transactionTime") String field,
                                                                      @RequestParam(value = "_type_sort", defaultValue = "desc") String typeSort,
                                                                      HttpServletRequest request
    ) {
        Page<TransactionRequestDto> transactions = new PageImpl<>(new ArrayList<>(), PageRequest.of(0, 10), 0);
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            transactions = transactionService.findTransactionsWithPaginationAndSort(
                    transactionCode, senderAccountNumber, senderName, recipientAccountNumber,
                    recipientName, transactionType, transactionStatus,
                    Objects.equals(transactionTime, "") ? null : LocalDateTime.parse(transactionTime + " 00:00:00", formatter),
                    Objects.equals(startTime, "") ? null : LocalDateTime.parse(startTime + " 00:00:00", formatter),
                    Objects.equals(endTime, "") ? null : LocalDateTime.parse(endTime + " 00:00:00", formatter),
                    userId, accountNumber, keyword, verify,
                    page, limit, field, typeSort, request);
            if (transactions.isEmpty()) {
                return new ResponseObject<>(
                        "failed",
                        "Not found Transactions.",
                        transactions
                );
            } else {
                return new ResponseObject<>(
                        "ok",
                        "Get All Successfully.",
                        transactions
                );
            }
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't get Transactions with filter. " + exception.getMessage(),
                    transactions
            );
        }
    }

    @GetMapping("/get_statistics")
    public ResponseObject<MultiMap<String, Object>> getStatistics(@RequestParam(value = "_transaction_code", defaultValue = "") String transactionCode,
                                                                  @RequestParam(value = "_sender_account_number", defaultValue = "") String senderAccountNumber,
                                                                  @RequestParam(value = "_sender_name", defaultValue = "") String senderName,
                                                                  @RequestParam(value = "_recipient_account_number", defaultValue = "") String recipientAccountNumber,
                                                                  @RequestParam(value = "_recipient_name", defaultValue = "") String recipientName,
                                                                  @RequestParam(value = "_transaction_type", defaultValue = "") TransactionType transactionType,
                                                                  @RequestParam(value = "_transaction_status", defaultValue = "") TransactionStatus transactionStatus,
                                                                  @RequestParam(value = "_transaction_time", defaultValue = "") String transactionTime,
                                                                  @RequestParam(value = "_start_time", defaultValue = "") String startTime,
                                                                  @RequestParam(value = "_end_time", defaultValue = "") String endTime,
                                                                  @RequestParam(value = "_user_id", defaultValue = "-1") String userId,
                                                                  @RequestParam(value = "_account_number", defaultValue = "") String accountNumber,
                                                                  @RequestParam(value = "_keyword", defaultValue = "") String keyword,
                                                                  HttpServletRequest request
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        MultiMap<String, Object> statistics = transactionService.getStatistics(
                transactionCode, senderAccountNumber, senderName, recipientAccountNumber,
                recipientName, transactionType, transactionStatus,
                Objects.equals(transactionTime, "") ? null : LocalDateTime.parse(transactionTime + " 00:00:00", formatter),
                Objects.equals(startTime, "") ? null : LocalDateTime.parse(startTime + " 00:00:00", formatter),
                Objects.equals(endTime, "") ? null : LocalDateTime.parse(endTime + " 00:00:00", formatter),
                userId, accountNumber, keyword, request
        );
        return new ResponseObject<>("ok", "Get Statistics Success", statistics);
    }

    @GetMapping("/get_statistics_month")
    public ResponseObject<MultiMap<String, Object>> getStatisticsThisMonthAndPreviousMonth(
            @RequestParam(value = "_account_number", defaultValue = "") String accountNumber,
            HttpServletRequest request
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        MultiMap<String, Object> statistics = transactionService.getStatisticsWithAccountNumber(accountNumber, request);
        return new ResponseObject<>("ok", "Get Statistics Month Success", statistics);
    }

    @GetMapping("/get_statistic_balance")
    public ResponseObject<MultiMap<String, Object>> getStatisticBalance(@RequestParam(value = "_transaction_code", defaultValue = "") String transactionCode,
                                                                        @RequestParam(value = "_sender_account_number", defaultValue = "") String senderAccountNumber,
                                                                        @RequestParam(value = "_sender_name", defaultValue = "") String senderName,
                                                                        @RequestParam(value = "_recipient_account_number", defaultValue = "") String recipientAccountNumber,
                                                                        @RequestParam(value = "_recipient_name", defaultValue = "") String recipientName,
                                                                        @RequestParam(value = "_transaction_type", defaultValue = "") TransactionType transactionType,
                                                                        @RequestParam(value = "_transaction_status", defaultValue = "") TransactionStatus transactionStatus,
                                                                        @RequestParam(value = "_transaction_time", defaultValue = "") String transactionTime,
                                                                        @RequestParam(value = "_start_time", defaultValue = "") String startTime,
                                                                        @RequestParam(value = "_end_time", defaultValue = "") String endTime,
                                                                        @RequestParam(value = "_user_id", defaultValue = "-1") String userId,
                                                                        @RequestParam(value = "_account_number", defaultValue = "") String accountNumber,
                                                                        @RequestParam(value = "_keyword", defaultValue = "") String keyword,
                                                                        HttpServletRequest request
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        MultiMap<String, Object> statistic = transactionService.getStatisticBalance(
                transactionCode, senderAccountNumber, senderName, recipientAccountNumber,
                recipientName, transactionType, transactionStatus,
                Objects.equals(transactionTime, "") ? null : LocalDateTime.parse(transactionTime + " 00:00:00", formatter),
                Objects.equals(startTime, "") ? null : LocalDateTime.parse(startTime + " 00:00:00", formatter),
                Objects.equals(endTime, "") ? null : LocalDateTime.parse(endTime + " 00:00:00", formatter),
                userId, accountNumber, keyword, request);
        return new ResponseObject<>("ok", "Get Statistic Balance Success", statistic);
    }

    @GetMapping("/{accountNumber}")
    public ResponseObject<List<TransactionRequestDto>> getAllTransactionsByAccountNumber(@PathVariable String accountNumber, HttpServletRequest request) {
        List<TransactionRequestDto> transactions = transactionService.getAllTransactionsByAccountNumber(accountNumber);
        return new ResponseObject<>("ok", "Get Transactions Success", transactions);
    }

    @PostMapping("/deposit")
    public ResponseObject<TransactionRequestDto> cashDeposit(
            @RequestParam("accountNumber") String accountNumber,
            @RequestParam("pin") String pin,
            @RequestParam("amount") Long amount,
            @RequestParam("otp") String otp,
            HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "Deposit success", transactionService.cashDeposit(accountNumber, pin, amount, otp, request));
        } catch (Exception exception) {
            return new ResponseObject<>("error", "Deposit failed " + exception.getMessage(), null);
        }
    }

    @PostMapping("/withdraw")
    public ResponseObject<TransactionRequestDto> cashWithdrawal(
            @RequestParam("accountNumber") String accountNumber,
            @RequestParam("pin") String pin,
            @RequestParam("amount") Long amount,
            @RequestParam("otp") String otp,
            HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "Withdraw success", transactionService.cashWithdrawal(accountNumber, pin, amount, otp, request));
        } catch (Exception exception) {
            return new ResponseObject<>("error", "Withdraw failed " + exception.getMessage(), null);
        }
    }

    @PostMapping("/transfer")
    public ResponseObject<TransactionRequestDto> fundTransfer(
            @RequestParam("senderAccountNumber") String senderAccountNumber,
            @RequestParam("recipientAccountNumber") String recipientAccountNumber,
            @RequestParam("pin") String pin,
            @RequestParam("amount") Long amount,
            @RequestParam(value = "description", defaultValue = "") String description,
            @RequestParam("otp") String otp,
            HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "Transfer success",
                    transactionService.fundTransfer(senderAccountNumber, recipientAccountNumber, pin, amount, description, otp, request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>("error", "Transfer failed " + exception.getMessage(), null);
        }
    }
}
