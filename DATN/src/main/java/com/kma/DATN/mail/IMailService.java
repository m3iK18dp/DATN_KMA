package com.kma.DATN.mail;

import com.kma.DATN.mail.DTO.RequestSendEvent;
import com.kma.DATN.mail.DTO.RequestSendTransactionNotVerify;
import com.kma.DATN.mail.DTO.RequestSendTransactionVerify;
import com.kma.DATN.models.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public interface IMailService {
    Boolean sendMailOTPRegister(String username, String otp, LocalDateTime time);

    Boolean sendMailOTPLogin(String username, String otp, LocalDateTime time);

    Boolean sendMailOTPTransaction(String username, String otp, LocalDateTime time);

    Boolean sendMailThankYou(String username, User user);

    Boolean sendMailResetPassword(String username, String token, LocalDateTime time);

    Boolean sendMailTransactionVerify(RequestSendTransactionVerify requestSendTransactionVerify);

    Boolean sendMailTransactionVerifyToRecipient(RequestSendTransactionVerify requestSendTransactionVerify);

    Boolean sendMailTransactionNotVerify(RequestSendTransactionNotVerify requestSendTransactionNotVerify);

    Boolean sendMailEvent(RequestSendEvent requestSendEvent);
}
