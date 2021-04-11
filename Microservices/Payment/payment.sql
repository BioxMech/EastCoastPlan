CREATE DATABASE IF NOT EXISTS `Payment` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `Payment`;

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `booking_id` varchar(64) NOT NULL,
  `schedule_id` varchar(64) NOT NULL,
  `facility_id` varchar(64) NOT NULL,
  `user_id` int(11) not null,
  `full_name` varchar(64) NOT NULL,
  `price` decimal(10,2) not null,
  `start` varchar(64) NOT NULL,
  `finish` varchar(64) NOT NULL,
  `payment_date` datetime,
  PRIMARY KEY (`booking_id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- constraint payment_fk1 foreign key(customer_id) reference user(user_id)
-- constraint payment_fk2 foreign key(facility_id) reference facility(facility_id)
-- constraint payment_fk3 foreign key(price) reference booking(price)


-- INSERT INTO `payment` (`booking_id`, `schedule_id`, `facility_id`, `user_id`, `full_name`, `price`, `start`, `finish`, `payment_date`) VALUES
-- ('00001', '1234', '810431', 100.50, 'pending', null);
COMMIT;