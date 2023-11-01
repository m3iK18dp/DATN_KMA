package com.kma.DATN.repositories;

import com.kma.DATN.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@EnableJpaRepositories
public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query(value = """
                SELECT * FROM datn_demo.tokens t
                WHERE t.tokenType = 'BEARER' AND t.user_id = :userId AND t.REVOKED = 0
                ORDER BY t.id desc
                LIMIT 1
            """, nativeQuery = true)
    Token findValidTokenByUserId(@Param("userId") String userId);

    Optional<Token> findByToken(String token);

    @Query(value = """
            SELECT u.role FROM tokens t, users u
            WHERE t.tokenType = 'BEARER' AND t.token=:token AND t.user_id = u.id
            """, nativeQuery = true)
    String findRoleByToken(String token);

    @Modifying
    @Query(value = """
                UPDATE tokens t
                SET t.revoked = :status
                WHERE   t.tokenType = 'BEARER' AND
                        t.token != :token AND
                        t.user_id IN (
                            SELECT u.id FROM users u
                            WHERE u.email = :email
                        )
            """, nativeQuery = true)
    void revokeAllTokenWithoutCurrentTokenWithEmail(@Param("email") String email, @Param("status") int status, @Param("token") String token);

    @Modifying
    @Query(value = """
                UPDATE tokens t
                SET t.revoked = :status
                WHERE   t.user_id IN (
                            SELECT u.id FROM users u
                            WHERE u.email = :email
                        )
            """, nativeQuery = true)
    void changeRevokeWithEmail(@Param("email") String email, @Param("status") int status);

    @Modifying
    @Query(value = """
                UPDATE tokens t
                SET t.revoked = :status
                WHERE   t.tokenType = 'BEARER' AND
                        t.user_id IN (
                            SELECT u.id FROM users u
                            WHERE u.email = :email
                        )
            """, nativeQuery = true)
    void changeRevokeAllTokenBearerWithEmail(@Param("email") String email, @Param("status") int status);

    @Modifying
    @Query(value = """
                UPDATE tokens t
                SET t.revoked = :status
                WHERE   t.tokenType = 'RESET_PASSWORD' AND
                        t.user_id IN (
                            SELECT u.id FROM users u
                            WHERE u.email = :email
                        )
            """, nativeQuery = true)
    void changeRevokeAllUserResetPasswordTokens(@Param("email") String email, @Param("status") int status);
}
