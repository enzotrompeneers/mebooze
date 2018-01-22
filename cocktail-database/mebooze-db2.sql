# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: mebooze
# Generation Time: 2018-01-22 12:54:24 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;

INSERT INTO `categories` (`id`, `name`, `image`)
VALUES
	(1,'liquor cocktails','cocktails.jpg'),
	(2,'mocktails','mocktails.jpg'),
	(3,'smoothies','smoothies.jpg'),
	(4,'wine cocktails','wine-cocktails.jpg'),
	(5,'beer cocktails','beer-cocktails.jpg'),
	(6,'champagne cocktails','champagne-cocktails.jpg'),
	(7,'hot cocktails','hot-cocktails.jpg');

/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cocktails
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cocktails`;

CREATE TABLE `cocktails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categorie_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `cocktails` WRITE;
/*!40000 ALTER TABLE `cocktails` DISABLE KEYS */;

INSERT INTO `cocktails` (`id`, `name`, `image`, `categorie_id`)
VALUES
	(1,'sex on the beach','sex-on-the-beach.jpg',1),
	(2,'pina colada','pina-colada.jpg',1),
	(3,'virgin paloma','virgin-paloma.jpg',2),
	(4,'mojito','mojito.jpg',1),
	(5,'cuba libre','cuba-libre.jpg',1),
	(6,'venetian spritz','venetian-spritz.jpg',1),
	(7,'safe sex on the beach','safe-sex-on-the-beach.jpg',2),
	(8,'hugo raspberry dream','hugo-raspberry-dream.jpg',2),
	(9,'teisseire strawberry celebration','teisseire-strawberry-celebration.jpg',2),
	(10,'tournee minerale','tournee-minerale.jpg',2);

/*!40000 ALTER TABLE `cocktails` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ingredients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ingredients`;

CREATE TABLE `ingredients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cocktail_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;

INSERT INTO `ingredients` (`id`, `amount`, `unit`, `cocktail_id`, `product_id`)
VALUES
	(1,'30','ml',1,1),
	(2,'30','ml',1,2),
	(3,'40','ml',1,3),
	(4,'50','ml',1,4),
	(5,'50','ml',1,9),
	(6,'1','fruit',1,6),
	(7,'60','ml',2,15),
	(8,'60','ml',2,14),
	(9,'60','ml',2,7),
	(10,'20','ml',2,12),
	(11,'1','fruit',2,13),
	(12,'50','ml',3,10),
	(13,'30','ml',3,9),
	(14,'30','ml',3,5),
	(15,'1','fruit',3,11),
	(16,'50','ml',4,8),
	(17,'30','ml',4,10),
	(18,'20','ml',4,17),
	(19,'100','ml',4,18),
	(20,'10','fruit',4,16),
	(21,'30','ml',5,10),
	(22,'50','ml',5,15),
	(23,'20','ml',5,19),
	(24,'100','ml',5,20),
	(25,'1','fruit',5,23),
	(26,'50','ml',6,21),
	(27,'100','ml',6,22),
	(28,'50','ml',6,4),
	(29,'1','fruit',6,24),
	(30,'70','ml',7,3),
	(31,'70','ml',7,9),
	(32,'50','ml',7,25),
	(33,'20','ml',7,26),
	(34,'1','fruit',7,6),
	(35,'30','ml',8,29),
	(36,'20','ml',8,19),
	(37,'150','ml',8,28),
	(38,'3','fruit',8,27),
	(39,'20','ml',9,30),
	(40,'10','ml',9,19),
	(41,'50','ml',9,3),
	(42,'120','ml',9,31),
	(43,'1','fruit',9,32),
	(44,'30','ml',10,10),
	(45,'60','ml',10,29),
	(46,'110','ml',10,33),
	(47,'8','fruit',10,34);

/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `migration`, `batch`)
VALUES
	(1,'2017_12_28_132534_create_cocktails_table',1),
	(2,'2018_01_07_214112_create_categories_table',1),
	(3,'2018_01_08_104831_create_ingredients_table',1),
	(4,'2018_01_12_140113_create_products_table',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `name`, `image`)
VALUES
	(1,'vodka','vodka.jpg'),
	(2,'peach liqueur','peach-liqueur.jpg'),
	(3,'cranberry juice','cranberry-juice.jpg'),
	(4,'orange juice','orange-juice.jpg'),
	(5,'agave syrup','agave-syrup.jpg'),
	(6,'cherry','cherry.jpg'),
	(7,'coconut milk','coconut-milk.jpg'),
	(8,'dark rum','dark-rum.jpg'),
	(9,'grapefruit juice','grapefruit-juice.jpg'),
	(10,'lime juice','lime-juice.jpg'),
	(11,'lime slice','lime-slice.jpg'),
	(12,'liquid cream','liquid-cream.jpg'),
	(13,'pineapple slice','pineapple-slice.jpg'),
	(14,'pineapple juice','pineapple juice'),
	(15,'white rum','white-rum.jpg'),
	(16,'mint leaves','mint-leaves.jpg'),
	(17,'sugar syrup','sugar-syrup.jpg'),
	(18,'soda water','soda-water.jpg'),
	(19,'lemon juice','lemon-juice.jpg'),
	(20,'cola','cola.jpg'),
	(21,'aperol','aperol.jpg'),
	(22,'prosecco','prosecco.jpg'),
	(23,'lemon slice','lemon-slice.jpg'),
	(24,'orange slice','orange-slice.jpg'),
	(25,'peach juice','peache-juice.jpg'),
	(26,'grenadine','grenadine.jpg'),
	(27,'raspberries','raspberries.jpg'),
	(28,'sprite','sprite.jpg'),
	(29,'elderflower juice','elderflower-juice.jpg'),
	(30,'strawberry juice','strawberry-juice.jpg'),
	(31,'sparkling water','sparkling-water.jpg'),
	(32,'strawberry','strawberry.jpg'),
	(33,'water','water.jpg'),
	(34,'basillicum leaves','bassilicum-leaves.jpg');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
