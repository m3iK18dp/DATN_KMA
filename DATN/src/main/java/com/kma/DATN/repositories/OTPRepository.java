package com.kma.DATN.repositories;//package com.kma.DATN.repositories;//package com.kma.DATN.repositories;

import com.kma.DATN.models.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

@EnableJpaRepositories
public interface OTPRepository extends JpaRepository<OTP, Long> {
    @Query(value = """
            SELECT * FROM otp WHERE otp.email = :email AND otp.otpType = :type
            """, nativeQuery = true)
    OTP findOTPByEmailAndType(@Param("email") String email, @Param("type") String type);
}

