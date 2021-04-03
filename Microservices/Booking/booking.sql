-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 14, 2019 at 06:42 AM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--
CREATE DATABASE IF NOT EXISTS `booking` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `booking`;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
CREATE TABLE IF NOT EXISTS `booking` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `facility_name` varchar(64) NOT NULL,
  `facility_id` int(11) NOT NULL,
  `date` DATE NOT NULL,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- constraint booking_fk1 foreign key(user_id) reference user(user_id)
-- constraint booking_fk2 foreign key(facility_id) reference facility(facility_id)
-- constraint booking_fk3 foreign key(facility_name) reference facility(facility_name)

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `facility_name`, `facility_id`, `date`, `start_time`, `end_time`, `price`, `status`) VALUES
(1, 000010, 'BBQ Pit 1.1', 810431, '2021-02-18', '18:00:00', '20:00:00', 50.00, 'completed'),
(2, 000010, 'BBQ Pit 1.2', 810432, '2021-02-18', '18:00:00', '20:00:00', 50.00, 'completed'),
(3, 000004, 'BBQ Pit 2.7', 812818, '2021-02-28', '16:00:00', '18:00:00', 50.00, 'completed'),
(4, 000029, 'BBQ Pit 1.6', 810436, '2021-03-09', '17:00:00', '18:00:00', 30.00, 'completed'),
(5, 000058, 'BBQ Pit 1.8', 810438, '2021-02-16', '18:00:00', '19:00:00', 30.00, 'completed'),
(6, 000041, 'BBQ Pit 2.3', 812814, '2021-04-27', '18:00:00', '20:30:00', 65.00, 'pending'),
(7, 000022, 'BBQ Pit 2.5', 812816, '2021-02-24', '16:00:00', '17:30:00', 40.00, 'completed'),
(8, 000036, 'BBQ Pit 1.7', 810437, '2021-05-15', '15:00:00', '17:00:00', 50.00, 'pending'),
(9, 000070, 'BBQ Pit 1.4', 810434, '2021-03-23', '18:00:00', '19:30:00', 40.00, 'completed'),
(10, 000017, 'BBQ Pit 2.10', 812821, '2021-05-31', '17:30:00', '19:30:00', 50.00, 'pending'),
(11, 000032, 'BBQ Pit 2.1', 812812, '2021-03-25', '16:30:00', '18:00:00', 40.00, 'completed'),
(12, 000049, 'BBQ Pit 1.3', 810433, '2021-04-09', '18:00:00', '20:00:00', 50.00, 'completed'),
(13, 000065, 'BBQ Pit 1.3', 810433, '2021-05-05', '17:00:00', '19:00:00', 50.00, 'pending');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
