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
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('57986397',510000,'2023-12-07 00:37:00.000000','ACTIVE','2e2e1926'),('5a52e54f',300000,'2023-12-05 17:42:15.000000','ACTIVE','00000000'),('ade2b59d',280000,'2023-12-05 17:49:51.000000','ACTIVE','00000000'),('d9cac72b',140000,'2023-12-07 00:24:45.000000','ACTIVE','3d1f35e8');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (1,'2023-12-12 15:40:44.953825','datn.hyperwallet@gmail.com','$2a$10$zELhJ6376uI1LJZx1C8ENur1lJElvhRFPyJAMl6w/..P64bDF3Mza','TRANSACTION'),(2,'2023-12-07 00:24:01.667924','kiempham1245@gmail.com','639154','REGISTER'),(3,'2023-12-07 00:36:22.824385','kiempham1256@gmail.com','579394','REGISTER'),(4,'2023-12-14 13:58:43.759659','kiempham1256@gmail.com','$2a$10$PJhAXn6Y.Q7MAsl1Zh8cEunCODkQpvjDu4om8AzJA/OOq69Zh6V1u','TRANSACTION'),(5,'2023-12-07 01:53:35.953563','kiempham1245@gmail.com','804314','TRANSACTION'),(6,'2023-12-12 15:34:28.057992','datn.hyperwallet@gmail.com','$2a$10$JyD0GJ4NpnYBOX2aysz2i.wbEOL3u1evdBi57omQXsu6q19BMP/ca','LOGIN');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxMjgxODMxLCJleHAiOjE3MDEyODM2MzF9.cdEXaNmyQL6_uu5-NILoy3cNTudYp0EVwMQtSiPB1tMMh2Q6Jr4BcFWxXtlP_tXMduQDgthtH0boBzPfCIigCw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDEzMTc4MzIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTI4MTgzMn0.kdLBK6SmBlux-hepbRSrkUcm8UxAcQujJUZg78XPIDI','BEARER','00000000'),(2,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxMjgzNTQ2LCJleHAiOjE3MDEyODUzNDZ9.jVjIEdjX7sjDZbqlWyy14AZKV7DfACvJoknm81good2K9wyw3tiqzLDv93089rvwmP5yX3qh9yB7fC37dp77CA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDEzMTk1NDcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTI4MzU0N30.hVxbg9gf2KyFYQdYz60V0qLEzk9VtW45HOMoqsQCODU','BEARER','00000000'),(3,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxMzcyMTQwLCJleHAiOjE3MDEzNzM5NDB9.9Hoh0489TjSG9AIUH9bQY4D0hy-Xy9n41KDdAUYSgAnZ5BfnV2GD6Kyq9aZM4Jy1UZmqHwkkDfdib66C9SeBAg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE0MDgxNDAsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTM3MjE0MH0.m_VC5LFgxnaQHaWwVXQIYpCV3PCvrdFOQAiTWEGhOMU','BEARER','00000000'),(4,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc3MTY1NCwiZXhwIjoxNzAxNzczNDU0fQ.l_-FyOo_EBgvYlEjCOhW7ka0V-kQHvpy12vYd6bI04u0brWHE1bzVeCj7wkLij7wxrTFoZXAvQEDrOT_IkEQdQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MDc2NTUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc3MTY1NX0.OEBbXcy6xZ1wYZoSe8SbfTeMozZqKBIdybw3Fnb_i1U','BEARER','00000000'),(5,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc3MzUyNiwiZXhwIjoxNzAxNzc1MzI2fQ.XAnLAUV5myquzWOJlkAloVbr8aEuo-vThYIZGzGVrYqkGBIkh8nxZkDi4MwIDYbb68_00fqHYhAh9JphVcguuA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MDk1MjgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc3MzUyOH0.rW7gxvcULDVWJFKbeJQ7yf5D-MEWA-hy6qPqJEZ4DLo','BEARER','00000000'),(6,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc3NjYzOCwiZXhwIjoxNzAxNzc4NDM4fQ.wr_ekYxsvJRDxhecCzzMLT8CJRyMyHU_yg8R_prUMr36pis75_Dlsi1FTMkpxn63dAzu40FFvebGRBiWiZfmbA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MTI2MzksInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc3NjYzOX0.Hb_dXBNyhzBIJGLbMUshs_cbubEV1W-_VLNMndBTaYQ','BEARER','00000000'),(7,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc3ODQ3NywiZXhwIjoxNzAxNzgwMjc3fQ.o39dPRLeuRCML_rnauUOAP8KbwVtQee1KikdXgpaRBL38yN2Vi7p-MyjD4IAA1rd9LUsDrW7-LvGFdzkaW3-lA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MTQ0NzksInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc3ODQ3OX0.pN-T1eH6yqUIL0mMOJmaukuRC4jeCwQFC074Qs3tcDo','BEARER','00000000'),(8,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc3OTYyMywiZXhwIjoxNzAxNzgxNDIzfQ.-NSphB1iNu2QdRGUhpGTY7UZ0wP_-Q0zjAmUy83uUGx2kZHoKOv-hPUqHHvX1vYXm8WhoFq5yALj6-LBq1l8_A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MTU2MjUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc3OTYyNX0.rTWDPws8KKbgG23Ay39Zcp4W2zeAqXz9dSiq6z-LWMM','BEARER','00000000'),(9,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc4MTU2NiwiZXhwIjoxNzAxNzgzMzY2fQ.54_HhZhmQ2JIqCJ-Wbad5olO7iQChEnpMg4qWIyH_vcZARzRiMurAoGkaQoNgF3Zg6Bu9zVBGwq2BJ21NQTBKw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MTc1NjgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc4MTU2OH0.PKXLbRs7oEpjXf0-m5i00ajjWlEwH25ovGGPzd9rR28','BEARER','00000000'),(10,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTc4MjkzMSwiZXhwIjoxNzAxNzg0NzMxfQ.LY1RVI91YubJ6qULZ6NPY4zm4U_NQrPazwVFuvfEjhatiVXrhDBYlXRSh8ztlkPhTO_9uNbOSqvVfeEQKPuhUw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4MTg5MzMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTc4MjkzM30.xF-KiquKvY6dg8tnmhvKEjtFrKoI1ld3O6UjUSIgCtc','BEARER','00000000'),(11,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg0MzAwMCwiZXhwIjoxNzAxODQ0ODAwfQ.fBD1J1fhTC7PoBK8oRVd2B0m3l4HF4BJLF8SmpFuqnl3YodP_xqcBoeWwtLe9lklFwmFT3PnhdtcVs5yObZzog','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4NzkwMTEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg0MzAxMX0.JC8Mb9S1lq8S5tvsnlyBe00jH2xsrxbp4ffg5N4IJ7c','BEARER','00000000'),(12,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg0NDk2NSwiZXhwIjoxNzAxODQ2NzY1fQ.tBr2jhXFSKkhj4f1b9j4zAS1IIM3qtJdGbFe6JX_k9_ULJQ0LSA51mf_KHANuFeOIH029fdqVtY7TytQS_ssUw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4ODA5NzYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg0NDk3Nn0.DyrvA0Vc1nZ1xxkva536a_Q6c-21djIogzjbQL2a08U','BEARER','00000000'),(13,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg0NzQ1NywiZXhwIjoxNzAxODQ5MjU3fQ.98VNJ021WmhavOf72tAxEMjMV7zGUUKk51iqS7PnKMAmXRHrq-umBTdyB6XgHNFSr0V44gHkckXryD6fMf3fLg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4ODM0NjgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg0NzQ2OH0.ytSw5Q0zoEdvnD-tQZn4QUC9H3Trux-ngEDCnz9VQzw','BEARER','00000000'),(14,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg0OTczMSwiZXhwIjoxNzAxODUxNTMxfQ.DufMrvzSupsHidU8mYt5gBZcL82BSHl9T5sD_2pWsTunrfeewLnr3PRI-o9IvOfkbmi1c5AUppsj_Oe0M4s1Lg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4ODU3NDIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg0OTc0Mn0.6GDOGY9pDSoSoIpkXKBYj8uxiJfzrNLX_9EqmO46Dmw','BEARER','00000000'),(15,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg1MTU5NiwiZXhwIjoxNzAxODUzMzk2fQ.7iDXJCCq6bAn5s-rAHw8K5iarFjvrigf5dgdEgLwjDxWV5IwHx4IPvTqeu1iuMi_HBhpiz_JkhFKRcBgz8XsCw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4ODc2MDYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg1MTYwNn0.gBbR-RaOu9c1r9SxVql9gaw2cisMVRFjmCzVP8fjeVw','BEARER','00000000'),(16,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg1MzY3MywiZXhwIjoxNzAxODU1NDczfQ.trF8__aXdxMnDHX_TJOa4jdS_khzFl_uKF7VDt3vUGFYYJoHyrTcWNLHL4cLfluvxDPz2kKoAoaA5MuuEz3ZSQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4ODk2ODQsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg1MzY4NH0._fPfly7NfIItMOH6G9CptX7K8Z_fICgnboD0SYvorzM','BEARER','00000000'),(17,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg1NTY3NCwiZXhwIjoxNzAxODU3NDc0fQ.ybc8KrOQIyaMlfjJ3rYaltnzmMhB9MfF2hJM1XjCcczer_QvhdwqwLw6ymlfmQZi2WpvMvzG0-GjBEBGeW8U9A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4OTE2ODUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg1NTY4NX0.QDxTBOVQYdTCTX4L4m0DxWTRRybtGGSzGHAlMLLWJI4','BEARER','00000000'),(18,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg2MjA2NiwiZXhwIjoxNzAxODYzODY2fQ._tw8eO_K4h5a9FR9O7aZOw6De_zCdAYw5w1abJ6cfAEOwpvyCqb6MHelx_Kyshod8CoJyTUOBpijPItBF3GDHA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4OTgwNzcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg2MjA3N30.dBgzJGXChueZn9_b43eMwmaDoQ4nlqFC-bshW8bEnNc','BEARER','00000000'),(19,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg2MzkxOSwiZXhwIjoxNzAxODY1NzE5fQ.YX7GRHO3ro0NhgdDgwNVbodkYVdNoS7pHDg4iHQnlPIXGOm5u9TgqUK_50b_DCmYG2EI5rm1QdisYE3f71_nzA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4OTk5NDUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg2Mzk0NX0.lQAfV7zJ9f-HAem2CclZCeb5UMi0QEdV-9N-y7r8q6k','BEARER','00000000'),(20,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg2MzkzNCwiZXhwIjoxNzAxODY1NzM0fQ.Xmyz0YVh6EHKfSgP9cbLynvUM3pcGWM4ozDH3EZ5jyzh7cPfikswG48PutivrrfbEbp0waXrWWiTDa2jDrMEWw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4OTk5NDUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg2Mzk0NX0.lQAfV7zJ9f-HAem2CclZCeb5UMi0QEdV-9N-y7r8q6k','BEARER','00000000'),(21,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMTg4MzIxMSwiZXhwIjoxNzAxODg1MDExfQ.2UaCwE3sEuSHus9pgghxwDs3lS1JO_MnWuJbFUQdHoe-70sjZ7HEto4No2RmQ1rL2kFXMXS0tWpPC50XSunZ3Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MTkyMjIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg4MzIyMn0.azcSz2Rul04xos3UtsNx7QKZ2tnbUJaAHpoc-DUHU1s','BEARER','00000000'),(22,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNzAxODgzNDk4LCJleHAiOjE3MDE4ODUyOTh9.4UhhiNPSzPd8gT6KitwxA_SXsl4FIwawHDN5T5zPPve3BAWHcod01prmFhn_2RMxRSfvdO3Z0G7qMT8wczgOng','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MTk1MDksInVzZXJuYW1lIjoiM2QxZjM1ZTgiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg4MzUwOX0.EWhDRN0lYAriq5JNHHq8tClpIfnBToMkpP2ZMkp2Xjc','BEARER','3d1f35e8'),(23,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxODg0NTI0LCJleHAiOjE3MDE4ODYzMjR9.GYU_51NdDPRBIKuEch5L19QxDVpei_INrp02zJhJCxn-TBAXs_fcfGUmgp2fxcjWOr8FUHcLFIJOnDNfMKutbg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MjA1MzUsInVzZXJuYW1lIjoiMmUyZTE5MjYiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg4NDUzNX0.dJJYZilNENSZDzEn5IJiPACWI0T_jtNf0EGPnpifnpc','BEARER','2e2e1926'),(24,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxODg2NzE4LCJleHAiOjE3MDE4ODg1MTh9.Nc5bnHs6_k_73Gu9XpBL2iWEIh8Xf0HVqLjVLJGv26C9548Yg35iBwSs1w2FvVsPHUJhAe7yca4o3B7VeO7CAA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MjI3MzAsInVzZXJuYW1lIjoiMmUyZTE5MjYiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg4NjczMH0.Nc3Q__qqut8SIJLQcJaE2ibvsnYThTZAAmDTSqRNqYo','BEARER','2e2e1926'),(25,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNzAxODg4Njk5LCJleHAiOjE3MDE4OTA0OTl9.NrnRsMgmGpi8IOVEhxwOJ1aH7ul3qs7vRckPiUSi62jOLop_p9SREhc9mMxnYvrP-F4P5wf-AKp3S7D4pA_0tg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MjQ3MTEsInVzZXJuYW1lIjoiM2QxZjM1ZTgiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg4ODcxMX0.nFq4OPbfDiv6F1npLy8VeMd_KHYPxJRBCm4btDx2Utc','BEARER','3d1f35e8'),(26,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxODg5MjUzLCJleHAiOjE3MDE4OTEwNTN9.WYsuIHKsc2m2QttIxXvn9zm8vK4D5W3if_4FDnrEFhCqYXLwlEnWTM1n6R355-rfsXE2EgFLh86CEjOTJBIk8w','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MjUyNjQsInVzZXJuYW1lIjoiMmUyZTE5MjYiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg4OTI2NH0.ytXWHXGEwACuTLM5Z42tzOESW0zUf8aU9KK3_SvqR4A','BEARER','2e2e1926'),(27,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAxODk2NzQxLCJleHAiOjE3MDE4OTg1NDF9.s-a-cfy_ZXAsTVshQQ5z4ue1D8wiUMRgpPngDlhjvOT82HEof0JQGWHZrJo2ZB5WJYZdiFmW41n6iEjrRaiU7Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5MzI3NTIsInVzZXJuYW1lIjoiMmUyZTE5MjYiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMTg5Njc1Mn0.9wy2iUbLBHDpb3ep1IWWp2-EhVQKUzhDAcbjDlMESBk','BEARER','2e2e1926'),(28,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMjM3MDEwOCwiZXhwIjoxNzAyMzcxOTA4fQ.bhv0N28Ldbj4Va2n7vuA7kxdv286jsAIsO4m11XAbhRMs9bF4aXXEiZRu25-PKzILGSO5B-r1PkglDI1RuA-fw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI0MDYxMTYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMjM3MDExNn0.vBctpz-IuY6QQKwIp1wceKB-aefXRPJ7gpq-TRDCNzM','BEARER','00000000'),(29,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMjM3MDMxOSwiZXhwIjoxNzAyMzcyMTE5fQ.h7jPVR5fQr0tV8Vu_jTi4FL9cgPkDHpITaLmkDT3GfAo6OZae80CS5OYcuRPtnZUv0NVJa1uGYU9OgC4UGWA_A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI0MDYzMjcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMjM3MDMyN30.p6pL1RyLZVesU47ctsNEao8WyOs4_84H6EE0Jmb46Fs','BEARER','00000000'),(30,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXRuLmh5cGVyd2FsbGV0QGdtYWlsLmNvbSIsImlhdCI6MTcwMjUzNjkzMSwiZXhwIjoxNzAyNTM4NzMxfQ.kujiimoCptHQNBuL4U8hc90AE6itsQX8Ym--uZFzsViQxy6skKrjaeMhM5qwACes9YpeDyqkYlZ1whtb8FFgbQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1NzI5NDMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMjUzNjk0M30.8sHzi17eqZ3KL67fjHVRBqeJdjw_LSVIJRlWoMy_ONc','BEARER','00000000'),(31,0,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNTZAZ21haWwuY29tIiwiaWF0IjoxNzAyNTM3MDQ0LCJleHAiOjE3MDI1Mzg4NDR9.McN2GoJFZRk_clpU4LQpfbbR7fmzFvwBAm-RBefqYzpq6-V-a-wQfLHsmOa9WzoDH2KEnQngKqrFG7Xft8KUZA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1NzMwNTcsInVzZXJuYW1lIjoiMmUyZTE5MjYiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTcwMjUzNzA1N30.4Q8cGmjKOAg8dYYZvn-bUTLJdfu8ulgaFh1qLmS3Zv4','BEARER','2e2e1926');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('4649e0c02c',100000,'Deposit money from bank',NULL,NULL,'57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 01:19:29.000000','DEPOSIT'),('4d1ea11d46',100000,'Chuyển tiền','d9cac72b','Nguyễn Đình Khôi','57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-14 13:59:20.000000','TRANSFER'),('4e6d9fca2b',50000,'Deposit money from bank',NULL,NULL,'57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 00:54:07.000000','DEPOSIT'),('551f354213',40000,'Gửi tiền','d9cac72b','Nguyễn Đình Khôi','57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 00:58:37.000000','TRANSFER'),('5aaab5dfaf',100000,'Gửi tiền','5a52e54f','Phạm Đoàn Kiếm','ade2b59d','Phạm Đoàn Kiếm','SUCCESS','2023-12-12 15:41:17.000000','TRANSFER'),('62a33f4cdf',500000,'Deposit money from bank',NULL,NULL,'57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 01:29:39.000000','DEPOSIT'),('7e96a1ee2e',50000,'Gửi tiền','d9cac72b','Nguyễn Đình Khôi','57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 01:23:40.000000','TRANSFER'),('afb9199487',100000,'Gửi tiền trả','57986397','Phạm Đoàn Kiếm','d9cac72b','Nguyễn Đình Khôi','SUCCESS','2023-12-07 01:54:21.000000','TRANSFER'),('e05cfea426',50000,'Gửi tiền','d9cac72b','Nguyễn Đình Khôi','57986397','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 01:23:38.000000','TRANSFER'),('faa5d98df4',150000,'Deposit money from bank',NULL,NULL,'ade2b59d','Phạm Đoàn Kiếm','SUCCESS','2023-12-07 00:22:27.000000','DEPOSIT');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
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
-- Dumping data for table `triggerlog`
--

LOCK TABLES `triggerlog` WRITE;
/*!40000 ALTER TABLE `triggerlog` DISABLE KEYS */;
INSERT INTO `triggerlog` VALUES (4725,'null',_binary '','2023-12-06 08:47:30','{\"transactionCode\":\"2ac942b293\",\"transactionTime\":\"2023-12-06 15:47:28.000000\",\"amount\":150000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4726,'null',_binary '','2023-12-06 08:53:02','{\"transactionCode\":\"0b2a4231f3\",\"transactionTime\":\"2023-12-06 15:52:59.000000\",\"amount\":30000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"ade2b59d\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4731,'null',_binary '','2023-12-06 17:22:29','{\"transactionCode\":\"faa5d98df4\",\"transactionTime\":\"2023-12-07 00:22:27.000000\",\"amount\":150000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4732,'null',_binary '','2023-12-06 17:54:09','{\"transactionCode\":\"4e6d9fca2b\",\"transactionTime\":\"2023-12-07 00:54:07.000000\",\"amount\":50000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4733,'null',_binary '','2023-12-06 17:58:39','{\"transactionCode\":\"551f354213\",\"transactionTime\":\"2023-12-07 00:58:37.000000\",\"amount\":40000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4734,'null',_binary '','2023-12-06 18:19:30','{\"transactionCode\":\"4649e0c02c\",\"transactionTime\":\"2023-12-07 01:19:29.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4736,'null',_binary '','2023-12-06 18:23:40','{\"transactionCode\":\"e05cfea426\",\"transactionTime\":\"2023-12-07 01:23:38.000000\",\"amount\":50000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4737,'null',_binary '','2023-12-06 18:23:42','{\"transactionCode\":\"7e96a1ee2e\",\"transactionTime\":\"2023-12-07 01:23:40.000000\",\"amount\":50000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4738,'null',_binary '','2023-12-06 18:29:41','{\"transactionCode\":\"62a33f4cdf\",\"transactionTime\":\"2023-12-07 01:29:39.000000\",\"amount\":500000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4739,'null',_binary '','2023-12-06 18:54:24','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4740,'null',_binary '','2023-12-06 19:13:51','{\"transactionCode\":\"afb9199488\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4741,'null',_binary '','2023-12-06 19:14:00','{\"transactionCode\":\"afb9199488\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4742,'{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":1000000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 19:18:37','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4743,'{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 19:18:45','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":1000000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4744,'null',_binary '','2023-12-06 19:22:20','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4745,'null',_binary '','2023-12-06 19:22:27','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4746,'{\"transactionCode\":\"afb9199488\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 19:27:32','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4747,'null',_binary '','2023-12-06 19:27:42','{\"transactionCode\":\"afb9199488\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4748,'null',_binary '','2023-12-06 19:27:42','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4749,'null',_binary '','2023-12-06 19:48:27','{\"transactionCode\":\"5fb27449e1\",\"transactionTime\":\"2023-12-06 15:02:48.000000\",\"amount\":50000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4750,'null',_binary '','2023-12-06 19:48:27','{\"transactionCode\":\"2fc29ed998\",\"transactionTime\":\"2023-12-06 15:02:48.000000\",\"amount\":50000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4751,'null',_binary '','2023-12-06 19:48:35','{\"transactionCode\":\"5fb27449e1\",\"transactionTime\":\"2023-12-06 15:02:48.000000\",\"amount\":50000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4752,'null',_binary '','2023-12-06 20:01:07','{\"transactionCode\":\"2fc29ed997\",\"transactionTime\":\"2023-12-06 15:02:48.000000\",\"amount\":50000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4753,'null',_binary '','2023-12-06 20:01:07','{\"transactionCode\":\"2fc29ed998\",\"transactionTime\":\"2023-12-06 15:02:48.000000\",\"amount\":50000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4754,'null',_binary '','2023-12-06 20:18:51','{\"transactionCode\":\"ff8c464c72\",\"transactionTime\":\"2023-12-06 15:12:07.000000\",\"amount\":200000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Withdraw money to bank\",\"transactionType\":\"WITHDRAW\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4755,'null',_binary '','2023-12-06 20:18:51','{\"transactionCode\":\"5fb27449e0\",\"transactionTime\":\"2023-12-06 15:08:48.000000\",\"amount\":110000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4756,'null',_binary '','2023-12-06 20:44:27','{\"transactionCode\":\"b3e70b2af1\",\"transactionTime\":\"2023-12-06 15:16:08.000000\",\"amount\":50000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Withdraw money to bank\",\"transactionType\":\"WITHDRAW\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4757,'null',_binary '','2023-12-06 20:49:38','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4758,'null',_binary '','2023-12-06 20:49:46','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4759,'{\"transactionCode\":\"ecf4476401\",\"transactionTime\":\"2023-12-06 15:33:42.000000\",\"amount\":20000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 20:53:31','{\"transactionCode\":\"ecf4476400\",\"transactionTime\":\"2023-12-06 15:33:42.000000\",\"amount\":20000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4760,'null',_binary '','2023-12-06 20:53:40','{\"transactionCode\":\"ecf4476401\",\"transactionTime\":\"2023-12-06 15:33:42.000000\",\"amount\":20000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4761,'null',_binary '','2023-12-06 20:53:40','{\"transactionCode\":\"ecf4476400\",\"transactionTime\":\"2023-12-06 15:33:42.000000\",\"amount\":20000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4762,'null',_binary '','2023-12-06 20:53:48','{\"transactionCode\":\"ecf4476400\",\"transactionTime\":\"2023-12-06 15:33:42.000000\",\"amount\":20000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4763,'{\"transactionCode\":\"afb9199488\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 20:59:51','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4764,'null',_binary '','2023-12-06 20:59:59','{\"transactionCode\":\"afb9199488\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4765,'null',_binary '','2023-12-06 20:59:59','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4766,'{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":1000000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 21:01:21','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4767,'{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-06 21:01:29','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":1000000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4768,'null',_binary '','2023-12-06 21:02:30','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4769,'null',_binary '','2023-12-06 21:02:37','{\"transactionCode\":\"afb9199487\",\"transactionTime\":\"2023-12-07 01:54:21.000000\",\"amount\":100000,\"senderAccountNumber\":\"d9cac72b\",\"senderFullName\":\"Nguyễn Đình Khôi\",\"recipientAccountNumber\":\"57986397\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền trả\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4770,'null',_binary '','2023-12-06 21:07:11','{\"transactionCode\":\"1708d0ec74\",\"transactionTime\":\"2023-12-06 16:11:54.000000\",\"amount\":20000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4771,'null',_binary '','2023-12-06 21:07:11','{\"transactionCode\":\"0b2a4231f3\",\"transactionTime\":\"2023-12-06 15:52:59.000000\",\"amount\":30000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"ade2b59d\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4772,'null',_binary '','2023-12-06 21:07:11','{\"transactionCode\":\"2ac942b293\",\"transactionTime\":\"2023-12-06 15:47:28.000000\",\"amount\":150000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Deposit money from bank\",\"transactionType\":\"DEPOSIT\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4773,'null',_binary '','2023-12-06 21:07:11','{\"transactionCode\":\"935b9dc846\",\"transactionTime\":\"2023-12-06 15:39:56.000000\",\"amount\":60000,\"senderAccountNumber\":\"5a52e54f\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":null,\"recipientFullName\":null,\"description\":\"Withdraw money to bank\",\"transactionType\":\"WITHDRAW\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4774,'null',_binary '','2023-12-12 08:41:20','{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":100000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4775,'null',_binary '','2023-12-12 08:57:28','{\"transactionCode\":\"5aaab5dfae\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":150000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền gian lận\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4776,'null',_binary '','2023-12-12 08:57:35','{\"transactionCode\":\"5aaab5dfae\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":150000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền gian lận\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4777,'{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":1000000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-12 09:03:58','{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":100000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4778,'{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":100000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-12 09:04:03','{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":1000000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4779,'null',_binary '','2023-12-12 09:46:10','{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":100000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4780,'null',_binary '','2023-12-12 09:46:18','{\"transactionCode\":\"5aaab5dfaf\",\"transactionTime\":\"2023-12-12 15:41:17.000000\",\"amount\":100000,\"senderAccountNumber\":\"ade2b59d\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"5a52e54f\",\"recipientFullName\":\"Phạm Đoàn Kiếm\",\"description\":\"Gửi tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4781,'null',_binary '','2023-12-14 06:59:23','{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4782,'null',_binary '','2023-12-14 07:21:59','{\"transactionCode\":\"4d1ea11d47\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary ''),(4783,'null',_binary '','2023-12-14 07:22:05','{\"transactionCode\":\"4d1ea11d47\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4784,'{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":1000000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-14 07:28:05','{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4785,'{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}',_binary '','2023-12-14 07:28:11','{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":1000000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','UPDATE',_binary ''),(4786,'null',_binary '','2023-12-14 07:31:34','{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','DELETE',_binary ''),(4787,'null',_binary '','2023-12-14 07:31:40','{\"transactionCode\":\"4d1ea11d46\",\"transactionTime\":\"2023-12-14 13:59:20.000000\",\"amount\":100000,\"senderAccountNumber\":\"57986397\",\"senderFullName\":\"Phạm Đoàn Kiếm\",\"recipientAccountNumber\":\"d9cac72b\",\"recipientFullName\":\"Nguyễn Đình Khôi\",\"description\":\"Chuyển tiền\",\"transactionType\":\"TRANSFER\",\"transactionStatus\":\"SUCCESS\"}','INSERT',_binary '');
/*!40000 ALTER TABLE `triggerlog` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('00000000','17A Cộng Hòa',0,'2023-12-05 17:49:43.000000','datn.hyperwallet@gmail.com','Phạm Đoàn','Kiếm','2023-12-05 17:49:43.000000','$2a$10$xe4USkeKSeljX.3Ms2GC5eN1UG.tNsvLcB9gJbet3CeGr4cjzcwei','0373926165','$2a$10$eChoNMHeQ.Es92iyZOrRF.6.pto4u/juSrtGeImbk4seO3/M2a04y','ADMIN','ACTIVE'),('2e2e1926','Tân Bình',0,'2023-12-07 00:37:00.000000','kiempham1256@gmail.com','Phạm Đoàn','Kiếm','2023-12-07 00:51:55.000000','$2a$10$b03B6PD2a2Rr7sNAxEw9juOOUGabajhcJPs34KMSqm739RthGOpji','0373926165','$2a$10$oc4GxJ78ZSiWXP9uYdRk0.MkK34KtYbEz3l6pvZE/iX5XI3PP1sK2','USER','ACTIVE'),('3d1f35e8','47 Gò Vấp',0,'2023-12-07 00:24:45.000000','kiempham1245@gmail.com','Nguyễn Đình','Khôi','2023-12-07 00:24:45.000000','$2a$10$HzugztjMVc0dyrlnhu9SSOkfXf0ba1TvNPnEG6OZ4tPngHH/CkoPm','0382394729','$2a$10$DEzcv38FE5ifatHn.QrttuI9G4ALoaS8rHiqGWkoWV9tYGo/zciKq','USER','ACTIVE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2024-01-02 13:17:38
