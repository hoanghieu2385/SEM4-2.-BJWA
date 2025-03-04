USE `02_university`;
DROP TABLE IF EXISTS `members`;
DROP TABLE IF EXISTS `roles`;


--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `user_id` varchar(32) NOT NULL,
  `password` char(68) NOT NULL,
  `is_active` tinyint NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `members`
--

INSERT INTO `members`
VALUES
('user','{bcrypt}$2a$12$19h6n4yeLXGWjGRurMismuDVUZuLLK8Hn/jKpo.9gM.zSGV.VrwoG',1),
('admin','{bcrypt}$2a$12$19h6n4yeLXGWjGRurMismuDVUZuLLK8Hn/jKpo.9gM.zSGV.VrwoG',1),
('operator','{bcrypt}$2a$12$19h6n4yeLXGWjGRurMismuDVUZuLLK8Hn/jKpo.9gM.zSGV.VrwoG',1),
('ceo','{bcrypt}$2a$12$19h6n4yeLXGWjGRurMismuDVUZuLLK8Hn/jKpo.9gM.zSGV.VrwoG',1);


--
-- Table structure for table `authorities`
--

CREATE TABLE `roles` (
  `user_id` varchar(32) NOT NULL,
  `role` varchar(32) NOT NULL,
  UNIQUE KEY `role_idx_1` (`user_id`,`role`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `members` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `roles`
--

INSERT INTO `roles`
VALUES
('user','ROLE_USER'),
('admin','ROLE_ADMIN'),
('operator','ROLE_OPERATOR'),
('admin','ROLE_USER'),
('admin','ROLE_OPERATOR'),
('operator','ROLE_USER'),
('ceo','ROLE_CEO');
;
