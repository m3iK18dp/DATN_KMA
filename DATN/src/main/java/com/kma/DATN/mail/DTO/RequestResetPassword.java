package com.kma.DATN.mail.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RequestResetPassword {
    private String email;
    private String token;
    private String time;
}
