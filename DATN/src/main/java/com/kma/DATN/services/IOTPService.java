package com.kma.DATN.services;

import com.kma.DATN.models.OTPType;
import org.springframework.stereotype.Service;

@Service

public interface IOTPService {
    Boolean checkOTP(String email, OTPType type, String otp);

    Boolean createOTP(String email, OTPType type);

}
