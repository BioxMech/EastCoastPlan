CREATE DATABASE IF NOT EXISTS `EastCoastPlan` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `EastCoastPlan`;

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) not null,
  `facility_id` int(11) not null,
  `price` decimal(10,2) not null,
  `status` varchar(10) NOT NULL DEFAULT 'pending',
  `payment_date` datetime,
  PRIMARY KEY (`payment_id`)	
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- constraint payment_fk1 foreign key(customer_id) reference user(user_id)
-- constraint payment_fk2 foreign key(facility_id) reference facility(facility_id)
-- constraint payment_fk3 foreign key(price) reference booking(price)


INSERT INTO `payment` (`payment_id`, `user_id`, `facility_id`, `price`, `status`, `payment_date`) VALUES
('00001', '1234', '5678', 100.50, 'pending', null),
('00002', '2323', '8647', 76.90, 'completed', '2020-11-06 16:07:48'),
('00003', '4375', '8537', 57.90, 'pending', null),
('00004', '6484', '1745', 60.00, 'pending', null),
('00005', '9465', '0473', 69.69, 'completed', '2019-04-03 19:47:11'),
('00006', '0264', '7465', 510.90, 'completed', '2021-03-18 14:47:00');
COMMIT;