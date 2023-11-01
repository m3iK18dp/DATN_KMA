package com.kma.DATN.mail.DTO;

import com.kma.DATN.models.User;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RequestSendThankYou {
    private String email;
    private User user;
}
