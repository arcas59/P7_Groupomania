-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 13 oct. 2020 à 08:59
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniadb`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idPost` int(11) NOT NULL,
  `auteur` varchar(60) NOT NULL DEFAULT '',
  `message` varchar(100) NOT NULL DEFAULT '',
  `idAuteur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idPost`, `auteur`, `message`, `idAuteur`) VALUES
(37, 60, 'arcas', 'Premier à poster ', 52),
(38, 60, 'Luc59', 'Zut tu m\'as devancé lol', 53),
(39, 60, 'kelly59', 'Bonjour à vous deux !', 54),
(40, 61, 'kelly59', 'Je crois que l\'on à dejà travaillé ensemble sur un projet Luc !', 54),
(41, 62, 'Anna59', 'Mowawawawa, j\'adore les chats Kelly !', 55),
(42, 61, 'Anna59', 'Bonjour Luc !', 55),
(43, 60, 'Anna59', 'Vous êtes dingues lol', 55),
(44, 60, 'Sacha59', 'hahahahaha', 56),
(45, 63, 'Sacha59', 'Coooooool', 56),
(46, 61, 'Sacha59', 'Hé hé hé, salut !', 56),
(47, 62, 'Sacha59', 'J\'adore les chats aussi...', 56),
(48, 62, 'Sacha59', 'J\'en ai trois à la maison hi hi', 56),
(49, 65, 'Sacha59', 'Bienvenue parmi nous Andréa', 56),
(50, 65, 'Andrea59', 'Merci Sacha !', 57),
(51, 64, 'Andrea59', 'C\'est vraiment cool comme concept', 57),
(52, 63, 'Andrea59', 'Trop marrant ton chat Anna', 57),
(53, 62, 'Andrea59', 'Moi je préfère les chiens ', 57),
(54, 61, 'Andrea59', 'Bonjour Luc, ravie de te rencontrer par gif', 57),
(55, 60, 'Andrea59', 'Il va devenir mythique ce premier post', 57),
(56, 65, 'arcas', 'On va pouvoir communiquer de façon plus cool ici', 52),
(57, 64, 'arcas', 'Vive les Gifs !', 52),
(58, 63, 'arcas', 'C\'est normal si je suis hypnotisé par ce gif ?', 52),
(59, 62, 'arcas', 'Vraiment cool ce chat ', 52),
(60, 61, 'arcas', 'Coucou Luc !', 52),
(61, 65, 'Luc59', 'C\'est vraiment top comme idée !', 53),
(62, 64, 'Luc59', 'Breaking Bad, je suis trop fan !', 53),
(63, 63, 'Luc59', 'Il faudra faire pareille dans les bureaux lundi lol', 53),
(64, 62, 'Luc59', 'Moi, le vendredi à 16h00 ', 53),
(65, 65, 'Pierre59', 'Bonjour à toutes et tous !', 58),
(66, 65, 'Pierre59', 'On va passer des bons moments ici je crois bien !', 58),
(67, 64, 'Pierre59', 'Le début d\'une grande aventure !', 58),
(69, 66, 'admin', 'Coucou Pierre !', 60),
(70, 66, 'arcas', 'Trop fort, l\'Admin qui répond à Pierre. Petit chanceux !', 52),
(71, 63, 'arcas', 'Compte sur moi !', 52),
(75, 69, 'arcas', 'Bonjour Florent !!!', 52),
(79, 68, 'kelly59', 'Je crois que tous les membres de Groupomania vont très vite nous rejoindre !', 54),
(80, 68, 'admin', 'Je crois bien, en effet !', 60);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `authorId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `message` varchar(100) NOT NULL DEFAULT '',
  `nbComments` int(11) DEFAULT '0',
  `isFlagged` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `authorId`, `image`, `message`, `nbComments`, `isFlagged`) VALUES
(60, 52, 'http://localhost:3000/posts/bonjour21.gif1601587642943.gif', 'Heureux de faire partie de ce nouveau projet mes chers collègues', 0, 0),
(61, 53, 'http://localhost:3000/posts/bonjour3.gif1601720467927.gif', 'Bonjour tous le monde !!!', 0, 0),
(62, 54, 'http://localhost:3000/posts/chat3.gif1601721646918.gif', 'Cool comme initiative !', 0, 0),
(63, 55, 'http://localhost:3000/posts/chat4.gif1601723173637.gif', 'Je crois que je vais passer du temps ici !', 0, 0),
(64, 56, 'http://localhost:3000/posts/jarrive.gif1601730747502.gif', 'Attention, j\'arrive aussi sur Groupomania !!!', 0, 0),
(65, 57, 'http://localhost:3000/posts/howimeetyourmother.gif1601731548209.gif', 'Woaaaaaaw, c\'est top ici ! C\'est trop cool pour échanger !', 0, 0),
(66, 58, 'http://localhost:3000/posts/coucou.gif1601821704137.gif', 'Coucou tous le monde !!!', 0, 0),
(68, 52, 'http://localhost:3000/posts/reflechir.gif1601839036402.gif', 'Il commence à y avoir du monde ici', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(60) NOT NULL DEFAULT '',
  `prenom` varchar(60) NOT NULL DEFAULT '',
  `pseudo` varchar(60) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT 'http://localhost:3000/profiles/defaultUser.png',
  `role` varchar(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `pseudo`, `email`, `password`, `avatar`, `role`) VALUES
(52, 'Ribeiro', 'Adrien', 'arcas', 'ADRIENRIB59@HOTMAIL.FR', '$2b$10$S2Hsrb.gJKcyOrAV689gzu.eaehlG4NXB00YvFneiu45dPHwa3Rl6', 'http://localhost:3000/profiles/Adrien.jpg1601652869258.jpg', 'user'),
(53, 'Rotario', 'Luc', 'Luc59', 'luc@hotmail.fr', '$2b$10$gA08jEJ6pfCB1/T.F9aJi.TadCsjydDldlyGdwDdNlplXtEvsjbmO', 'http://localhost:3000/profiles/Luc1.jpg1601654080046.jpg', 'user'),
(54, 'Souza', 'Kelly', 'kelly59', 'kelly59@hotmail.fr', '$2b$10$mOWslYLciBlzWPpv71Um4.7qh45TdQDDJuli.5aAG14Lrjg35Stb2', 'http://localhost:3000/profiles/Photok.jpg1601720688160.jpg', 'user'),
(55, 'Pierry', 'Anna', 'Anna59', 'Anna59@hotmail.fr', '$2b$10$xWPOJT03wcLGYDclK2l9ouv/PYUnC52YCEeCwk6nW/f4J91Zn0nMu', 'http://localhost:3000/profiles/anna.jpg1601723073001.jpg', 'user'),
(56, 'Sertaud', 'Sacha', 'Sacha59', 'sacha59@hotmail.fr', '$2b$10$meScCHJUyt1KQco8sMO9duwrBvtsM./W22qSUFY2z.bMSCu5DetYO', 'http://localhost:3000/profiles/sacha.jpg1601724300441.jpg', 'user'),
(57, 'Velasqueze', 'Andréa', 'Andrea59', 'andrea59@hotmail.fr', '$2b$10$iz76SmhBlQIepDGdav2Yw.bu.DKr6EC6orYu8w8bu1zBiiIIElnb2', 'http://localhost:3000/profiles/andrea.jpg1601731115289.jpg', 'user'),
(58, 'Turan', 'Pierre', 'Pierre59', 'pierre59@hotmail.fr', '$2b$10$.sZViUw6z4TJhx5dbXyOz.jQibGOgM6EXnc88FXr4U4N5bbmNjuxu', 'http://localhost:3000/profiles/pierre.jpg1601821296124.jpg', 'user'),
(60, 'admin', 'admin', 'admin', 'admin@groupomania.com', '$2b$10$3Ovv/11.osktYeRt9mfTxeXTi285X4kQP2v5dBb97FKpRU7pwghI2', 'http://localhost:3000/profiles/admin.jpg1601827381139.jpg', 'admin'),
(61, 'Rarut', 'Nelson', 'Nelson59', 'Nelson59@hotmail.fr', '$2b$10$Lm.wiceNcZkIixQW35Rjvu/84x83eplst.2eDtShNOyCZCaO3VRaW', 'http://localhost:3000/profiles/defaultUser.png', 'user'),
(64, 'Galapas', 'Clementine', 'Clementine59', 'edd1d8ba55c309a12f7800221f8e3cb8', '$2b$10$ya9O.3kqr0dUKNEegVeOgepIJ74nvgYmtMDwHUljk8rKVy25C9xdG', 'http://localhost:3000/profiles/defaultUser.png', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
