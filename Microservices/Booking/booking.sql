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
  `user_name` varchar(64) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL,
  `facility_name` varchar(64) NOT NULL,
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

INSERT INTO `booking` (`user_id`, `user_name`, `schedule_id`, `facility_id`, `facility_name`, `date`, `start_time`, `end_time`, `price`, `status`) VALUES
(1, 'Jayden', 561940, 810431, 'BBQ Pit 1.1', '2021-02-18', '18:00:00', '21:00:00', 50.00, 'completed');
-- (2, 10, 'BBQ Pit 2', 2, '2021-02-18', '18:00:00', '20:00:00', 50.00, 'completed'),
-- (3, 4, 'BBQ Pit 7', 7, '2021-02-28', '16:00:00', '18:00:00', 50.00, 'completed'),
-- (4, 29, 'BBQ Pit 6', 6, '2021-03-09', '17:00:00', '18:00:00', 30.00, 'completed'),
-- (5, 58, 'BBQ Pit 8', 8, '2021-02-16', '18:00:00', '19:00:00', 30.00, 'completed'),
-- (6, 41, 'BBQ Pit 3', 3, '2021-04-27', '18:00:00', '20:30:00', 65.00, 'pending'),
-- (7, 22, 'BBQ Pit 5', 5, '2021-02-24', '16:00:00', '17:30:00', 40.00, 'completed'),
-- (8, 36, 'BBQ Pit 7', 7, '2021-05-15', '15:00:00', '17:00:00', 50.00, 'pending'),
-- (9, 70, 'BBQ Pit 4', 4, '2021-03-23', '18:00:00', '19:30:00', 40.00, 'completed'),
-- (10, 17, 'BBQ Pit 10', 10, '2021-05-31', '17:30:00', '19:30:00', 50.00, 'pending'),
-- (11, 32, 'BBQ Pit 21', 21, '2021-03-25', '16:30:00', '18:00:00', 40.00, 'completed'),
-- (12, 49, 'BBQ Pit 3', 3, '2021-04-09', '18:00:00', '20:00:00', 50.00, 'completed'),
-- (13, 65, 'BBQ Pit 13', 13, '2021-05-05', '17:00:00', '19:00:00', 50.00, 'pending');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
