-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2019 at 11:26 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pocketpara`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `code`, `description`, `order`, `userId`, `active`) VALUES
(16, 'test', 'test', 1571663667, 1, 0),
(19, '9.9.201', 'RTW', 1571687529, 1, 1),
(20, '9.9.202', 'RTW', 1571687533, 1, 1),
(21, '9.9.203', 'RTW', 1571687547, 1, 1),
(22, '9.9.202', 'NRTW', 1571687539, 1, 1),
(23, 'A-01', 'Rescue Van', 1571768462, 8, 1),
(24, 'A-02', 'Rescue Van', 1571768470, 8, 1),
(25, 'A-03', 'Rescue Van', 1571768476, 8, 1),
(26, 'B-01', 'Transporter', 1571768486, 8, 1),
(27, '9.9.213', 'NAW', 1573515910, 1, 1),
(28, '9.9.211', 'NEF', 1573515917, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `keyword`
--

CREATE TABLE `keyword` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT '#232323',
  `description` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `isEmergency` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `keyword`
--

INSERT INTO `keyword` (`id`, `name`, `color`, `description`, `order`, `userId`, `isEmergency`) VALUES
(21, 'r1', '#ff5722', 'Notfall', 1571676641, 1, 1),
(22, 'r2', '#f44336', 'NRTW-Notfall', 1571676654, 1, 1),
(23, 'r2na', '#ff0000', 'Notarzt-Einsatz', 1571676661, 1, 1),
(24, 'r3', '#e91e63', 'Großeinsatz', 1571676670, 1, 1),
(25, 'r8', '#2196f3', 'Rettungseinsatz', 1571676718, 1, 0),
(26, 'r7', '#1abc9c', 'KTW Dringlich', 1571676710, 1, 0),
(27, 'r6', '#009688', 'KTW', 1571676698, 1, 0),
(28, 'r12', '#ffc107', 'Notfallverlegung', 1571678264, 1, 1),
(29, 'r15', '#795548', 'Materialtransport', 1571678325, 1, 0),
(32, 'r4', '#ff8eb4', 'Katastrophe', 1571676684, 1, 1),
(33, 'r5', '#ff8eb4', 'Katastrophe', 1571676694, 1, 1),
(34, 'r10', '#00bcd4', 'Rufhilfe Passiv', 1571678244, 1, 0),
(35, 'r13', '#4caf50', 'Fernfahrt', 1571678293, 1, 0),
(36, 'r14', '#cddc39', 'BHF-Fahrt', 1571678314, 1, 0),
(37, 'storno', '#808080', 'Einsatz Storniert', 1571678390, 1, 0),
(38, 'A1', '#ff0000', 'Emergency', 1571768539, 8, 1),
(39, 'A2', '#03a9f4', 'Catastrophe', 1571768559, 8, 1),
(40, 'D', '#4caf50', 'Non-Emergency', 1571768604, 8, 1),
(41, 'A1', '#ff0000', 'Notarzt & First Responder', 1573502905, 1, 1),
(42, 'A2', '#ff0000', 'Notarzt-Einsatz', 1573502920, 1, 1),
(43, 'A3', '#ff0000', 'Notarzt, wenn RD > 6min. Eintreffzeit', 1573502949, 1, 1),
(44, 'A4', '#ff0000', 'Notarzt-Anforderung durch Fachpersonal', 1573502962, 1, 1),
(45, 'A-EWG', '#673ab7', 'Erste Welle Groß bei MANV', 1573502997, 1, 1),
(46, 'A-EWM', '#9c27b0', 'Erste Welle Mittel bei MANV', 1573503011, 1, 1),
(47, 'A-EWK', '#9b59b6', 'Erste Welle klein bei MANV', 1573503020, 1, 1),
(48, 'B1', '#ff5722', 'Notfall', 1573503032, 1, 1),
(49, 'B2', '#2196f3', 'Rettungseinsatz', 1573503056, 1, 0),
(50, 'C1/2/3', '#ff5722', 'Notfallverlegung mit Notarzt', 1573503097, 1, 1),
(51, 'C6', '#ffeb3b', 'Arzt-KH', 1573503112, 1, 1),
(52, 'C7', '#ff9800', 'Notfallverlegung Rettungsdienst', 1573503125, 1, 1),
(53, 'C8', '#ff9800', 'Notfallverlegung Intensivtransport', 1573503137, 1, 1),
(54, 'D1', '#4caf50', 'Krankentransport Tragstuhl', 1573503173, 1, 0),
(55, 'D2', '#4caf50', 'Krankentransport Liege', 1573503188, 1, 0),
(56, 'D3', '#009688', 'Krankentransport Rollstuhl', 1573503200, 1, 0),
(57, 'D4', '#1abc9c', 'Schwerlasttransport', 1573503211, 1, 0),
(58, 'D5/6/7', '#cddc39', 'Infektionstransport', 1573503226, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `medical_category`
--

CREATE TABLE `medical_category` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT '#232323'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medical_category`
--

INSERT INTO `medical_category` (`id`, `title`, `language`, `color`) VALUES
(31, 'Allergy & Immunology', 'en', '#232323'),
(32, 'Dermatology', 'en', '#232323'),
(33, 'Internal', 'en', '#232323'),
(34, 'Neurology', 'en', '#232323'),
(35, 'Gynecology', 'en', '#232323'),
(36, 'Pediatric', 'en', '#232323'),
(37, 'Psychiatry', 'en', '#232323'),
(38, 'Oncology', 'en', '#232323'),
(39, 'Surgery', 'en', '#232323'),
(40, 'Urology', 'en', '#232323'),
(41, 'Traumatology', 'en', '#232323'),
(42, 'ENT (Ear-Nose-Throat)', 'en', '#232323'),
(43, 'Dentistry', 'en', '#232323'),
(44, 'Cardiology', 'en', '#232323'),
(45, '> others', 'en', '#232323');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1570481384769, 'CreateAdminUser1570481384769'),
(2, 1570536976617, 'CreateDevUser1570536976617'),
(5, 1570728302117, 'CreateStaticsMedicalCategory1570728302117');

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

CREATE TABLE `mission` (
  `id` int(11) NOT NULL,
  `alarmtext` varchar(255) DEFAULT NULL,
  `improvementNotes` varchar(255) DEFAULT NULL,
  `shiftId` int(11) NOT NULL,
  `keywordId` int(11) NOT NULL,
  `keywordUpdateId` int(11) NOT NULL,
  `medicalCategoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`id`, `alarmtext`, `improvementNotes`, `shiftId`, `keywordId`, `keywordUpdateId`, `medicalCategoryId`) VALUES
(1, NULL, NULL, 8, 21, 22, 33),
(2, NULL, NULL, 8, 21, 22, 33);

-- --------------------------------------------------------

--
-- Table structure for table `mission_user_events_user_event`
--

CREATE TABLE `mission_user_events_user_event` (
  `missionId` int(11) NOT NULL,
  `userEventId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mission_user_events_user_event`
--

INSERT INTO `mission_user_events_user_event` (`missionId`, `userEventId`) VALUES
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `carId` int(11) NOT NULL,
  `cycle` int(11) NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `crew` text DEFAULT '[]',
  `myRole` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`id`, `date`, `carId`, `cycle`, `userId`, `crew`, `myRole`) VALUES
(10, '2019-11-11 01:00:00', 21, 1, 1, '[{\"role\":\"Driver\",\"firstname\":\"Max\",\"lastname\":\"Mustermann\"},{\"role\":\"Nurse\",\"firstname\":\"Frau\",\"lastname\":\"Pfleg\"}]', 'Doctor');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `pgpPublicKey` varchar(255) DEFAULT NULL,
  `pgpPrivateKey` varchar(255) DEFAULT NULL,
  `pgpRevocationCertificate` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `verifiedAt` datetime DEFAULT NULL,
  `verifiedFrom` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `creationIp` varchar(255) NOT NULL DEFAULT 'unknown',
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `lastLoginIp` varchar(255) DEFAULT NULL,
  `googleIdToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `language`, `pgpPublicKey`, `pgpPrivateKey`, `pgpRevocationCertificate`, `email`, `isVerified`, `verifiedAt`, `verifiedFrom`, `fullname`, `password`, `role`, `createdAt`, `creationIp`, `updatedAt`, `lastLoginIp`, `googleIdToken`) VALUES
(1, 'admin', 'en', 'LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tDQpWZXJzaW9uOiBPcGVuUEdQLmpzIHY0LjYuMg0KQ29tbWVudDogaHR0cHM6Ly9vcGVucGdwanMub3JnDQoNCnhzQk5CRjJmbHBrQkNBREh1Vy9KbnpVVlRQMGhPV2N2cmplMjduTmJiakdPbWNJdHQ4eXFxOW1tVktYYw0KSGRYZktENEdEUjFXdHhudW1MaEQ3RjBjY1FtVnp', 'RHRnTmRNK1BsaENCdC9wSTJKaThORVYwMXYrOHFWa1BTODJheGIxT3FhcXBqYjF6RGk0ekY3NUNFY29rRTY2TTBXd2oyTjMvcEl5QWtzUTBMSm4zUGY1Y3g4RVd6SElxUWlzOUJKQ1ZWcWowNFZJS3pGL0FvZmNqVW1LekVzTlNFaXpIYk0vTEZMVHBpWnFWNW9BdWdMeDlsaXh3TGNDaE9UNVpwZWpwaXRNNTNsU2xSVTYxSDNIYk9MbVMyMGt', 'LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tDQpWZXJzaW9uOiBPcGVuUEdQLmpzIHY0LjYuMg0KQ29tbWVudDogaHR0cHM6Ly9vcGVucGdwanMub3JnDQpDb21tZW50OiBUaGlzIGlzIGEgcmV2b2NhdGlvbiBjZXJ0aWZpY2F0ZQ0KDQp3c0JmQkNBQkNBQUpCUUpkbjVhWkFoMEFBQW9KRURIWHhVRVRmUW0xcFlzSC9qTlA', '_admin_@example.com', 1, NULL, NULL, 'Administrator', '$2a$08$bl336cJ7xVfjWAkU5Ya82O49OmTbnNSUqdiRCMeOdCyOcqfqvYY2W', 'CUSTOMIZE_CARS;CUSTOMIZE_KEYWORDS;TRA_SHIFT_TRACKER;TRA_SHIFT_STATISTICS;TRA_MISSION_STATISTICS;TRA_MISSION_TRACKER;CUSTOMIZE_EVENTS;ADMIN', '2019-10-10 22:37:46.556534', '127.0.0.1', '2019-10-10 22:37:46.556534', NULL, NULL),
(2, 'devtest', 'en', 'LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tDQpWZXJzaW9uOiBPcGVuUEdQLmpzIHY0LjYuMg0KQ29tbWVudDogaHR0cHM6Ly9vcGVucGdwanMub3JnDQoNCnhzQk5CRjJmbHBvQkNBQy9MZ2k0R0FKdHUxVlZKbExIQWNmV2EyQ0VxRFBxUDQ2UnA4OWYxaG9nOHdyUA0KRHVVdExHcmd6cnJVeHhZMTRoR1M1Wmt0TkpyUjZ', 'TTlGWHdEMXlVRzFvTXpzYm5SUVQvMFJxQ1NZQXluSFNlWjZyd29DZmcwSVNmMjZSTnAzSU4vWmRTK2ttcmdSVXNyT0I1b3BCaS83bjF2QWdCTnp3czJJeVA2SnB5S0FRTllQMnViOHNyc0tLQVJnSlNha2lCY3lDdVlRL0t5ZE1IZVE0QVZ1RFFCTVAvclRIcjR3aDliTTB3WlNsWnRiVnpkMmk4R1ZKNU9KZFNRMDJDL2V0SlNqNUZ2VU15SDZ', 'LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tDQpWZXJzaW9uOiBPcGVuUEdQLmpzIHY0LjYuMg0KQ29tbWVudDogaHR0cHM6Ly9vcGVucGdwanMub3JnDQpDb21tZW50OiBUaGlzIGlzIGEgcmV2b2NhdGlvbiBjZXJ0aWZpY2F0ZQ0KDQp3c0JmQkNBQkNBQUpCUUpkbjVhYUFoMEFBQW9KRUQ2UDAwTzNsRFdDdXNJSC9qY1F', '_devtest_@example.com', 1, NULL, NULL, 'Development Account', '$2a$08$Hm7bIGqjYCXRlw5FU95Yn.MdezQaYxrshJrzlq3ptxOX2Vw06Pna2', 'CUSTOMIZE_CARS;CUSTOMIZE_KEYWORDS;TRA_SHIFT_TRACKER;TRA_SHIFT_STATISTICS;TRA_MISSION_STATISTICS;TRA_MISSION_TRACKER', '2019-10-10 22:37:47.613174', '127.0.0.1', '2019-10-10 22:37:47.613174', NULL, NULL),
(3, 'testuser', 'en', 'LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tClZlcnNpb246IEJDUEcgQyMgdjEuNi4xLjAKCm1RRU5CRjJmaTVVQkNBQ2R3ZFpXaWcvcDVLWXltaHdWQ2hZNDhTQXU4eDNzbTFrVWoxL05zcnFrZ2RMd0VVVVEKbUZSS3krdmh3K2E0VEhvTnZRWmV5REFxVU9weXBvRUk4K2JjczhNcjJ5ZTdWWE5jclR3MkVQdmNHdjVHS2h', 'ODBteVRidXJoVGtQQTFHdVRFRXYzYjI4bXY1NWxhTDZ0KzhwRndtaHUrQkJYaDRhbkx3SkRWN1BJY3pNU3NJT1RQczE2WEZFYnFPSnZncTU5Y3FVOFN1QmZhakVTaEJpWE9aSjgwc0wwRElRNGhsQ0Z0eW9TZkN1V1pEMU1yZG4vb01kVnFPcjRRY1BvS3I0a3lkWEtxTHNnOVFNWEFKbTh1Q1JzQytBMVBpSFBFZDVOZDFrU3cxaW9wTk5ITTl', NULL, 'test@example.com', 0, NULL, NULL, '', '$2a$08$62mh5OvSezAUlGyxpObczOcx1NqcEfrOOHxXXz6rGHZ7g5gz9t5U.', 'CUSTOMIZE_CARS;CUSTOMIZE_KEYWORDS;CUSTOMIZE_EVENTS;TRA_SHIFT_TRACKER;TRA_SHIFT_STATISTICS;TRA_MISSION_STATISTICS;TRA_MISSION_TRACKER', '2019-10-14 21:40:57.823007', '::1', '2019-10-14 21:40:57.823007', NULL, NULL),
(7, 'Lksfnd', 'en', NULL, NULL, NULL, 'fendlukas@pm.me', 0, NULL, NULL, '', '$2a$08$CO8jTKqIFeyV/2dttJUdyemV.IMdc589VpZPtu3/lGLQEQm/XUt76', 'CUSTOMIZE_CARS;CUSTOMIZE_KEYWORDS;CUSTOMIZE_EVENTS;TRA_SHIFT_TRACKER;TRA_SHIFT_STATISTICS;TRA_MISSION_STATISTICS;TRA_MISSION_TRACKER', '2019-10-14 21:59:42.019503', '::1', '2019-10-14 21:59:42.019503', NULL, NULL),
(8, 'Pocketpara', 'en', NULL, NULL, NULL, 'support@pocketpara.net', 1, NULL, NULL, 'PocketPara Demo User', '$2a$08$CcDNcsX6QLGihPWSTFIaQeEqoXQId2FMuuL/I3BVuny5R2v8V3cYW', 'CUSTOMIZE_CARS;CUSTOMIZE_KEYWORDS;TRA_SHIFT_TRACKER;TRA_SHIFT_STATISTICS;TRA_MISSION_STATISTICS;TRA_MISSION_TRACKER;CUSTOMIZE_EVENTS;ADMIN', '2019-10-22 20:17:20.950493', '::ffff:172.16.4.82', '2019-10-22 20:17:20.950493', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_event`
--

CREATE TABLE `user_event` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` int(11) DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_event`
--

INSERT INTO `user_event` (`id`, `name`, `order`, `userId`, `active`) VALUES
(2, 'NK-Anwendung', 2, 1, 1),
(3, 'NKV-Anwendung', 1, 1, 1),
(5, 'Test', 2147283647, 1, 1),
(6, 'Sauerstoff', 1573501802, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a4f3cb1b950608959ba75e8df36` (`userId`);

--
-- Indexes for table `keyword`
--
ALTER TABLE `keyword`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a5072e1cad201e2caf5efa7e8c5` (`userId`);

--
-- Indexes for table `medical_category`
--
ALTER TABLE `medical_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_40366756e31811d641b34a4247` (`title`,`language`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_fb37db7224297f39bcb5447df23` (`shiftId`),
  ADD KEY `FK_d7f8a9f43841228965c2c38e778` (`keywordId`),
  ADD KEY `FK_e763fbd59cb8156178b376f15db` (`keywordUpdateId`),
  ADD KEY `FK_37f1c6cfa8f7377fb06e0870159` (`medicalCategoryId`);

--
-- Indexes for table `mission_user_events_user_event`
--
ALTER TABLE `mission_user_events_user_event`
  ADD PRIMARY KEY (`missionId`,`userEventId`),
  ADD KEY `IDX_a19c841fc4ecb095f5656bfb06` (`missionId`),
  ADD KEY `IDX_8a7461e339172a3c721c0a3242` (`userEventId`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_54dbb2d67098d3c4215d131347b` (`carId`),
  ADD KEY `FK_d6c3886ef9888f23e6d995d2640` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `IDX_8a4846b12d11749c096f4dc0a9` (`googleIdToken`);

--
-- Indexes for table `user_event`
--
ALTER TABLE `user_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_77452fe8443c349b0e628507cbb` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `keyword`
--
ALTER TABLE `keyword`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `medical_category`
--
ALTER TABLE `medical_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_event`
--
ALTER TABLE `user_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `FK_a4f3cb1b950608959ba75e8df36` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `keyword`
--
ALTER TABLE `keyword`
  ADD CONSTRAINT `FK_a5072e1cad201e2caf5efa7e8c5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `FK_37f1c6cfa8f7377fb06e0870159` FOREIGN KEY (`medicalCategoryId`) REFERENCES `medical_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d7f8a9f43841228965c2c38e778` FOREIGN KEY (`keywordId`) REFERENCES `keyword` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e763fbd59cb8156178b376f15db` FOREIGN KEY (`keywordUpdateId`) REFERENCES `keyword` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fb37db7224297f39bcb5447df23` FOREIGN KEY (`shiftId`) REFERENCES `shift` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `mission_user_events_user_event`
--
ALTER TABLE `mission_user_events_user_event`
  ADD CONSTRAINT `FK_8a7461e339172a3c721c0a32420` FOREIGN KEY (`userEventId`) REFERENCES `user_event` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a19c841fc4ecb095f5656bfb06f` FOREIGN KEY (`missionId`) REFERENCES `mission` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `shift`
--
ALTER TABLE `shift`
  ADD CONSTRAINT `FK_54dbb2d67098d3c4215d131347b` FOREIGN KEY (`carId`) REFERENCES `car` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d6c3886ef9888f23e6d995d2640` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_event`
--
ALTER TABLE `user_event`
  ADD CONSTRAINT `FK_77452fe8443c349b0e628507cbb` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
