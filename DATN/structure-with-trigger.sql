-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: datn_demo
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
  `balance` bigint NOT NULL,
  `createdTime` datetime(6) NOT NULL,
  `USER_ID` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(255) NOT NULL,
  `status` enum('ACTIVE','DELETED','INACTIVE') NOT NULL,
  PRIMARY KEY (`accountNumber`),
  KEY `FK4ndw0837ydnl4etni9bfhl2cq` (`USER_ID`),
  CONSTRAINT `FK4ndw0837ydnl4etni9bfhl2cq` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `revoked` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(255) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `tokenFabric` varchar(255) DEFAULT NULL,
  `tokenType` enum('BEARER','RESET_PASSWORD') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2vfkhsdyoh3nbk8gih8pf04ls` (`USER_ID`),
  CONSTRAINT `FK2vfkhsdyoh3nbk8gih8pf04ls` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `amount` bigint NOT NULL,
  `transactionTime` datetime(6) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `recipientAccountNumber` varchar(255) DEFAULT NULL,
  `recipientFullName` varchar(255) DEFAULT NULL,
  `senderAccountNumber` varchar(255) DEFAULT NULL,
  `senderFullName` varchar(255) DEFAULT NULL,
  `transactionCode` varchar(255) NOT NULL,
  `transactionStatus` enum('FAILED','REFUSED','SUCCESS','WAIT_FOR_PIN') NOT NULL,
  `transactionType` enum('DEPOSIT','TRANSFER','WITHDRAW') NOT NULL,
  PRIMARY KEY (`transactionCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `triggerlog`
--

DROP TABLE IF EXISTS `triggerlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `triggerlog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `checked` bit(1) NOT NULL DEFAULT b'0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(50) NOT NULL,
  `TRANSACTION_CODE` varchar(10) NOT NULL,
  `transaction` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsmo2bao3ubsad302etaqi65i3` (`TRANSACTION_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `countIncorrectPassword` int NOT NULL,
  `createdTime` datetime(6) NOT NULL,
  `lastUpdated` datetime(6) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `status` enum('ACTIVE','DELETED','INACTIVE','NOT_YET_ACTIVE') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31  0:48:40
