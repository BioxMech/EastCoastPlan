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
-- Database: `facility`
--
DROP DATABASE IF EXISTS `facility`;
CREATE DATABASE IF NOT EXISTS `facility` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `facility`;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE IF NOT EXISTS `schedule` (
  `schedule_id` int(11) NOT NULL,
  `schedule_name` varchar(64) NOT NULL,
  `availability` varchar(11) DEFAULT NULL,
  `image_url` varchar(100),
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `facility`
--

DROP TABLE IF EXISTS `facility`;
CREATE TABLE IF NOT EXISTS `facility` (
  `facility_id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_id` int(11) NOT NULL,
  `facility_name` varchar(64) NOT NULL,
  `location` varchar(64) NOT NULL,
  `availability` varchar(11) DEFAULT NULL,
  `image_url` varchar(100),
  PRIMARY KEY (`facility_id`),
  FOREIGN KEY (`schedule_id`) REFERENCES schedule(`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Dumping data for table `schedule`
--


INSERT INTO `schedule` (`schedule_id`, `schedule_name`, `availability`, `image_url`) VALUES
(560969, 'Badminton Court', 'Yes', 'images/generic_badminton.png'),
(560421, 'BBQ Pit Area 1', 'Yes', 'images/generic_bbqpit.jpg'),
(561940, 'BBQ Pit Area 2', 'Yes', 'images/generic_bbqpit.jpg'),
(560581, 'Picnic Pavilion Area 1', 'Yes', 'images/pavilion.jpg'),
(561941, 'Picnic Pavilion Area 2', 'Yes', 'images/pavilion.jpg'),
(561942, 'Volleyball Courts', 'Yes', 'images/generic_volleyball.png')
;
COMMIT;

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`facility_id`, `schedule_id`,`facility_name`, `location`, `availability`, `image_url`) VALUES
(810431, 560421, 'BBQ Pit 1.1', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810432, 560421, 'BBQ Pit 1.2', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810433, 560421, 'BBQ Pit 1.3', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810434, 560421, 'BBQ Pit 1.4', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810435, 560421, 'BBQ Pit 1.5', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810436, 560421, 'BBQ Pit 1.6', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810437, 560421, 'BBQ Pit 1.7', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810438, 560421, 'BBQ Pit 1.8', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810439, 560421, 'BBQ Pit 1.9', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(810440, 560421, 'BBQ Pit 1.10', 'Area 1', 'Yes', 'images/bbqpit_1.jpg'),
(812812, 561940, 'BBQ Pit 2.1', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812813, 561940, 'BBQ Pit 2.2', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812814, 561940, 'BBQ Pit 2.3', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812815, 561940, 'BBQ Pit 2.4', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812816, 561940, 'BBQ Pit 2.5', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812817, 561940, 'BBQ Pit 2.6', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812818, 561940, 'BBQ Pit 2.7', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812819, 561940, 'BBQ Pit 2.8', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812820, 561940, 'BBQ Pit 2.9', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(812821, 561940, 'BBQ Pit 2.10', 'Area 2', 'Yes', 'images/bbqpit_2.jpg'),
(810702, 560581, 'Picnic Pavilion 1.1', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810703, 560581, 'Picnic Pavilion 1.2', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810704, 560581, 'Picnic Pavilion 1.3', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810705, 560581, 'Picnic Pavilion 1.4', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810706, 560581, 'Picnic Pavilion 1.5', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810707, 560581, 'Picnic Pavilion 1.6', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810708, 560581, 'Picnic Pavilion 1.7', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(810709, 560581, 'Picnic Pavilion 1.8', 'Area 1', 'Yes', 'images/pavilion.jpg'),
(812822, 561941, 'Picnic Pavilion 2.1', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812823, 561941, 'Picnic Pavilion 2.2', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812824, 561941, 'Picnic Pavilion 2.3', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812825, 561941, 'Picnic Pavilion 2.4', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812826, 561941, 'Picnic Pavilion 2.5', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812827, 561941, 'Picnic Pavilion 2.6', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812828, 561941, 'Picnic Pavilion 2.7', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(812829, 561941, 'Picnic Pavilion 2.8', 'Area 2', 'Yes', 'images/pavilion.jpg'),
(811259, 560969, 'Badminton Court 1', 'Area 1', 'Yes', 'images/badminton_court.jpg'),
(811260, 560969, 'Badminton Court 2', 'Area 1', 'Yes', 'images/badminton_court.jpg'),
(811261, 560969, 'Badminton Court 3', 'Area 1', 'Yes', 'images/badminton_court.jpg'),
(811262, 560969, 'Badminton Court 4', 'Area 1', 'Yes', 'images/badminton_court.jpg'),
(812830, 561942, 'Volleyball Court 1', 'Area 1', 'Yes', 'images/volleyball_court.jpg'),
(812831, 561942, 'Volleyball Court 2', 'Area 1', 'Yes', 'images/volleyball_court.jpg'),
(812832, 561942, 'Volleyball Court 3', 'Area 1', 'Yes', 'images/volleyball_court.jpg'),
(812833, 561942, 'Volleyball Court 4', 'Area 1', 'Yes', 'images/volleyball_court.jpg')
;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
