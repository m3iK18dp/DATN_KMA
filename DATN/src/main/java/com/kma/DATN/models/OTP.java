package com.kma.DATN.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "otp")
public class OTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String otp;

    @NotBlank
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OTPType otpType;

    @Column(nullable = false)
    private LocalDateTime createTime = LocalDateTime.now();
}
