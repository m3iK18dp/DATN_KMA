package com.kma.DATN.converters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kma.DATN.models.Transaction;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TransactionConverter implements AttributeConverter<Transaction, String> {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Override
    public String convertToDatabaseColumn(Transaction transaction) {
        try {
            return objectMapper.writeValueAsString(transaction);
        } catch (Exception e) {
            return null;
            // throw new RuntimeException("Error converting Transaction to JSON", e);
        }
    }

    @Override
    public Transaction convertToEntityAttribute(String transactionJson) {
        try {
            return objectMapper.readValue(transactionJson, Transaction.class);
        } catch (Exception e) {
            return null;
            // throw new RuntimeException("Error converting JSON to Transaction", e);
        }
    }
}
