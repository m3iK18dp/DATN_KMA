package com.kma.DATN.mail.DTO;

import com.kma.DATN.models.EventHyper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequestSendEvent {
    private String email;
    private EventHyper eventHyper;
    private Timestamp time;
}
