package com.kma.DATN.repositories;//package com.kma.DATN.repositories;

import com.kma.DATN.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

@EnableJpaRepositories
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    @Query(value = """
            SELECT * FROM transactions t WHERE t.senderAccountNumber = :accountNumber OR t.recipientAccountNumber = :accountNumber
            """, nativeQuery = true)
    List<Transaction> findTransactionsByAccountNumber(String accountNumber);


    Transaction findByTransactionCode(String transactionCode);

    @Query(value = """
            SELECT t.* FROM transactions t
            WHERE   (
                        :keyword = '' AND
                            (
                            (LOWER(t.transactionCode) LIKE LOWER(CONCAT('%', :transactionCode, '%'))) AND
                            (LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :senderAccountNumber, '%'))) AND
                            (LOWER(t.senderFullName) LIKE LOWER(CONCAT('%', :senderName, '%'))) AND
                            (t.recipientAccountNumber IS NULL OR LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :recipientAccountNumber, '%'))) AND
                            (t.recipientFullName IS NULL OR LOWER(t.recipientFullName) LIKE LOWER(CONCAT('%', :recipientName, '%'))) AND
                            (:transactionType = '' OR t.transactionType = :transactionType) AND
                            (:transactionStatus = '' OR t.transactionStatus = :transactionStatus) AND
                            (
                                :transactionTime IS NULL OR
                                (
                                    t.transactionTime >= :transactionTime
                                    AND t.transactionTime <= DATE_ADD(:transactionTime, INTERVAL 1 DAY)
                                )
                            ) AND
                            (:startTime IS NULL OR t.transactionTime >= :startTime) AND
                            (:endTime IS NULL OR t.transactionTime < DATE_ADD(:endTime, INTERVAL 1 DAY)) AND
                            (:userId = -1 OR
                                t.transactionCode IN (
                                    SELECT tr.transactionCode FROM transactions tr, accounts ac
                                    WHERE (tr.senderAccountNumber = ac.accountNumber OR tr.recipientAccountNumber = ac.accountNumber) AND
                                    ac.user_id = :userId
                                    )
                            ) AND
                            (
                                LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%')) OR
                                LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))
                            )
                        )
                    ) OR
                    (
                        :keyword != '' AND
                        (
                            (LOWER(t.transactionCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (LOWER(t.senderFullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (t.recipientAccountNumber IS NOT NULL AND LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (t.recipientFullName IS NOT NULL AND LOWER(t.recipientFullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
                        )
                    )
            """, countQuery = """
                SELECT COUNT(t.transactionCode) FROM transactions t
                WHERE   (
                            :keyword = '' AND
                            (
                                (LOWER(t.transactionCode) LIKE LOWER(CONCAT('%', :transactionCode, '%'))) AND
                                (LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :senderAccountNumber, '%'))) AND
                                (LOWER(t.senderFullName) LIKE LOWER(CONCAT('%', :senderName, '%'))) AND
                                (t.recipientAccountNumber IS NULL OR LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :recipientAccountNumber, '%'))) AND
                                (t.recipientFullName IS NULL OR LOWER(t.recipientFullName) LIKE LOWER(CONCAT('%', :recipientName, '%'))) AND
                                (:transactionType = '' OR t.transactionType = :transactionType) AND
                                (:transactionStatus = '' OR t.transactionStatus = :transactionStatus) AND
                                (
                                    :transactionTime IS NULL OR
                                    (
                                        t.transactionTime >= :transactionTime
                                        AND t.transactionTime <= DATE_ADD(:transactionTime, INTERVAL 1 DAY)
                                    )
                                ) AND
                                (:startTime IS NULL OR t.transactionTime >= :startTime) AND
                                (:endTime IS NULL OR t.transactionTime < DATE_ADD(:endTime, INTERVAL 1 DAY)) AND
                                (:userId = -1 OR
                                    t.transactionCode IN (
                                        SELECT tr.transactionCode FROM transactions tr, accounts ac
                                        WHERE (tr.senderAccountNumber = ac.accountNumber OR tr.recipientAccountNumber = ac.accountNumber) AND
                                        ac.user_id = :userId
                                        )
                                ) AND
                                (
                                    LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%')) OR
                                    LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))
                                )
                            )
                        ) OR
                        (
                            :keyword != '' AND
                            (
                                (LOWER(t.transactionCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                                (LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                                (LOWER(t.senderFullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                                (t.recipientAccountNumber IS NOT NULL AND LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                                (t.recipientFullName IS NOT NULL AND LOWER(t.recipientFullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                                (LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
                            )
                        )
            """, nativeQuery = true)
    Page<Transaction> findTransactionsWithPaginationAndSort(
            @Param("transactionCode") String transactionCode,
            @Param("senderAccountNumber") String senderAccountNumber,
            @Param("senderName") String senderName,
            @Param("recipientAccountNumber") String recipientAccountNumber,
            @Param("recipientName") String recipientName,
            @Param("transactionType") String transactionType,
            @Param("transactionStatus") String transactionStatus,
            @Param("transactionTime") LocalDateTime transactionTime,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime,
            @Param("userId") String userId,
            @Param("accountNumber") String accountNumber,
            @Param("keyword") String keyword,
            Pageable pageable);

    @Query(value = """
            SELECT t.* FROM transactions t
            WHERE   (
                        :keyword = '' AND
                            (
                            (LOWER(t.transactionCode) LIKE LOWER(CONCAT('%', :transactionCode, '%'))) AND
                            (LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :senderAccountNumber, '%'))) AND
                            (LOWER(t.senderFullName) LIKE LOWER(CONCAT('%', :senderName, '%'))) AND
                            (t.recipientAccountNumber IS NULL OR LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :recipientAccountNumber, '%'))) AND
                            (t.recipientFullName IS NULL OR LOWER(t.recipientFullName) LIKE LOWER(CONCAT('%', :recipientName, '%'))) AND
                            (:transactionType = '' OR t.transactionType = :transactionType) AND
                            (:transactionStatus = '' OR t.transactionStatus = :transactionStatus) AND
                            (
                                :transactionTime IS NULL OR
                                (
                                    t.transactionTime >= :transactionTime
                                    AND t.transactionTime <= DATE_ADD(:transactionTime, INTERVAL 1 DAY)
                                )
                            ) AND
                            (:startTime IS NULL OR t.transactionTime >= :startTime) AND
                            (:endTime IS NULL OR t.transactionTime < DATE_ADD(:endTime, INTERVAL 1 DAY)) AND
                            (:userId = -1 OR
                                t.transactionCode IN (
                                    SELECT tr.transactionCode FROM transactions tr, accounts ac
                                    WHERE (tr.senderAccountNumber = ac.accountNumber OR tr.recipientAccountNumber = ac.accountNumber) AND
                                    ac.user_id = :userId
                                    )
                            ) AND
                            (
                                LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%')) OR
                                LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))
                            )
                        )
                    ) OR
                    (
                        :keyword != '' AND
                        (
                            (LOWER(t.transactionCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (LOWER(t.senderAccountNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (LOWER(t.senderFullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (t.recipientAccountNumber IS NOT NULL AND LOWER(t.recipientAccountNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (t.recipientFullName IS NOT NULL AND LOWER(t.recipientFullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) OR
                            (LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
                        )
                    )
                    ORDER BY t.transactionTime asc
            """, nativeQuery = true)
    List<Transaction> findTransactionsWithFilter(
            @Param("transactionCode") String transactionCode,
            @Param("senderAccountNumber") String senderAccountNumber,
            @Param("senderName") String senderName,
            @Param("recipientAccountNumber") String recipientAccountNumber,
            @Param("recipientName") String recipientName,
            @Param("transactionType") String transactionType,
            @Param("transactionStatus") String transactionStatus,
            @Param("transactionTime") LocalDateTime transactionTime,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime,
            @Param("userId") String userId,
            @Param("accountNumber") String accountNumber,
            @Param("keyword") String keyword);

    @Query(value = """
                SELECT t.*
                FROM transactions t
                WHERE
                    (
                        LOWER(t.senderAccountNumber) = LOWER(:accountNumber) OR
                        LOWER(t.recipientAccountNumber) = LOWER(:accountNumber)
                    ) AND
                    (
                        DATE_FORMAT(t.transactionTime, '%Y-%m') = DATE_FORMAT(CURRENT_DATE , '%Y-%m')  OR
                        DATE_FORMAT(t.transactionTime, '%Y-%m') = DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y-%m')
                    )
                ORDER BY t.transactionTime DESC;

            """, nativeQuery = true)
    List<Transaction> findTransactionsWithAccountNumber(@Param("accountNumber") String accountNumber);

}

