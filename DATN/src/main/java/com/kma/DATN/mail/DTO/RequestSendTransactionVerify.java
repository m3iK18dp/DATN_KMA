package com.kma.DATN.mail.DTO;

import com.kma.DATN.converters.TransactionConverter;
import com.kma.DATN.models.Transaction;
import jakarta.persistence.Convert;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequestSendTransactionVerify {
    private String email;
    @Convert(converter = TransactionConverter.class)
    private Transaction transaction;
    private Timestamp time;
}
