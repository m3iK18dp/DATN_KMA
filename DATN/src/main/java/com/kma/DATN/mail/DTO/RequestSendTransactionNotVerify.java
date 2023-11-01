package com.kma.DATN.mail.DTO;

import com.kma.DATN.converters.TransactionConverter;
import com.kma.DATN.models.Transaction;
import com.kma.DATN.models.TriggerType;
import jakarta.persistence.Convert;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class RequestSendTransactionNotVerify {
    private String email;
    @Convert(converter = TransactionConverter.class)
    private Transaction transaction;
    @Convert(converter = TransactionConverter.class)
    private Transaction changedTransaction;
    private Timestamp time;
    @Enumerated(EnumType.STRING)
    private TriggerType type;
}
