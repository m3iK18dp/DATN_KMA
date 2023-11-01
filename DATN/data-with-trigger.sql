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
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (190000,'2023-10-08 16:19:58.000000','00000000','3c94282d','ACTIVE'),(150000,'2023-10-10 16:19:58.000000','00000000','3c94282e','ACTIVE'),(2470000,'2023-10-11 19:31:15.000000','9201fcba','40ff7af2','ACTIVE');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (-1,1,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTY3NTc2OTYsImV4cCI6MTY5Nzk2NzI5Nn0.-pKETEwjKyCQ0iKoBTCbVLeFKna1ME2dJdjDUSW4OjQ9YyXBKlhHAxTA3oc72v6FXs_OsxuSOg26nvyeMcL9lA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY3OTM3MDEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5Njc1NzcwMX0._dd4iBPHX6LAwFeUIZKhXnYOxIIXMUXgt_GYi7y04iU','BEARER'),(-1,2,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTY3NTg0MTIsImV4cCI6MTY5Nzk2ODAxMn0.meaNJSgWGFCFILW1yBd72vb4PofYEEdRrWmx6J8HB7Lz2xQjbVgNrZArPLrG5V7JZ3d08NLKDdSVwlRd2F0pMQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY3OTQ0MTcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5Njc1ODQxN30.JIl4bN3Wb7lxNdgxdDiDAQ0xn6Dg1yCz5ktmxNhSCiw','BEARER'),(-1,3,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjUxNTYsImV4cCI6MTY5ODIzNDc1Nn0.rsXSkCZiPC7BW-__qN_qmGy_5ES8fo2rBsvTICEOu2_Rj2P9VqeolYRZ8WWlvkKG5x88GgdYcyJ-kCoQV3hb2w','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjExNTksInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTE1OX0.0dGTkPkmLep0d9Y50Z2mU9XbVPei2QEu_Clb2sixXoQ','BEARER'),(-1,4,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjUxODcsImV4cCI6MTY5ODIzNDc4N30.pugSGnqyJ8KD5560d7Jk1HEONwFIZRuN9pbJthOv4GtbQhqFLQI7YigjY6lXXxhot6emVQDcoJ730OsfApyNkw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjExODksInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTE4OX0.i5dDmTyJIyADh1CcfP4OONV4_214nXw5OOZdrqsBTBE','BEARER'),(-1,5,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjUzNDEsImV4cCI6MTY5ODIzNDk0MX0.Qy8UNK0J3IfXIEmFJgshq7aH1s0xtaQeJVrgpVV-B5RrU7Z5Rh5k_AvKzRlyVrl94TgUo-M4SOOQ70BFHQI5Ug','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjEzNDQsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTM0NH0.2hLN0DDJ4qBw0J_w4LSTbcslB-NUCH-J0p3wGoQa7ek','BEARER'),(-1,6,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU0MDgsImV4cCI6MTY5ODIzNTAwOH0.KIxKGy9_Gs_SKy0o1r-1NENCLPdme9YAUhVU0a_GiLkHfBOA801rPWqQQs5lNwXJug-pf7j8IV_DMuJDMmTdAw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE0MTEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTQxMX0.EhSdrozIxBZgLyEbxwOUSX8rwp2_7z5mLTu4PZoB2oQ','BEARER'),(-1,7,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1MDIsImV4cCI6MTY5ODIzNTEwMn0.vxE1m9w_9qMivJ2TGsKtGUJkFgilp6GPFmlSQY4ObUYBU12FKUGDoWVBXM6k78TDddp1fEZEZDCNluETS3mHLQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1MDUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTUwNX0.Fq3sdkdmHZXTi9JMx2r8VpmLgfFMZQQuAZy48HKqYt4','BEARER'),(-1,8,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1MDYsImV4cCI6MTY5ODIzNTEwNn0.Ulkz7lwblbipv0uCvMKYK-hjPxlB7NG7_QwAd4VHOUMsSSSXAMTee5sL9Mx8u3q9f1tKvCVq0Exi_CnLXwibWg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1MDksInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTUwOX0.CR0Me8UHxjM7pVRz6kDgPLZodCnRGds208y60gRv2nQ','BEARER'),(-1,9,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1MTEsImV4cCI6MTY5ODIzNTExMX0.6wBfNTXpPBygTBICecPAa7jGftmWHyyj6AtQlFR4QPnCn_83AJ0VDL84a3CWgwMzhHDM3IBys5wbZVL2VYD4qw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1MTMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTUxM30.4C3uzkFVqZcUCG4x8mhcRELkBsqKSSgdFj0Ag2Qzh3Q','BEARER'),(-1,10,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1MjksImV4cCI6MTY5ODIzNTEyOX0.Yo7fOL1kWVy4fd-WWBblIw31QhZKZBG-tldwIBFa8j5gy3zp8ivDQT0PfKKOJMBPlsgw8pPFP_WLFT_ZuiUcUg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1MzIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTUzMn0.ssQUy739Fo2DuIhsyG6_NjWxO0Ar8mrfHx_VirJ4QOM','BEARER'),(-1,11,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1NDksImV4cCI6MTY5ODIzNTE0OX0.LoLfuHyGgTt_IwkPrDTwrtKumlHPtVWbnvHkKt0Gr0Sb_Q5ZdILzp-PUuYiQbM85FdiJntLwl5-5iXp_rpVrBQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1NTIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTU1Mn0.Yd-qH9rbpcTOlLDJGtSVTeKQpxpc6lo9ORJVu5jd0VA','BEARER'),(-1,12,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1NjksImV4cCI6MTY5ODIzNTE2OX0.fdkwT7xVDQYEWtRRBtxcd3ys3JKa9Ame_GXevGU7N4tni6sfP1ynhKp160yRRWWTRosw4slMeRgaiEStiBEmcQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1NzIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTU3Mn0.6l5CYiE1byQG94ivvTiVEew0JA0gu7sn3nY29ywEI1k','BEARER'),(-1,13,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1ODksImV4cCI6MTY5ODIzNTE4OX0.inJOSggtRaH54p0Pu-HOQef04Hl3oaa0_VVkssi1GtGlqArvmSBFTfYbnXKcJX_XGjZa-OcRBHiFZx5wfvM3cg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1OTIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTU5Mn0.e3MA9VaQMZU2dzBOcFUlDUcDUrvvzkz6GNZDLisjU5I','BEARER'),(-1,14,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1OTIsImV4cCI6MTY5ODIzNTE5Mn0.AwcjtzrLU3IfM2pvbi8wSgOAaAaZ_Wr0TsydW0BHVwkz5zEsCs0OU9NSMZccYi4keg2U1sst3EF8Pu0sWo8SXA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1OTQsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTU5NH0.DNsm_LFcxqLAIHMFZJ7F5kogX5lKaDwwgqwIeKre_F0','BEARER'),(-1,15,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU1OTQsImV4cCI6MTY5ODIzNTE5NH0.Soc1ynWYTAEcfHRE14RJRldSZ52ItTHCcdqDANX1D8YbOAjzFTC-RlFexHoaQ6jTxoB_8U8E7BOkjWqq9MWgFA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE1OTYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTU5Nn0.NaBCcRZwfp31BxKJBmHHemuaotpkD52R7iUB-JDE4lw','BEARER'),(-1,16,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU2NjAsImV4cCI6MTY5ODIzNTI2MH0.4sHTH3YQVut_OWAXO4S21knuIqOpT0-VvjPA3Vb5MKyYtlnmkZwKHGh7GNPJrT2K-LtKtsqUbeQKXIjNG06oBQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE2NjMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTY2M30.HbH6oPMjuPl0hzslSlwB-73XCOvsj0e11zUEBk9wSQs','BEARER'),(-1,17,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU2OTIsImV4cCI6MTY5ODIzNTI5Mn0.Y_FkcwJX8yeHDza6qf64Goy3gbMLaDJzMNuekZLlCZknR4ha-EGyToRceIh7stvdJACfr-ZnhsRCEjc26ldI7Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE2OTQsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTY5NH0.cW6tYGhCGHUznnR1Dzel1AKW9byvWobQREPVW8SvvyA','BEARER'),(-1,18,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU3MjUsImV4cCI6MTY5ODIzNTMyNX0.qnK0ycIqSmHeMIpc19dY6z8nY-8dIaswdifcDWwk_Q_Bj-WoR9z6KAaVLFAcPubogEaNcTI2HTLMWnb2Z4iZxQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE3MjcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTcyN30.E624fkHB2LiFEhxpxCzICpVNy3Cbt9VgLjqFU89VJRE','BEARER'),(-1,19,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU5MTAsImV4cCI6MTY5ODIzNTUxMH0.-wDkiUUvrUvTrFLNCUrKFNrsoYWIEI5HFq2seHt12uDVfEYnACXfd-S4rgVDIyA-lCIE5rE5TxMIkmwhZub-2Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE5MTIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTkxMn0.gxQoHpsGys2byjSklPb3v_LoCa1-GXNTTlKlvW7HbGo','BEARER'),(-1,20,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjU5NTEsImV4cCI6MTY5ODIzNTU1MX0.enDP-S1jrn2o0mcIYkOpbdOEFGhF5utkvXfjn1YjI_6FZPmR6YdCWSRJdzJTuBWDiPHbWpRhMQLdsVt6MVTbNA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjE5NTMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNTk1M30.2-sd-StVDcNsbNs5y00UMKNCZ-MPboH1tkL_qigV9tU','BEARER'),(-1,21,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYwNzgsImV4cCI6MTY5ODIzNTY3OH0.Mzl31a15jPKL8SSblReEznrEWOPwa9vNabl9JkMSrqGmBq1sz9zh_SdBhFm6nKeM-XAYOV9ILbV9D_3QoFFmtw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIwODEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjA4MX0.mPwBuqu7V9OjPnm0Mq_0EzaXxmDbn_pCb7DCOhn88KA','BEARER'),(-1,22,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYxMzYsImV4cCI6MTY5ODIzNTczNn0.8CM2fOtn13L2VkF7OYvl6gQScxHyZNxFTjDaVj6xAdfKssqHktfCQaBI_8s5MofUg9skSOkqSHtsgWK7Ue5clQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIxMzgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjEzOH0.0EZsZj2133V-TFKgRZVRQmCwmPStgoOnKIiN-E4-Vho','BEARER'),(-1,23,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYyMTgsImV4cCI6MTY5ODIzNTgxOH0.h_ZkYfTQi12YvG7eIoHYUmySqkq3WC6wPDC-Q-aJt2rpH1sluf-j4VqtRawwu063gr_Etl5A-B6wFIYRy39qIg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIyMjEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjIyMX0._YsIf2khH324Td7SsOyuMg4WxiJrI3VM6jPHE43GJXE','BEARER'),(-1,24,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYyMzMsImV4cCI6MTY5ODIzNTgzM30.vIj11Mb0ozBHwcDYJ6MfUDlVLexMxJpcozFXKjoLK36m8GDHV3J0omR4eW8PCGstdWpDDqNfqvQlIUDAKMVb4A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIyMzYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjIzNn0.b8txhsuvDDZLNxgCDePWb4dBBm2iqZWM4HVyuK-xMoQ','BEARER'),(-1,25,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYyNzUsImV4cCI6MTY5ODIzNTg3NX0.l96cuJeb0fuf1AZRTw2lGB4a__NwSjG_tcBnpvT-sK91cBN98BKk7fU1DgxHr5AwUIVgrfrnEeubZVBpwy5L_Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIyNzgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjI3OH0.ORtcCSXqsfevtJklIRUaCDoI-osJnA_nr2TJBNX7XlQ','BEARER'),(-1,26,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYyOTgsImV4cCI6MTY5ODIzNTg5OH0.4fu_TMB4yoDSAIOIUYP55O1DkboLMOrLRLSjgrHG6kK2Ejxg3_pj9_9Y7eLQQvCTLmoVzbBIXRohAmRNrCjJYw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIzMDAsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjMwMH0.hR20nAYVniha998l1p_amUPxNUDVOKfHJ7WNes494RY','BEARER'),(-1,27,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYzMDUsImV4cCI6MTY5ODIzNTkwNX0.Qrlo-is5FszgUiPBhqiTSmYiJtT3PtSDsINayw_h-JNXbm57D7EAW0UDslUT4ByWSS70iS6-hdD3Nml5-lZtrA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIzMDcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjMwN30.Lf325ktgyXmdQhwb1ANvpZUJ8IMo75KqJJKUiCuN7Bg','BEARER'),(-1,28,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYzMzMsImV4cCI6MTY5ODIzNTkzM30.WESYASbeaZGzhLXmszdaQhVdjAirF1dzx3YWu1ExcHMGdT23rqE3ys67gxRgGRqkQ3Yf1mKd7PbJ3f8veZ_3pA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIzMzYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjMzNn0.Rj_OqnZGUAaFhlsN40JKN7WEUD3O2I-amZtpZUouJSw','BEARER'),(-1,29,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYzNDUsImV4cCI6MTY5ODIzNTk0NX0.X3YXwea_b8YN9YBvFlHV4qaW9wathEt41cdj-QrysGp6zC4cawZVXAOQTWHonRawTrLlXnIyLOk7KogFkbUhrQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIzNDcsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjM0N30.GoVYgiojo4qMmdhMVxloWVtX7NedbxO5A1CTaA9FhFA','BEARER'),(-1,30,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjYzNjEsImV4cCI6MTY5ODIzNTk2MX0.JnkAIRqm4IgDpawZS94YZBxhBmid83qI9q8BUltlY_6cmUuS_IFXxkpaorc4x4ygSixUigzMzogBYh9o_YPSEQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjIzNjMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjM2M30.xiBxAmanToRJgIzBycNfz1UOl3MFyS-WQcmsMPsGStw','BEARER'),(-1,31,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY0MDEsImV4cCI6MTY5ODIzNjAwMX0.iMaTf0fql3-zEuzIvnIMmuwpY2nlOFvqvPFegk7a2YfQaPWYd2xcOQ-s8Lf8QltnB1kOV-fU-eeuizlNNzqyhQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI0MDMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjQwM30.5ugBxRbA8f1-I_COKk5S_fdm2U_J-xFhxImekZFcgBc','BEARER'),(-1,32,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY0MDgsImV4cCI6MTY5ODIzNjAwOH0.2g21yOAaJh_Sc0GLJIhMyTKOlMyCFL4_nHhqjt4OFzRKBJSNudBPVVF8e02Qt3W5LSqwcsqIXfgeDVcQhF-NNg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI0MTAsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjQxMH0.ftCb7pZ4wdKXy8UvQ1NfObfNK1gP5H0EE3mzpu0N5wQ','BEARER'),(-1,33,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY0MjksImV4cCI6MTY5ODIzNjAyOX0.hLfPBSaWPXMyttfZn01uM4LI0HJU6u54aTKpiFZIqvjuygZav8-Zjh3vP1Nvpr5b766nojN7v7JlaQIvyqH6Zg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI0MzIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjQzMn0.XUEqxjNR4pZxfatLULmqUC9C6u5t7t_-ohKc_xRwKLk','BEARER'),(-1,34,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY0MzgsImV4cCI6MTY5ODIzNjAzOH0.ZsEDYDrKK-FmJTL_z8qHgn97JlgqCOk3L-9VXoLoNmEYCN0J68vbS3zGJr86YBuhSV1qQkMFta44riQ3XzDE-A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI0NDAsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjQ0MH0.ejtT7JTcyq0JWIsKdERQ9Sk6PhiyGIofjm8AixsgEEM','BEARER'),(-1,35,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY1MzYsImV4cCI6MTY5ODIzNjEzNn0.br6sthtRLFAu2MKh3zTmr5f4eJ1Aao7V7VWGnhobeXwqZuPIYWk3N47D6QPDTP9w_RnbbgaqTYNlzdKJ51MRhw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI1MzgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjUzOH0.XxOM-RK56la72T2E61piC96bx5EIYCom0enC8UM5eGE','BEARER'),(-1,36,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY1NjIsImV4cCI6MTY5ODIzNjE2Mn0.NIZw6jAOIxMP4wDCZCA-Bq-BRLwXuB1A8GE3nl10QsEJ_nwJd2aIyzs0CAjn9MGeJf61nJy6j3s0eAq2MCYezQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI1NjUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjU2NX0.KqzopVJA5k5ce5lcIsMVmOXTZfZ1lTrJsOjtdxVsUW8','BEARER'),(-1,37,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY1NzEsImV4cCI6MTY5ODIzNjE3MX0.Cv7zuQuyeTSgPQOhwbfKAjtx_lqaNWlbzXMgONgQHxqKTDWyiKh-KnSXAcaAipKabNxqVJb5B7vGhgTvMgfg6A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI1NzMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjU3M30.WWdVE_hsfs0Ms4lQZiItZ7fr4kuDV1-ym3K5sCBqiwE','BEARER'),(-1,38,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY2ODUsImV4cCI6MTY5ODIzNjI4NX0.7Zb3UlWFcGTfYzIRtXNNEgw0WQqqpmXZ3fmeFntxVzU6_I8j6ojt0pTL4r_wx95HVON8yEwaQQQLHsz-24DiiQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI2ODgsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjY4OH0.YF4R1I2ZW1LSjyl25OW-KgMTMth1YC9wVMPOQvJqAqA','BEARER'),(-1,39,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY2OTksImV4cCI6MTY5ODIzNjI5OX0.4PHz2cLDq_HtXNS2VwgRp4cBA2nGGCDeIKjaUff4_JALXuhZ4o8eHlZyLFxoILHCEUwpFMP3qW3t4K7cdhpO5w','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI3MDIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjcwMn0.H1fDKzC3ARkklGtQVCJ2fGYVBLpbAKkUK4T0I5KkjVA','BEARER'),(-1,40,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMjY4NTMsImV4cCI6MTY5ODIzNjQ1M30.RW07o-vUK5_6UDXBGkyKnXrzpXNt5lciHiY2bjGzlrhAgpeNL5Vs7m5yzGaRdjoslBU0HXT5KU7bVnjwz-tCmw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjI4NTYsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNjg1Nn0.vZYSNa9_WuNuXoZtR01wjGmST74LaFcVd7iIThAy1HE','BEARER'),(-1,41,'9201fcba','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNjk3MDI3NTU2LCJleHAiOjE2OTgyMzcxNTZ9.TDEyY7P7ktJD9GoQ7T2rUZP7uuuiOCuhLZxJlhDhEP21dMqMAcMlyL0e2RkW65dAmyBF2a3DsCX2jFq8V1APRw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjM1NTgsInVzZXJuYW1lIjoiOTIwMWZjYmEiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAyNzU1OH0.BUVpdt3H_lux2epk-xDeqgBKisLqaJybEagSqZfMhuE','BEARER'),(-1,42,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMzM3OTEsImV4cCI6MTY5ODI0MzM5MX0.su6FGeAIgIKHiWnRHAZQ2p0T35oM6SKtZ4thSKt-zOHy_SzyGspt7eshy-mxVp9cInh0M9FlyzLZ5x9X4A7prg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjk3OTQsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAzMzc5NH0.D4xJii6qniNv9H7CRgtngKKj4fquzowdn9h_DhOcH4k','BEARER'),(-1,43,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMzM4ODAsImV4cCI6MTY5ODI0MzQ4MH0.agFVaZmt8O0IrJtJl-YsbAsyiyblYDUtC4t0yPNi3-4OCoJR6vMsFErIk7FCIafu3-n3C8kL_Sxcsh3syL9VrA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNjk4ODIsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAzMzg4Mn0.R3ZSh3I1E1AYtnuKSz0hcMQ1qYiTa1_G_H9TGRFZqNQ','BEARER'),(-1,44,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMzQwODEsImV4cCI6MTY5ODI0MzY4MX0.Pk42gio-Uj5Sk-t6ZzABt9RkjNhIypMuHjzum8NI8v87Lq0cwK_5S_SXxR7KVxHereWF0A7wu7b_bgzlVmBK3Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNzAwODQsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAzNDA4NH0.cIHkLMTPM0_5uK7BVj-ReHKGA8pygMGZvsFrScbrsgk','BEARER'),(-1,45,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMzYwNDEsImV4cCI6MTY5ODI0NTY0MX0.iUAL4BvCtyVvX2D3DlClxW3TpRjd7G1Q5t01exfkWMzUX_uLnpt2kDObl0hxKutUrw3sQIbnzsNtF5l7pt2r2g','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNzIwNjEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAzNjA2MX0.1SCcaXkep8nEsHLZbzPNpwtP_e0_-o6w_3gvPc8nXPM','BEARER'),(-1,46,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTcwMzYwNjAsImV4cCI6MTY5ODI0NTY2MH0.ZuLG42fA45_QBUlb4G4G11ebwgnyXO2oIofVyU8Ca0w-Xp9K4jrnG7yH8nOboKacFKetM3xXqfDLl8l3HsDmbw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNzIwNjMsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAzNjA2M30.5PsGxYCO6cZZ2TRNBD688kI65Se1bLOGeHgu6H6iOIs','BEARER'),(-1,47,'9201fcba','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNjk3MDM2MDkwLCJleHAiOjE2OTgyNDU2OTB9.xycDhDE-4TBGpNL3nxAbcNfMrvMUnlu_FgP5_1Y_kLBmWZ_-Nh0GFjbtokfG9q5WCQuJGkgvBgPyMXk5EDUO5A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwNzIwOTMsInVzZXJuYW1lIjoiOTIwMWZjYmEiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5NzAzNjA5M30.hb_LoZhh2FW0DDGrTAGokG-nMPzxnsFcPAjyt6t1HSc','BEARER'),(-1,50,'9201fcba','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNjk3MTMxNTA0LCJleHAiOjMwMH0.ZWG18mnT1vOwl3Xr0XJfSzUHVaRawH4ZMrjYvyp64HDNnZFA6fk6whXCkpqS-w-YkeSxOxKM0IhOAw6ot6ypOw',NULL,'RESET_PASSWORD'),(-1,51,'9201fcba','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNjk3MTM1NTE1LCJleHAiOjMwMH0.ovFqcBq4llkrOTq5sXWPjKFPkeJPaDe77GIZKxFQxOBQObuqPxR9-DiO2b1pGVPrRWcJqCj2hRj8qHCkb5mYdw',NULL,'RESET_PASSWORD'),(-1,52,'9201fcba','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraWVtcGhhbTEyNDVAZ21haWwuY29tIiwiaWF0IjoxNjk3MTM1NjI1LCJleHAiOjE2OTcxMzU5MjV9.uv0UZi63OZyBR0eO8U64niFUO380ai502LeAHDyMSM1RyFjp9mjkgirvtPYzOjt-TEZEO1L3j9LnJ_3OQuce1A',NULL,'RESET_PASSWORD'),(0,53,'00000000','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTg2ODM4ODQsImV4cCI6MTY5ODY4NTY4NH0.Nm4HfmhxAsJ0Z9A93H0kZD_X6SzpN7n116-Ahd65v7z9B5AjqzSjTji6KNZSZ9JTm7peSB5ES4EV_92O3ei2Ag','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg3MTk4ODUsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJvcmdOYW1lIjoiT3JnMSIsImlhdCI6MTY5ODY4Mzg4NX0.0Vm9tWL4Fv6D_zGc5dQdB2UuDdXmSXez78GxxcQ_oxM','BEARER');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (50000,'2023-10-11 19:28:06.000000','Deposit money from bank',NULL,NULL,'3c94282d','Phạm Đoàn Admin','129d7b9857','SUCCESS','DEPOSIT'),(20000,'2023-10-11 20:57:55.000000','Send money to Phạm Đoàn Admin','3c94282d','Phạm Đoàn Admin','40ff7af2','Pham Doan Kiem','1ed8d6f0a3','SUCCESS','TRANSFER'),(50000,'2023-10-11 19:37:53.000000','Withdraw money to bank',NULL,NULL,'40ff7af2','Pham Doan Kiem','469e38b96a','SUCCESS','WITHDRAW'),(50000,'2023-10-11 20:41:45.000000','Send money to Phạm Đoàn Admin','3c94282d','Phạm Đoàn Admin','40ff7af2','Pham Doan Kiem','47a6605a5e','SUCCESS','TRANSFER'),(500000,'2023-10-09 14:44:54.000000','Deposit money from bank',NULL,NULL,'3c94282d','Phạm Đoàn Admin','702011bdc6','SUCCESS','DEPOSIT'),(1000000,'2023-10-11 21:16:06.000000','Deposit money from bank',NULL,NULL,'40ff7af2','Pham Doan Kiem','793bcfdc1c','SUCCESS','DEPOSIT'),(50000,'2023-10-11 20:47:28.000000','Send money to Phạm Đoàn Admin','3c94282d','Phạm Đoàn Admin','40ff7af2','Pham Doan Kiem','86e17f520d','SUCCESS','TRANSFER'),(10000,'2023-10-09 14:45:10.000000','Withdraw money to bank',NULL,NULL,'3c94282d','Phạm Đoàn Admin','9573844a86','SUCCESS','WITHDRAW'),(500000,'2023-10-08 16:42:31.000000','Deposit money from bank',NULL,NULL,'3c94282d','Phạm Đoàn Admin','b39cc06cda','SUCCESS','DEPOSIT'),(500000,'2023-10-11 19:37:23.000000','Deposit money from bank',NULL,NULL,'40ff7af2','Pham Doan Kiem','b4836841f4','SUCCESS','DEPOSIT'),(40000,'2023-10-11 20:51:08.000000','Send money to Phạm Đoàn Admin','3c94282d','Phạm Đoàn Admin','40ff7af2','Pham Doan Kiem','d50d95688b','SUCCESS','TRANSFER'),(20000,'2023-10-11 21:00:41.000000','Send money to Phạm Đoàn Admin','3c94282d','Phạm Đoàn Admin','40ff7af2','Pham Doan Kiem','d927429a4b','SUCCESS','TRANSFER'),(1300000,'2023-10-11 21:24:31.000000','Send money to Pham Doan Kiem','40ff7af2','Pham Doan Kiem','3c94282d','Phạm Đoàn Admin','e6e341cd94','SUCCESS','TRANSFER');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `triggerlog`
--

LOCK TABLES `triggerlog` WRITE;
/*!40000 ALTER TABLE `triggerlog` DISABLE KEYS */;
INSERT INTO `triggerlog` VALUES (3,_binary '\0','2023-10-30 17:43:05','UPDATE Transaction','e6e341cd94','{\"amount\": 1200000, \"description\": \"Send money to Pham Doan Kiem\", \"senderFullName\": \"Phạm Đoàn Admin\", \"transactionCode\": \"e6e341cd94\", \"transactionTime\": \"2023-10-11 21:24:31.000000\", \"transactionType\": \"TRANSFER\", \"recipientFullName\": \"Pham Doan Kiem\", \"transactionStatus\": \"SUCCESS\", \"senderAccountNumber\": \"3c94282d\", \"recipientAccountNumber\": \"40ff7af2\"}'),(4,_binary '\0','2023-10-30 17:45:55','UPDATE Transaction','e6e341cd94','{\"amount\": 1300000, \"description\": \"Send money to Pham Doan Kiem\", \"senderFullName\": \"Phạm Đoàn Admin\", \"transactionCode\": \"e6e341cd94\", \"transactionTime\": \"2023-10-11 21:24:31.000000\", \"transactionType\": \"TRANSFER\", \"recipientFullName\": \"Pham Doan Kiem\", \"transactionStatus\": \"SUCCESS\", \"senderAccountNumber\": \"3c94282d\", \"recipientAccountNumber\": \"40ff7af2\"}'),(5,_binary '\0','2023-10-30 17:46:23','UPDATE Transaction','e6e341cd94','{\"amount\": 1200000, \"description\": \"Send money to Pham Doan Kiem\", \"senderFullName\": \"Phạm Đoàn Admin\", \"transactionCode\": \"e6e341cd94\", \"transactionTime\": \"2023-10-11 21:24:31.000000\", \"transactionType\": \"TRANSFER\", \"recipientFullName\": \"Pham Doan Kiem\", \"transactionStatus\": \"SUCCESS\", \"senderAccountNumber\": \"3c94282d\", \"recipientAccountNumber\": \"40ff7af2\"}');
/*!40000 ALTER TABLE `triggerlog` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'2023-10-08 16:19:58.000000','2023-10-08 16:19:58.000000','Admin','Phạm Đoàn','admin@gmail.com','17A Cộng Hòa','00000000','$2a$10$99f0cyC5IhrbfJOEwn/LBOmL3cakF0ytl2I1u6Cwyow1wJqeCyMDa','0373926165','$2a$10$P8hkouXCJ34JezzZ535WBOMji.qYsY/.U8LD7YV3hW7FF3fijhM4i','ADMIN','ACTIVE'),(0,'2023-10-11 19:31:15.000000','2023-10-11 20:22:43.000000','Kiem','Pham Doan','kiempham1245@gmail.com','17A Cong Hoa','9201fcba','$2a$10$sB8LxdkTYdjyEeborjtCEe.J7fwRgI5VUK1jTUSj2wGHc8DzJ2e8u','0373926165','$2a$10$m/E0myrZzTp4qbUrvcTMi.pZhIuI3.KQs1r4hiLd7nqOd6DwGRmvq','USER','ACTIVE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31  0:51:41
