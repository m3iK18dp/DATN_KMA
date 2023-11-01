package com.kma.DATN.mail.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RequestSendOTP {
    private String email;
    private String otp;
    private String time;
}
