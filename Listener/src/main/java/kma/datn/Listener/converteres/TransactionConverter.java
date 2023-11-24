package kma.datn.Listener.converteres;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import kma.datn.Listener.models.Transaction;

@Converter
public class TransactionConverter implements AttributeConverter<Transaction, String> {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Override
    public String convertToDatabaseColumn(Transaction transaction) {
        try {
            return objectMapper.writeValueAsString(transaction);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Transaction convertToEntityAttribute(String transactionJson) {
        try {
            return objectMapper.readValue(transactionJson, Transaction.class);
        } catch (Exception e) {
            return null;
        }
    }
}
