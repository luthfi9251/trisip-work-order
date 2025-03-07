-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: trisip_work_order
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_role_name_unique` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'PRODUCTION_MANAGER',NULL,'2025-03-03 06:03:25',NULL),(2,'OPERATOR',NULL,'2025-03-03 06:03:39',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `expired_at` datetime NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `session_user_id_users_id_fk` (`user_id`),
  CONSTRAINT `session_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('7c191a2e1a1e4f6328346fa4469ef36e5fc27af492c6071ec01f8fd29e14e9c0','1a0abe1b-caa1-4ed7-9a08-a30dcb555470','2025-04-06 08:39:00',NULL,'2025-03-07 08:39:00',NULL);
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_roles_id_fk` (`role_id`),
  CONSTRAINT `users_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('16bb2226-2c9b-4199-b3c8-0a06291178b5','Ahmad Sukri','ahmad@sukri.com','$2a$10$Z.Oh27TMA8fmvgNfUmfSQe59t7eW7ejFwLdiBIxojnKc4Ji1.VgHC',2,NULL,'2025-03-03 06:05:50',NULL),('1a0abe1b-caa1-4ed7-9a08-a30dcb555470','Muhammad Luthfi Irfan','luthfi@irfan.com','$2a$10$Z.Oh27TMA8fmvgNfUmfSQe59t7eW7ejFwLdiBIxojnKc4Ji1.VgHC',1,NULL,'2025-03-03 06:04:58',NULL),('6806b1d5-9a59-4a2b-b69e-0db5945b3714','Robby Hairdryer','robby@hairdryer.com','$2a$10$Z.Oh27TMA8fmvgNfUmfSQe59t7eW7ejFwLdiBIxojnKc4Ji1.VgHC',2,NULL,'2025-03-05 06:39:59',NULL),('9e538759-208f-433a-b5a8-9c53b0401bb9','John Doe','john@doe.com','$2a$10$Z.Oh27TMA8fmvgNfUmfSQe59t7eW7ejFwLdiBIxojnKc4Ji1.VgHC',2,NULL,'2025-03-07 08:34:28',NULL),('b71ddc9f-261e-45f5-af02-3c992d7573d5','Hedrik Charger','hendrik@charger.com','$2a$10$Z.Oh27TMA8fmvgNfUmfSQe59t7eW7ejFwLdiBIxojnKc4Ji1.VgHC',2,NULL,'2025-03-07 08:38:41',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_order_progress`
--

DROP TABLE IF EXISTS `work_order_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_order_progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `report_by_user_id` varchar(255) NOT NULL,
  `work_order_id` int NOT NULL,
  `description` text NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `work_order_progress_report_by_user_id_users_id_fk` (`report_by_user_id`),
  KEY `work_order_progress_work_order_id_work_orders_id_fk` (`work_order_id`),
  CONSTRAINT `work_order_progress_report_by_user_id_users_id_fk` FOREIGN KEY (`report_by_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `work_order_progress_work_order_id_work_orders_id_fk` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_order_progress`
--

LOCK TABLES `work_order_progress` WRITE;
/*!40000 ALTER TABLE `work_order_progress` DISABLE KEYS */;
INSERT INTO `work_order_progress` VALUES (6,'2025-03-07 08:47:14','16bb2226-2c9b-4199-b3c8-0a06291178b5',14,'Menunggu pengiriman bahan baku',NULL,'2025-03-07 08:47:14',NULL),(7,'2025-03-07 08:50:10','b71ddc9f-261e-45f5-af02-3c992d7573d5',17,'pemotongan bahan baku',NULL,'2025-03-07 08:50:09',NULL),(8,'2025-03-07 08:50:21','b71ddc9f-261e-45f5-af02-3c992d7573d5',17,'Finishing',NULL,'2025-03-07 08:50:21',NULL);
/*!40000 ALTER TABLE `work_order_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_orders`
--

DROP TABLE IF EXISTS `work_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wo_num` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `deadline` datetime NOT NULL,
  `status` enum('PENDING','IN_PROGRESS','COMPLETED','CANCELED') NOT NULL DEFAULT 'PENDING',
  `assigned_to_id` varchar(255) NOT NULL,
  `created_by_id` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `result_quantity` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `work_orders_wo_num_unique` (`wo_num`),
  KEY `work_orders_assigned_to_id_users_id_fk` (`assigned_to_id`),
  KEY `work_orders_created_by_id_users_id_fk` (`created_by_id`),
  CONSTRAINT `work_orders_assigned_to_id_users_id_fk` FOREIGN KEY (`assigned_to_id`) REFERENCES `users` (`id`),
  CONSTRAINT `work_orders_created_by_id_users_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_orders`
--

LOCK TABLES `work_orders` WRITE;
/*!40000 ALTER TABLE `work_orders` DISABLE KEYS */;
INSERT INTO `work_orders` VALUES (14,'WO-20250307-001','45° Elbow',50,'2025-03-18 17:00:00','IN_PROGRESS','16bb2226-2c9b-4199-b3c8-0a06291178b5','1a0abe1b-caa1-4ed7-9a08-a30dcb555470',NULL,'2025-03-07 08:43:10',NULL,0),(15,'WO-20250307-002','Equal Tee',20,'2025-03-16 17:00:00','PENDING','6806b1d5-9a59-4a2b-b69e-0db5945b3714','1a0abe1b-caa1-4ed7-9a08-a30dcb555470',NULL,'2025-03-07 08:43:39',NULL,0),(16,'WO-20250307-003','Full Coupling',100,'2025-03-31 17:00:00','IN_PROGRESS','9e538759-208f-433a-b5a8-9c53b0401bb9','1a0abe1b-caa1-4ed7-9a08-a30dcb555470',NULL,'2025-03-07 08:44:24',NULL,0),(17,'WO-20250307-004','Concentric Reducer',16,'2025-03-26 17:00:00','COMPLETED','b71ddc9f-261e-45f5-af02-3c992d7573d5','1a0abe1b-caa1-4ed7-9a08-a30dcb555470',NULL,'2025-03-07 08:45:11',NULL,16),(18,'WO-20250307-005','Weld Neck Flange',25,'2025-04-20 17:00:00','PENDING','16bb2226-2c9b-4199-b3c8-0a06291178b5','1a0abe1b-caa1-4ed7-9a08-a30dcb555470',NULL,'2025-03-07 08:46:04',NULL,0),(19,'WO-20250307-006','Slip-On Flange',10,'2025-03-24 17:00:00','CANCELED','9e538759-208f-433a-b5a8-9c53b0401bb9','1a0abe1b-caa1-4ed7-9a08-a30dcb555470',NULL,'2025-03-07 08:49:25',NULL,0);
/*!40000 ALTER TABLE `work_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'trisip_work_order'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 16:02:15
