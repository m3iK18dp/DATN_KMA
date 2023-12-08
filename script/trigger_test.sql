create database test_trigger;
use test_trigger;

CREATE TABLE Transaction (
    transactionCode INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE TriggerLog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    transaction_code VARCHAR(10) NOT NULL,
    checked bit NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction VARCHAR(255) NOT NULL
);

-- Create a trigger that runs after an INSERT operation
DELIMITER //
CREATE TRIGGER after_transaction_insert
AFTER  INSERT ON Transaction
FOR EACH ROW
BEGIN
        -- Chuyển cột 'row' thành đối tượng JSON
    SET @transactionJSON = JSON_OBJECT(
        'transactionCode', NEW.transactionCode,
        'amount', NEW.amount,
        'description', NEW.description
    );
    -- Chuyển thành JSONafter_transaction_delete_2
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(NEW.description, "'", "\\'"));
    INSERT INTO TriggerLog (message, transaction_code, checked, transaction)
    VALUES ('INSERT Transaction', NEW.transactionCode, 0, @transactionJSON);
END;
//DELIMITER ;

-- Create a trigger that runs after an UPDATE operation
-- DROP TRIGGER after_transaction_update;
DELIMITER //
CREATE TRIGGER after_transaction_update
AFTER UPDATE ON Transaction
FOR EACH ROW
BEGIN
    -- Chuyển cột 'row' thành đối tượng JSON
    SET @transactionJSON = JSON_OBJECT(
        'transactionCode', OLD.transactionCode,
        'amount', OLD.amount,
        'description', OLD.description
    );
    -- Chuyển thành JSONafter_transaction_delete_2
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    INSERT INTO TriggerLog (message, transaction_code, checked, transaction)
    VALUES ('UPDATE Transaction', OLD.transactionCode, 0, @transactionJSON);
END;
//DELIMITER ;

-- Create a trigger that runs after a DELETE operation
DELIMITER //
CREATE TRIGGER after_transaction_delete
AFTER DELETE ON Transaction
FOR EACH ROW
BEGIN
    -- Chuyển cột 'row' thành đối tượng JSON
    SET @transactionJSON = JSON_OBJECT(
        'transactionCodee', OLD.transactionCode,
        'amount', OLD.amount,
        'description', OLD.description
    );
    -- Chuyển thành JSONafter_transaction_delete_2
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    INSERT INTO TriggerLog (message, transaction_code, checked, transaction)
    VALUES ('DELETE Transaction', OLD.transactionCode, 0, @transactionJSON);
END;
//DELIMITER ;


SHOW TRIGGERs WHERE triggers.trigger LIKE 'after_transaction_insert';

CREATE TABLE Transaction (
    transactionCode INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE TriggerLog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    transaction_code VARCHAR(10) NOT NULL,
    checked bit NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction VARCHAR(255) NOT NULL
);

-- Create a trigger that runs after an INSERT operation
DELIMITER //
CREATE TRIGGER after_transaction_insert
AFTER  INSERT ON Transaction
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
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(NEW.description, "'", "\\'"));
    INSERT INTO TriggerLog (message, transaction_code, transaction)
    VALUES ('INSERT Transaction', NEW.transactionCode, @transactionJSON);
END;
//DELIMITER ;

-- Create a trigger that runs after an UPDATE operation
-- DROP TRIGGER after_transaction_update;
DELIMITER //
CREATE TRIGGER after_transaction_update
AFTER UPDATE ON Transaction
FOR EACH ROW
BEGIN
    -- Chuyển cột 'row' thành đối tượng JSON
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
    -- Chuyển thành JSONafter_transaction_delete_2
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    INSERT INTO TriggerLog (message, transaction_code, transaction)
    VALUES ('UPDATE Transaction', OLD.transactionCode, @transactionJSON);
END;
//DELIMITER ;

-- Create a trigger that runs after a DELETE operation
DELIMITER //
CREATE TRIGGER after_transaction_delete
AFTER DELETE ON Transaction
FOR EACH ROW
BEGIN
    -- Chuyển cột 'row' thành đối tượng JSON
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
    -- Chuyển thành JSONafter_transaction_delete_2
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    INSERT INTO TriggerLog (message, transaction_code, transaction)
    VALUES ('DELETE Transaction', OLD.transactionCode, @transactionJSON);
END;
//DELIMITER ;
