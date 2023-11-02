package com.kma.DATN.repositories;


import com.kma.DATN.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = """
            SELECT * FROM Users u WHERE u.email = :email
            """, nativeQuery = true)
    Optional<User> findByEmail(@Param("email") String email);

    //    Optional<User> findByEmail(String email);
//    Optional<User> findByEmail(String email);

    //    @Query(value = """
//            DELETE FROM musicmanager.users_roles WHERE user_id = :id;
//            DELETE FROM musicmanager.users WHERE id = :id;
//            """, nativeQuery = true)
//    void deleteById(Long id);
//
//    @Query(value = """
//            DELETE FROM musicmanager.users_roles WHERE user_id = (
//                SELECT user_id FROM musicmanager.users WHERE email != 'admin@gmail.com'
//            );
//            DELETE FROM musicmanager.users WHERE email != 'admin@gmail.com';
//            """, nativeQuery = true)
//    void deleteAllUsersExceptAdmin();
    @Query(value = """
                SELECT u.* FROM users u WHERE
                       (:id = -1 OR u.id = :id) AND
                       (LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND
                       (CONCAT(LOWER(u.firstName),' ',LOWER(u.lastName)) LIKE LOWER(CONCAT('%', :name, '%'))) AND
                       (LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :phoneNumber, '%'))) AND
                       (:role IS NULL OR u.role = :role) AND
                       (
                       u.id IN
                           (
                                SELECT us.id FROM users us, accounts ac
                                WHERE ac.user_id = us.id AND
                                (
                                    LOWER(ac.accountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%')) OR
                                    LOWER(ac.accountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))
                                )
                           )
                       )
            """, countQuery = """
                SELECT COUNT(u.id) FROM users u WHERE
                       (:id = -1 OR u.id = :id) AND
                       (LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND
                       (CONCAT(LOWER(u.firstName),' ',LOWER(u.lastName)) LIKE LOWER(CONCAT('%', :name, '%'))) AND
                       (LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :phoneNumber, '%'))) AND
                       (:role IS NULL OR u.role = :role) AND
                       (
                       u.id IN
                           (
                            SELECT us.id FROM users us, accounts ac
                            WHERE ac.user_id = us.id AND
                                (
                                    LOWER(ac.accountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%')) OR
                                    LOWER(ac.accountNumber) LIKE LOWER(CONCAT('%', :accountNumber, '%'))
                                )
                           )
                       )
            """, nativeQuery = true)
    Page<User> findUsersWithPaginationAndSort(
            @Param("id") String id,
            @Param("email") String email,
            @Param("name") String name,
            @Param("phoneNumber") String phoneNumber,
            @Param("accountNumber") String accountNumber,
            @Param("role") String role,
            Pageable pageable
    );

    @Query(value = """
            SELECT u.* FROM users u, accounts a
            WHERE u.id = a.user_id AND a.accountNumber = :accountNumber
            """, nativeQuery = true)
    User getUserByAccountNumber(@Param("accountNumber") String accountNumber);


//    @Query(value = """
//            SELECT u.* FROM musicmanager.users u, musicmanager.roles r, musicmanager.users_roles ur
//            WHERE u.id=ur.USER_ID AND r.id=ur.ROLE_ID AND r.id= :roleId
//            """, nativeQuery = true)
//    Page<User> findUsersByRoleName(int roleId, Pageable pageable);


//    @Query(value = """
//            SELECT u.*
//            FROM users u
//            INNER JOIN users_roles ur ON u.id = ur.user_id
//            INNER JOIN roles r ON ur.role_id = r.id
//            WHERE r.id IN :roleIds
//            GROUP BY u.id
//            HAVING COUNT(DISTINCT r.id) = :countRoleNames
//            """, nativeQuery = true)
//    Page<User> findUsersByRoles(@Param("roleIds") List<Long> roleIds, @Param("countRoleNames") int countRoleNames, Pageable pageable);


//    User findByAccountAccountNumber(String accountNumber);
}