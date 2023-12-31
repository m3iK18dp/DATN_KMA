package com.kma.DATN.repositories;

import com.kma.DATN.models.TriggerLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
public interface TriggerRepository extends JpaRepository<TriggerLog, Long> {

    @Query(value = """
                SELECT * FROM TriggerLog t
                WHERE t.checked = 0
            """, nativeQuery = true)
    List<TriggerLog> findTriggerNotCheck();

    @Query(value = """
                SELECT * FROM TriggerLog t
                WHERE   t.type = 'INSERT' AND
                        t.checked = 1 AND
                        t.transaction LIKE CONCAT('%','\\"transactionCode\\"\\:\\"',:transactionCode,'\\"', '%')
                ORDER BY t.id ASC
                LIMIT 1
            """, nativeQuery = true)
    Optional<TriggerLog> checkSendMail(@Param("transactionCode") String transactionCode);
}
