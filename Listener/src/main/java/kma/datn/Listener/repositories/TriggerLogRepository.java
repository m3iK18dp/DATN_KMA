package kma.datn.Listener.repositories;

import kma.datn.Listener.models.TriggerLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface TriggerLogRepository extends JpaRepository<TriggerLog, Long> {
    @Query(value = """
                SELECT * FROM TriggerLog t
                WHERE t.checked = 0
            """, nativeQuery = true)
    List<TriggerLog> findTriggerNotCheck();

    @Query(value = """
                SELECT * FROM TriggerLog t
                WHERE t.checked = 0 AND t.got = 0
            """, nativeQuery = true)
    List<TriggerLog> findTriggerNotCheckAndNotGot();

//    @Query(value = """
//                SELECT * FROM TriggerLog t
//                WHERE t.checked = 0
//                ORDER BY createdAt desc
//                LIMIT :rows
//            """, nativeQuery = true)
//    List<TriggerLog> findTriggerNotCheck(@Param(value="rows") Integer rows);
}
