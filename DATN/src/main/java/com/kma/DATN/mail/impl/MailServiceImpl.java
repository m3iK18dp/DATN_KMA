package com.kma.DATN.mail.impl;

import com.kma.DATN.configures.GlobalConfig;
import com.kma.DATN.mail.DTO.*;
import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.User;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class MailServiceImpl implements IMailService {
    private final static String URL_MAIL_SERVER = GlobalConfig.getConfig("url_mail_server").toString();

    @Override
    public Boolean sendMailOTPRegister(String username, String otp, LocalDateTime time) {
        HttpHeaders headers = new HttpHeaders();
        RequestSendOTP requestBody = new RequestSendOTP();
        requestBody.setEmail(username);
        requestBody.setOtp(otp);
        requestBody.setTime(time.format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
        HttpEntity<RequestSendOTP> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-otp-register",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailOTPLogin(String username, String otp, LocalDateTime time) {
        HttpHeaders headers = new HttpHeaders();
        RequestSendOTP requestBody = new RequestSendOTP();
        requestBody.setEmail(username);
        requestBody.setOtp(otp);
        requestBody.setTime(time.format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
        HttpEntity<RequestSendOTP> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-otp-login",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailOTPTransaction(String username, String otp, LocalDateTime time) {
        HttpHeaders headers = new HttpHeaders();
        RequestSendOTP requestBody = new RequestSendOTP();
        requestBody.setEmail(username);
        requestBody.setOtp(otp);
        requestBody.setTime(time.format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
        HttpEntity<RequestSendOTP> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-otp-transaction",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailThankYou(String username, User user) {
        HttpHeaders headers = new HttpHeaders();
        RequestSendThankYou requestBody = new RequestSendThankYou();
        requestBody.setEmail(username);
        requestBody.setUser(user);
        HttpEntity<RequestSendThankYou> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-thank-you",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailResetPassword(String username, String token, LocalDateTime time) {
        HttpHeaders headers = new HttpHeaders();
        RequestResetPassword requestBody = new RequestResetPassword();
        requestBody.setEmail(username);
        requestBody.setToken(token);
        requestBody.setTime(time.format(DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a")));
        HttpEntity<RequestResetPassword> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-reset-password",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailTransactionVerify(RequestSendTransactionVerify requestSendTransactionVerify) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<RequestSendTransactionVerify> requestEntity = new HttpEntity<>(requestSendTransactionVerify, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-transaction-verify",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailTransactionVerifyToRecipient(RequestSendTransactionVerify requestSendTransactionVerify) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<RequestSendTransactionVerify> requestEntity = new HttpEntity<>(requestSendTransactionVerify, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-transaction-verify-to-recipient",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailTransactionNotVerify(RequestSendTransactionNotVerify requestSendTransactionNotVerify) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<RequestSendTransactionNotVerify> requestEntity = new HttpEntity<>(requestSendTransactionNotVerify, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-transaction-not-verify",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }

    @Override
    public Boolean sendMailEvent(RequestSendEvent requestSendEvent) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<RequestSendEvent> requestEntity = new HttpEntity<>(requestSendEvent, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity
                = restTemplate.exchange
                (
                        URL_MAIL_SERVER + "send-mail-event",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );
        if (responseEntity.getStatusCode() != HttpStatus.OK)
            throw new RuntimeException("Failed send mail to user");
        String responseObject = responseEntity.getBody();
        assert responseObject != null;
        return responseObject.contains("- Success");
    }
}
