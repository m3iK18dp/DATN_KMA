package com.kma.DATN.services.trigger;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TriggerService {

    @PersistenceContext
    private EntityManager entityManager;

    private boolean isTriggerExists(String triggerName) {
        try {
            String checkTriggerSQL = "SHOW TRIGGERS WHERE triggers.trigger LIKE :triggerName";
            Query query = entityManager.createNativeQuery(checkTriggerSQL);
            query.setParameter("triggerName", triggerName);

            List<Object> result = query.getResultList();
            return result.isEmpty();
        } catch (Exception e) {

            return true;
        }
    }

    @Transactional
    public void createTriggers() {
        if (isTriggerExists("after_transaction_insert")) {
            String createInsertTriggerSQL =
//                    "CREATE TRIGGER after_transaction_insert " +
//                            "AFTER INSERT ON Transactions " +
//                            "FOR EACH ROW " +
//                            "BEGIN " +
//                            "    INSERT INTO TriggerLog (message,transaction_code,checked) VALUES ('INSERT Transaction', NEW.transactionCode,0); " +
//                            "END;";
                    """
                            CREATE TRIGGER after_transaction_insert
                            AFTER  INSERT ON Transactions
                            FOR EACH ROW
                            BEGIN
                                SET @transactionJSON = JSON_OBJECT(
                                    'transactionCode', NEW.transactionCode,
                                    'amount', NEW.amount,
                                    'senderAccountNumber', NEW.senderAccountNumber,
                                    'senderFullName', NEW.senderFullName,
                                    'recipientAccountNumber', NEW.recipientAccountNumber,
                                    'recipientFullName', NEW.recipientFullName,
                                    'transactionStatus', NEW.transactionStatus,
                                    'transactionType', NEW.transactionType,
                                    'transactionTime', NEW.transactionTime,
                                    'description', NEW.description
                                );
                                SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(NEW.description, "'", "\\\\'"));
                                INSERT INTO TriggerLog (type, transaction)
                                VALUES ('INSERT', @transactionJSON);
                            END;
                            """;
            entityManager.createNativeQuery(createInsertTriggerSQL).executeUpdate();
        }
        if (isTriggerExists("after_transaction_update")) {
//        try {
            // Create a trigger that runs after an UPDATE operation
            String createUpdateTriggerSQL =
//                    "CREATE TRIGGER after_transaction_update " +
//                            "AFTER UPDATE ON Transactions " +
//                            "FOR EACH ROW " +
//                            "BEGIN " +
//                            "    INSERT INTO TriggerLog (message,transaction_code,checked) VALUES ('UPDATE Transaction', NEW.transactionCode,0); " +
//                            "END;";
                    """
                            CREATE TRIGGER after_transaction_update
                            AFTER UPDATE ON Transactions
                            FOR EACH ROW
                            BEGIN
                                SET @transactionJSON = JSON_OBJECT(
                                    'transactionCode', OLD.transactionCode,
                                    'amount', OLD.amount,
                                    'senderAccountNumber', OLD.senderAccountNumber,
                                    'senderFullName', OLD.senderFullName,
                                    'recipientAccountNumber', OLD.recipientAccountNumber,
                                    'recipientFullName', OLD.recipientFullName,
                                    'transactionStatus', OLD.transactionStatus,
                                    'transactionType', OLD.transactionType,
                                    'transactionTime', OLD.transactionTime,
                                    'description', OLD.description
                                );
                                SET @changedTransactionJSON = JSON_OBJECT(
                                    'transactionCode', NEW.transactionCode,
                                    'amount', NEW.amount,
                                    'senderAccountNumber', NEW.senderAccountNumber,
                                    'senderFullName', NEW.senderFullName,
                                    'recipientAccountNumber', NEW.recipientAccountNumber,
                                    'recipientFullName', NEW.recipientFullName,
                                    'transactionStatus', NEW.transactionStatus,
                                    'transactionType', NEW.transactionType,
                                    'transactionTime', NEW.transactionTime,
                                    'description', NEW.description
                                );
                                SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\\\'"));
                                SET @changedTransactionJSON = JSON_SET(@changedTransactionJSON, '$.description', REPLACE(OLD.description, "'", "\\\\'"));
                                INSERT INTO TriggerLog (type, transaction, changedTransaction)
                                VALUES ('UPDATE', @transactionJSON, @changedTransactionJSON);
                            END;    
                            """;
            entityManager.createNativeQuery(createUpdateTriggerSQL).executeUpdate();

        }
        if (isTriggerExists("after_transaction_delete")) {
            // Create a trigger that runs after a DELETE operation
            String createDeleteTriggerSQL =
//                    "CREATE TRIGGER after_transaction_delete " +
//                            "AFTER DELETE ON Transactions " +
//                            "FOR EACH ROW " +
//                            "BEGIN " +
//                            "    INSERT INTO TriggerLog (message,transaction_code,checked) VALUES ('DELETE Transaction', OLD.transactionCode,0); " +
//                            "END;";
                    """
                            CREATE TRIGGER after_transaction_delete
                            AFTER DELETE ON Transactions
                            FOR EACH ROW
                            BEGIN
                                SET @transactionJSON = JSON_OBJECT(
                                    'transactionCode', OLD.transactionCode,
                                    'amount', OLD.amount,
                                    'senderAccountNumber', OLD.senderAccountNumber,
                                    'senderFullName', OLD.senderFullName,
                                    'recipientAccountNumber', OLD.recipientAccountNumber,
                                    'recipientFullName', OLD.recipientFullName,
                                    'transactionStatus', OLD.transactionStatus,
                                    'transactionType', OLD.transactionType,
                                    'transactionTime', OLD.transactionTime,
                                    'description', OLD.description
                                );
                                SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\\\'"));
                                INSERT INTO TriggerLog (type, transaction)
                                VALUES ('DELETE', @transactionJSON);
                            END;                    
                            """;
            entityManager.createNativeQuery(createDeleteTriggerSQL).executeUpdate();
        }
        String alterTableTriggerLogSQL =
                """
                        ALTER TABLE `TriggerLog`
                        CHANGE COLUMN `changedTransaction` `changedTransaction` MEDIUMTEXT NULL DEFAULT NULL,
                        CHANGE COLUMN `checked` `checked` BIT(1) NOT NULL DEFAULT 0,
                        CHANGE COLUMN `createdAt` `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        CHANGE COLUMN `transaction` `transaction` MEDIUMTEXT NOT NULL;
                        """;
        entityManager.createNativeQuery(alterTableTriggerLogSQL).executeUpdate();
    }
}

