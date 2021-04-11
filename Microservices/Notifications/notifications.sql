-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 11, 2021 at 08:19 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notifications`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--
DROP DATABASE IF EXISTS `notifications`;
CREATE DATABASE IF NOT EXISTS `notifications` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `notifications`;

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `account_type` varchar(10) NOT NULL,
  `facility_name` varchar(64) NOT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=MyISAM AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `message`, `account_type`, `facility_name`) VALUES
(32, 'yuyyuyUYUYUYUYU', 'admin', 'BBQ Pit 1.1'),
(93, 'my name loser 周杰伦', 'admin', 'BBQ Pit 1.1'),
(94, 'yuyuybsuusiliaolauuy', 'user', 'BBQ Pit 1.1'),
(91, 'my name 周杰伦', 'admin', 'BBQ Pit 1.1'),
(92, 'my name loser 周杰伦', 'admin', 'BBQ Pit 1.1'),
(90, 'my name 周杰伦', 'user', 'BBQ Pit 1.1'),
(88, 'yuueatsleepyuyuy 周杰伦', 'user', 'BBQ Pit 1.1'),
(89, 'yuueatsleepyuyuy 周杰伦', 'user', 'BBQ Pit 1.1'),
(86, 'yuyuyuuyuyuyyuuy', 'admin', 'BBQ Pit 1.1'),
(87, 'yuyuybsuuyuyuyyuuy', 'user', 'BBQ Pit 1.1'),
(85, 'hello!!!!!!! its 周jayden杰伦', 'admin', 'BBQ Pit 1.1'),
(84, 'hello!!!!!!! its 周jayden杰伦', 'admin', 'BBQ Pit 1.1'),
(83, 'zxxzzzzzzzalibabachickenmanYUYUYU!!!!!!! its 周jayden杰伦', 'admin', 'BBQ Pit 1.1'),
(81, 'zxxsszzzzzzzzzzzzzzzzUYUYUYUYUYU!!!!!!! its 周jayden杰伦', 'admin', 'BBQ Pit 1.1'),
(82, 'zxxsszzzzzzzzzzzzzalibabachickenmanYUYUYU!!!!!!! its 周jayden杰伦', 'admin', 'BBQ Pit 1.1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
