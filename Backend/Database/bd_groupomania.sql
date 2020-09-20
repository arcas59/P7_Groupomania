-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3309
-- Généré le :  Dim 20 sep. 2020 à 16:48
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bd_groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `postId` smallint(5) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL,
  `content` text NOT NULL,
  `likes` smallint(5) UNSIGNED DEFAULT NULL,
  `usersLiked` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `date_creation`, `content`, `likes`, `usersLiked`) VALUES
(3, 2, 1, '2020-09-20 17:56:34', 'Heureux de faire partie de Groupomania :)', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `postId` smallint(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL,
  `date_modify` datetime NOT NULL,
  `content` text NOT NULL,
  `likes` smallint(5) UNSIGNED DEFAULT 0,
  `usersLiked` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `date_creation`, `date_modify`, `content`, `likes`, `usersLiked`) VALUES
(2, 4, '2020-09-20 18:02:25', '2020-09-29 18:07:45', 'Woaw, super ce réseau social !', 0, NULL),
(4, 2, '2020-09-20 18:03:14', '2020-09-29 18:08:12', 'Bonjour tous le monde', 0, NULL),
(6, 5, '2020-09-20 18:04:51', '2020-09-29 18:09:31', 'Bonjour à tous !', 0, NULL),
(8, 9, '2020-09-20 18:05:52', '2020-09-29 18:10:30', 'Bonjour mes chers collègues :)', 0, NULL),
(10, 8, '2020-09-20 18:06:15', '2020-09-29 18:11:13', 'Je pense que cette application va être un succés', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(320) NOT NULL,
  `imageUrl` text DEFAULT NULL,
  `modo` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `imageUrl`, `modo`) VALUES
(1, 'Alphonse', 'Bronsart', 'abronsart@hotmail.fr', 'dbc6e3a9ab5e4c094b8ca3169bac4e298110b9865cb5ed6d503f7e1df90ba1d6', NULL, 0),
(2, 'Eloise', 'Dutilleul', 'edutilleul@hotmail.fr', 'fc59487712bbe89b488847b77b5744fb6b815b8fc65ef2ab18149958edb61464', NULL, 0),
(3, 'Patrick', 'Rotier', 'protier@hotmail.fr', '16f5551f701388c607a9a934dd4d9bf17e0390b84de0188b3952b2746c0d9a2f', NULL, 0),
(4, 'Louisa', 'Dusi', 'ldusi@hotmail.fr', '31e06f7d89feb99a0e6c0affe198748c3bb5bef5e3cc92d95cb9e996197d3fc3', NULL, 0),
(5, 'Emmeline', 'Vicas', 'evicas@hotmail.fr', '4ca6f6d5a544bf57c323657ad33aae1a019c775518cf4414beedb86962aea7c1', NULL, 0),
(6, 'Jean', 'Artus', 'jartus@hotmail.fr', '75c0df8291a4d54f4dd9a99e8018efb93de9039550ac092f60c0934f6c2c671f', NULL, 0),
(7, 'Carole', 'Finaro', 'cfinaro@hotmail.fr', '23a3a8ed8403772203787f83c96a0c929bae1e8e1054c8d3621c33c4b3d4a3ae', NULL, 1),
(8, 'Pascal', 'Santero', 'psantero@hotmail.fr', '07bea691e1173e5366d4ddf2c13103802b3f16441c81d6a19037a6d88118b46c', NULL, 0),
(9, 'Nelson', 'Ribas', 'nribas@hotmail.fr', '9cae8ee3d3478447cdae2996011279d3134532c6ec822e4e5609cf9a11d54edb', NULL, 0),
(10, 'Bernard', 'jourtin', 'bjourtin@hotmail.fr', 'f7b817fdf0b74d106d0641a03f81737bc290d6360c5f3785ee483e5c681ae1a2', NULL, 0),
(11, 'Helene', 'Souza', 'hsouza@hotmail.fr', '94c8bcf55d4bc323b645a7eeb1eed2101be572b83e09f799028b4557291e96c8', NULL, 0),
(12, 'Manuel', 'Herbier', 'mherbier@hotmail.fr', '293562e3d393ffaa0f22d3cc08d8d82d868da749697c6335d02c8b3b65ad3c69', NULL, 0),
(14, 'Nicolas', 'Nussin', 'nnussin@hotmail.fr', '06964dd2fac36383601ce9729fd9341e167c6870659cd3af55d906c14f2e2c4c', NULL, 0),
(15, 'Anna', 'Klouser', 'aklouser@hotmail.fr', 'e39456c14927ddccd0b6a18207e1e410159e064fdd5b934467bd0158ae803387', NULL, 0),
(16, 'Charlotte', 'Sardrie', 'csardrie@hotmail.fr', '371be5769768e9c483d92aa2b77d95503b3995901731f5f2bf75d8ae03e2a477', NULL, 0),
(17, 'Vincent', 'Triar', 'vtriar@hotmail.fr', '5694d08a2e53ffcae0c3103e5ad6f6076abd960eb1f8a56577040bc1028f702b', NULL, 0),
(19, 'Patricia', 'Duchemin', 'pduchemin@hotmail.fr', 'd6e920ba6861dda807fab9b3a8b63cd8e68ece749563a28c0d05ea0bf0b4d9ba', NULL, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
