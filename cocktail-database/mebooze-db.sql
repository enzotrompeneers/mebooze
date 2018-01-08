# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: mebooze
# Generation Time: 2018-01-08 11:04:49 +0000
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
	(1,'cocktail','cocktail.jpg'),
	(2,'mocktail','mocktail.jpg'),
	(3,'smoothie','smoothie.jpg');

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
  PRIMARY KEY (`id`),
  KEY `cocktails_categorie_id_foreign` (`categorie_id`),
  CONSTRAINT `cocktails_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `cocktails` WRITE;
/*!40000 ALTER TABLE `cocktails` DISABLE KEYS */;

INSERT INTO `cocktails` (`id`, `name`, `image`, `categorie_id`)
VALUES
	(1,'sex on the beach','sex-on-the-beach.jpg',1),
	(2,'pina colada','pina-colada.jpg',1),
	(3,'virgin paloma','virgin-paloma.jpg',2);

/*!40000 ALTER TABLE `cocktails` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ingredients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ingredients`;

CREATE TABLE `ingredients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cocktail_id` int(10) unsigned NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ingredients_cocktail_id_foreign` (`cocktail_id`),
  CONSTRAINT `ingredients_cocktail_id_foreign` FOREIGN KEY (`cocktail_id`) REFERENCES `cocktails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;

INSERT INTO `ingredients` (`id`, `name`, `amount`, `unit`, `cocktail_id`, `image`)
VALUES
	(1,'vodka','30','ml',1,'vodka.jpg'),
	(2,'peach liqueur','30','ml',1,'peach-liqueur.jpg'),
	(3,'cranberry juice','40','ml',1,'cranberry-juice.jpg'),
	(4,'orange juice','50','ml',1,'orange-juice.jpg'),
	(5,'grapefruit juice','50','ml',1,'grapefruit-juice.jpg'),
	(6,'cherry','1','fruit',1,'cherry.jpg'),
	(7,'white rum','60','ml',2,'white-rum.jpg'),
	(8,'pineapple juice','60','ml',2,'pinapple-juice.jpg'),
	(9,'coconot milk','60','ml',2,'coconot-milk.jpg'),
	(10,'liquid cream','20','ml',2,'liquid-cream.jpg'),
	(11,'pinapple slice','1','fruit',2,'pinapple-slice.jpg'),
	(12,'lime juice','50','ml',3,'lime-juice.jpg'),
	(13,'grapefruit juice','30','ml',3,'grapefruit-juice.jpg'),
	(14,'agave syrup','30','ml',3,'agave-syrup.jpg'),
	(15,'lime slice','1','fruit',3,'lime-slice.jpg');

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
	(19,'2017_12_28_132534_create_cocktails_table',1),
	(20,'2018_01_07_214112_create_categories_table',1),
	(21,'2018_01_08_104831_create_ingredients_table',1),
	(22,'2018_01_08_104841_create_foreign_keys',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
