package com.kma.DATN.repositories;

import com.kma.DATN.models.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

@EnableJpaRepositories
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findByAccountNumber(String accountNumber);

    @Query(value = """
                SELECT ac.* FROM accounts ac WHERE
                       (LOWER(ac.accountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))) AND
                       (:userId = -1 OR ac.user_id = :userId)
            """, countQuery = """
                SELECT COUNT(ac.accountNumber) FROM accounts ac WHERE
                       (LOWER(ac.accountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))) AND
                       (:userId = -1 OR ac.user_id = :userId)
            """, nativeQuery = true)
    Page<Account> findAccountsWithPaginationAndSort(
            @Param("accountNumber") String accountNumber,
            @Param("userId") String userId,
            Pageable pageable
    );

    @Query(value = """
            SELECT ac.accountNumber FROM accounts ac
            ORDER BY ac.createdTime desc
            LIMIT 1
            """, nativeQuery = true)
    String findNewestAccount();
}
