package com.kma.DATN.repositories;

import com.kma.DATN.models.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@EnableJpaRepositories
public interface AccountRepository extends JpaRepository<Account, String> {


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

    @Modifying
    @Transactional
//    @Lock(LockModeType.PESSIMISTIC_WRITE)
//    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "5000")})
    @Query(value = """
            UPDATE accounts a
            SET a.balance = a.balance + (:amount)
            WHERE a.accountNumber = :account
            """, nativeQuery = true)
    void changeBalance(@Param("account") String account, @Param("amount") long amount);

    Account findByAccountNumber(String accountNumber);
}
