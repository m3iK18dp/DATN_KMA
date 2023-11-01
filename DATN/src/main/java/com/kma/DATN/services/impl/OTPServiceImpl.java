package com.kma.DATN.services.impl;

import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.OTP;
import com.kma.DATN.models.OTPType;
import com.kma.DATN.repositories.OTPRepository;
import com.kma.DATN.services.IOTPService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OTPServiceImpl implements IOTPService {
    @Autowired
    private final OTPRepository otpRepository;
    @Autowired
    private final IMailService mailService;

    @Override
    public Boolean checkOTP(String email, OTPType type, String otp) {
        OTP currentOtp = otpRepository.findOTPByEmailAndType(email, type.toString());
        if (currentOtp == null) {
            throw new RuntimeException("OTP Invalid!");
        }
        // plusMinutes(2) từ lúc tạo -> Hạn 2 minutes
        if (!currentOtp.getCreateTime().plusSeconds(120).isAfter(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired!");
        }
        return Objects.equals(currentOtp.getOtp(), otp);
    }

    @Override
    public Boolean createOTP(String email, OTPType type) {
        OTP currentOtp = otpRepository.findOTPByEmailAndType(email, type.toString());
        LocalDateTime time = LocalDateTime.now();
        if (currentOtp != null && !currentOtp.getCreateTime().plusSeconds(60).isBefore(time)) {
            throw new RuntimeException("Please wait " + (
                    Duration.between(time, currentOtp.getCreateTime().plusSeconds(60)).getSeconds()
            ) + " seconds to generate a new OTP");
        }
        try {
            String otpGenerated = generateOTP();
            OTP otp = OTP.builder().otp(otpGenerated).email(email).otpType(type).createTime(time).build();
            if (currentOtp != null)
                otp.setId(currentOtp.getId());
            otpRepository.save(otp);
            if (type == OTPType.REGISTER) {
                mailService.sendMailOTPRegister(email, otpGenerated, time);
            } else if (type == OTPType.LOGIN) {
                mailService.sendMailOTPLogin(email, otpGenerated, time);
            } else if (type == OTPType.TRANSACTION) {
                mailService.sendMailOTPTransaction(email, otpGenerated, time);
            } else if (type == OTPType.PIN) {
//                mailService.sendMailOTPPIN(email, otpGenerated, time);
            } else if (type == OTPType.UPDATE_INFO) {
//                mailService.sendMailOTPPIN(email, otpGenerated, time);
            } else if (type == OTPType.PASSWORD) {
//                mailService.sendMailOTPPIN(email, otpGenerated, time);
            }
            return Boolean.TRUE;
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    private String generateOTP() {
        int otpLength = 6;
        String otpCharacters = "0123456789";
        StringBuilder otp = new StringBuilder(otpLength);
        Random random = new Random();
        for (int i = 0; i < otpLength; i++) {
            int index = random.nextInt(otpCharacters.length());
            char digit = otpCharacters.charAt(index);
            otp.append(digit);
        }
        return otp.toString();
    }
}
