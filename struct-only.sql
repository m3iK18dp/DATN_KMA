CREATE DATABASE  IF NOT EXISTS `datn_hyperwallet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `datn_hyperwallet`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: datn_hyperwallet
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `accountNumber` varchar(255) NOT NULL,
  `balance` bigint NOT NULL,
  `createdTime` datetime(6) NOT NULL,
  `status` enum('ACTIVE','DELETED','INACTIVE') NOT NULL,
  `USER_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`accountNumber`),
  KEY `FK4ndw0837ydnl4etni9bfhl2cq` (`USER_ID`),
  CONSTRAINT `FK4ndw0837ydnl4etni9bfhl2cq` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `otpType` enum('LOGIN','PASSWORD','PIN','REGISTER','TRANSACTION','UPDATE_INFO') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `revoked` int NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `tokenFabric` varchar(255) DEFAULT NULL,
  `tokenType` enum('BEARER','RESET_PASSWORD') DEFAULT NULL,
  `USER_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2vfkhsdyoh3nbk8gih8pf04ls` (`USER_ID`),
  CONSTRAINT `FK2vfkhsdyoh3nbk8gih8pf04ls` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionCode` varchar(255) NOT NULL,
  `amount` bigint NOT NULL,
  `description` varchar(200) NOT NULL,
  `recipientAccountNumber` varchar(255) DEFAULT NULL,
  `recipientFullName` varchar(255) DEFAULT NULL,
  `senderAccountNumber` varchar(255) NOT NULL,
  `senderFullName` varchar(255) NOT NULL,
  `transactionStatus` enum('FAILED','REFUSED','SUCCESS','WAIT_FOR_PIN') NOT NULL,
  `transactionTime` datetime(6) NOT NULL,
  `transactionType` enum('DEPOSIT','TRANSFER','WITHDRAW') NOT NULL,
  PRIMARY KEY (`transactionCode`),
  KEY `account_sender_idx` (`senderAccountNumber`),
  KEY `account_recipient_idx` (`recipientAccountNumber`),
  CONSTRAINT `account_recipient` FOREIGN KEY (`recipientAccountNumber`) REFERENCES `accounts` (`accountNumber`),
  CONSTRAINT `account_sender` FOREIGN KEY (`senderAccountNumber`) REFERENCES `accounts` (`accountNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`backend_datn`@`localhost`*/ /*!50003 TRIGGER `after_transaction_insert` AFTER INSERT ON `transactions` FOR EACH ROW BEGIN
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
    INSERT INTO TriggerLog (type, transaction)
    VALUES ('INSERT', @transactionJSON);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`backend_datn`@`localhost`*/ /*!50003 TRIGGER `after_transaction_update` AFTER UPDATE ON `transactions` FOR EACH ROW BEGIN
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
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    SET @changedTransactionJSON = JSON_SET(@changedTransactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    INSERT INTO TriggerLog (type, transaction, changedTransaction)
    VALUES ('UPDATE', @transactionJSON, @changedTransactionJSON);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`backend_datn`@`localhost`*/ /*!50003 TRIGGER `after_transaction_delete` AFTER DELETE ON `transactions` FOR EACH ROW BEGIN
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
    SET @transactionJSON = JSON_SET(@transactionJSON, '$.description', REPLACE(OLD.description, "'", "\\'"));
    INSERT INTO TriggerLog (type, transaction)
    VALUES ('DELETE', @transactionJSON);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `triggerlog`
--

DROP TABLE IF EXISTS `triggerlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `triggerlog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `changedTransaction` mediumtext,
  `checked` bit(1) NOT NULL DEFAULT b'0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction` mediumtext NOT NULL,
  `type` enum('DELETE','INSERT','UPDATE') NOT NULL,
  `got` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4788 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `countIncorrectPassword` int NOT NULL,
  `createdTime` datetime(6) NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `lastUpdated` datetime(6) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `status` enum('ACTIVE','DELETED','INACTIVE','NOT_YET_ACTIVE') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'datn_hyperwallet'
--

--
-- Dumping routines for database 'datn_hyperwallet'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-02 13:17:49
