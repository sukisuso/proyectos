-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2015 at 05:37 PM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ozone`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_action`
--

CREATE TABLE IF NOT EXISTS `t_action` (
  `ta_id` bigint(20) NOT NULL,
  `tu_id` bigint(20) NOT NULL,
  `ta_target` bigint(20) NOT NULL,
  `ta_fechafin` datetime NOT NULL,
  `ta_tipo` bigint(20) NOT NULL,
  `ta_activo` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_action`
--

INSERT INTO `t_action` (`ta_id`, `tu_id`, `ta_target`, `ta_fechafin`, `ta_tipo`, `ta_activo`) VALUES
(19, 23, 10, '2015-08-18 19:26:32', 1, 0),
(20, 24, 10, '2015-08-15 15:10:12', 1, 0),
(21, 25, 0, '0000-00-00 00:00:00', 1, 0),
(22, 26, 2, '2015-08-15 13:58:13', 1, 1),
(23, 27, 10, '2015-08-18 20:44:01', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_action_type`
--

CREATE TABLE IF NOT EXISTS `t_action_type` (
  `tat_id` bigint(20) NOT NULL,
  `tat_descripcion` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_action_type`
--

INSERT INTO `t_action_type` (`tat_id`, `tat_descripcion`) VALUES
(1, 'Misión de recolectar'),
(2, 'Batalla en curso');

-- --------------------------------------------------------

--
-- Table structure for table `t_almacen`
--

CREATE TABLE IF NOT EXISTS `t_almacen` (
  `tal_id` bigint(20) NOT NULL,
  `tal_nivel` int(11) NOT NULL,
  `tal_coste_metal` int(11) NOT NULL,
  `tal_coste_cristal` int(11) NOT NULL,
  `tal_coste_ozone` int(11) NOT NULL,
  `tal_capacidad` int(11) NOT NULL,
  `tal_costeTemporal` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_almacen`
--

INSERT INTO `t_almacen` (`tal_id`, `tal_nivel`, `tal_coste_metal`, `tal_coste_cristal`, `tal_coste_ozone`, `tal_capacidad`, `tal_costeTemporal`) VALUES
(1, 0, 0, 0, 0, 300, 0),
(2, 1, 200, 200, 0, 350, 60),
(3, 2, 250, 250, 0, 400, 90),
(4, 3, 375, 300, 15, 500, 120),
(5, 4, 425, 350, 20, 575, 200),
(6, 5, 500, 375, 30, 675, 230),
(7, 6, 595, 450, 35, 800, 260),
(8, 7, 700, 550, 50, 875, 300),
(9, 8, 790, 625, 75, 975, 375),
(10, 9, 900, 700, 100, 1020, 475),
(11, 10, 1200, 1200, 1200, 1100, 600);

-- --------------------------------------------------------

--
-- Table structure for table `t_army`
--

CREATE TABLE IF NOT EXISTS `t_army` (
  `tar_id` bigint(20) NOT NULL,
  `tupt_id` bigint(20) NOT NULL,
  `tal_coste_metal` int(11) NOT NULL,
  `tal_coste_cristal` int(11) NOT NULL,
  `tal_coste_ozone` int(11) NOT NULL,
  `tal_coste_temporal` int(11) NOT NULL,
  `tar_potencial` int(11) NOT NULL,
  `tar_nivel` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_army`
--

INSERT INTO `t_army` (`tar_id`, `tupt_id`, `tal_coste_metal`, `tal_coste_cristal`, `tal_coste_ozone`, `tal_coste_temporal`, `tar_potencial`, `tar_nivel`) VALUES
(1, 5, 0, 0, 0, 0, 0, 0),
(2, 5, 300, 300, 160, 300, 200, 1),
(3, 5, 480, 480, 200, 500, 410, 2),
(4, 5, 500, 500, 240, 700, 550, 3),
(5, 5, 630, 630, 300, 800, 750, 4),
(6, 5, 725, 725, 375, 900, 900, 5),
(8, 5, 850, 800, 450, 1000, 1300, 6),
(9, 5, 900, 875, 550, 1100, 1500, 7),
(10, 5, 975, 950, 600, 1200, 1750, 8),
(11, 5, 1020, 1000, 650, 1300, 2000, 9),
(12, 5, 1200, 1200, 1200, 1200, 1200, 10);

-- --------------------------------------------------------

--
-- Table structure for table `t_planetas`
--

CREATE TABLE IF NOT EXISTS `t_planetas` (
  `tp_id` int(11) NOT NULL,
  `tp_nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `tp_distancia` int(11) NOT NULL,
  `tp_r_metal` int(11) NOT NULL,
  `tp_r_cristal` int(11) NOT NULL,
  `tp_r_ozone` int(11) NOT NULL,
  `tp_r_size` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_planetas`
--

INSERT INTO `t_planetas` (`tp_id`, `tp_nombre`, `tp_distancia`, `tp_r_metal`, `tp_r_cristal`, `tp_r_ozone`, `tp_r_size`) VALUES
(1, 'Terrium', 30, 50, 50, 50, 50),
(2, 'Privium', 32, 75, 35, 30, 75),
(3, 'Litium', 500, 50, 1500, 3000, 500),
(5, 'Celsium', 30, 0, 0, 0, 50),
(6, 'Vikium', 79, 0, 0, 0, 96),
(7, 'Monnvil', 800, 0, 0, 0, 99),
(8, 'Micium', 600, 0, 0, 0, 900),
(9, 'Tirmelon', 350, 0, 0, 0, 300),
(10, 'Lacion', 20, 0, 0, 0, 60);

-- --------------------------------------------------------

--
-- Table structure for table `t_recursos`
--

CREATE TABLE IF NOT EXISTS `t_recursos` (
  `tr_id` bigint(20) NOT NULL,
  `tu_id` bigint(20) NOT NULL,
  `tr_u_metal` int(11) NOT NULL DEFAULT '0',
  `tr_u_cristal` int(11) NOT NULL DEFAULT '0',
  `tr_u_ozone` int(11) NOT NULL DEFAULT '0',
  `tr_na_metal` bigint(20) NOT NULL DEFAULT '0',
  `tr_na_cristal` bigint(20) NOT NULL DEFAULT '0',
  `tr_na_ozone` bigint(20) NOT NULL DEFAULT '0',
  `tr_n_s_parallax` int(11) NOT NULL,
  `tr_n_a_cannonlaser` int(11) NOT NULL,
  `tr_damage` int(11) NOT NULL,
  `tr_puntos` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_recursos`
--

INSERT INTO `t_recursos` (`tr_id`, `tu_id`, `tr_u_metal`, `tr_u_cristal`, `tr_u_ozone`, `tr_na_metal`, `tr_na_cristal`, `tr_na_ozone`, `tr_n_s_parallax`, `tr_n_a_cannonlaser`, `tr_damage`, `tr_puntos`) VALUES
(7, 23, 648, 719, 360, 6, 6, 3, 3, 5, 98, 2863),
(8, 24, 0, 38, 65, 3, 4, 0, 1, 3, 83, 1118),
(9, 25, 100, 100, 100, 0, 0, 0, 0, 0, 100, 0),
(10, 26, 19, 25, 102, 1, 1, 0, 0, 1, 79, 229),
(11, 27, 154, 196, 227, 5, 5, 4, 1, 4, 81, 2038);

-- --------------------------------------------------------

--
-- Table structure for table `t_report`
--

CREATE TABLE IF NOT EXISTS `t_report` (
  `trep_id` bigint(20) NOT NULL,
  `trep_atacanteid` bigint(20) NOT NULL,
  `trep_defensorid` bigint(20) NOT NULL,
  `trep_nombreatacante` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `trep_nombredefensor` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `ronda1_ataque` int(11) NOT NULL,
  `ronda1_defensa` int(11) NOT NULL,
  `ronda2_ataque` int(11) NOT NULL,
  `ronda2_defensa` int(11) NOT NULL,
  `ronda3_ataque` int(11) NOT NULL,
  `ronda3defensa` int(11) NOT NULL,
  `trep_id_ganador` bigint(20) NOT NULL,
  `trep_lector` bigint(20) NOT NULL,
  `trep_metal` int(11) NOT NULL,
  `trep_cristal` int(11) NOT NULL,
  `trep_ozone` int(11) NOT NULL,
  `trep_fecha` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_report`
--

INSERT INTO `t_report` (`trep_id`, `trep_atacanteid`, `trep_defensorid`, `trep_nombreatacante`, `trep_nombredefensor`, `ronda1_ataque`, `ronda1_defensa`, `ronda2_ataque`, `ronda2_defensa`, `ronda3_ataque`, `ronda3defensa`, `trep_id_ganador`, `trep_lector`, `trep_metal`, `trep_cristal`, `trep_ozone`, `trep_fecha`) VALUES
(16, 23, 26, 'admin', 'jvic00', 244, 0, 0, 230, 262, 0, 23, 26, 19, 25, 102, '2015-08-15 14:00:28');

-- --------------------------------------------------------

--
-- Table structure for table `t_shield`
--

CREATE TABLE IF NOT EXISTS `t_shield` (
  `ts_id` bigint(20) NOT NULL,
  `tupt_id` bigint(20) NOT NULL,
  `tal_coste_metal` int(11) NOT NULL,
  `tal_coste_cristal` int(11) NOT NULL,
  `tal_coste_ozone` int(11) NOT NULL,
  `tal_coste_temporal` int(11) NOT NULL,
  `ts_escudos` int(11) NOT NULL,
  `ts_nivel` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_shield`
--

INSERT INTO `t_shield` (`ts_id`, `tupt_id`, `tal_coste_metal`, `tal_coste_cristal`, `tal_coste_ozone`, `tal_coste_temporal`, `ts_escudos`, `ts_nivel`) VALUES
(1, 4, 500, 500, 200, 400, 150, 1),
(2, 4, 0, 0, 0, 0, 0, 0),
(3, 4, 600, 575, 325, 600, 300, 2),
(4, 4, 750, 700, 475, 800, 600, 3),
(5, 4, 850, 775, 500, 1000, 900, 4),
(6, 4, 900, 800, 550, 1200, 1300, 5),
(7, 4, 1000, 875, 650, 1400, 1500, 6),
(8, 4, 1020, 1000, 700, 1600, 1900, 7),
(9, 4, 1200, 1200, 1200, 1200, 2500, 8);

-- --------------------------------------------------------

--
-- Table structure for table `t_update`
--

CREATE TABLE IF NOT EXISTS `t_update` (
  `tup_id` bigint(20) NOT NULL,
  `tu_id` bigint(20) NOT NULL,
  `tup_tipo` bigint(20) NOT NULL,
  `tup_fechafin` datetime NOT NULL,
  `tup_activo` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_update`
--

INSERT INTO `t_update` (`tup_id`, `tu_id`, `tup_tipo`, `tup_fechafin`, `tup_activo`) VALUES
(20, 23, 5, '2015-08-15 20:25:40', 0),
(21, 24, 5, '2015-08-15 15:21:46', 0),
(22, 25, 0, '0000-00-00 00:00:00', 0),
(23, 26, 2, '2015-08-15 13:57:09', 0),
(24, 27, 5, '2015-08-16 11:33:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_update_type`
--

CREATE TABLE IF NOT EXISTS `t_update_type` (
  `tupt_id` int(11) NOT NULL,
  `tupt_descripcion` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `tupt_seccion` bigint(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_update_type`
--

INSERT INTO `t_update_type` (`tupt_id`, `tupt_descripcion`, `tupt_seccion`) VALUES
(1, 'Almacén de metal', 0),
(2, 'Almacén de cristal', 0),
(3, 'Almacén de ozone', 0),
(4, 'Escudo Parallax', 1),
(5, 'Cañón Laser', 2);

-- --------------------------------------------------------

--
-- Table structure for table `t_update_type_seccion`
--

CREATE TABLE IF NOT EXISTS `t_update_type_seccion` (
  `tuts_id` bigint(20) NOT NULL,
  `tuts_descripcion` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_update_type_seccion`
--

INSERT INTO `t_update_type_seccion` (`tuts_id`, `tuts_descripcion`) VALUES
(0, 'Almacenes'),
(1, 'Escudos'),
(2, 'Armamento');

-- --------------------------------------------------------

--
-- Table structure for table `t_usuarios`
--

CREATE TABLE IF NOT EXISTS `t_usuarios` (
  `tu_id` bigint(20) NOT NULL COMMENT 'Id tabla usuarios',
  `tu_nick` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `tu_passwd` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_usuarios`
--

INSERT INTO `t_usuarios` (`tu_id`, `tu_nick`, `tu_passwd`) VALUES
(23, 'admin', 'olasuso1'),
(24, 'jeter_18', 'vicjeter6332cc0'),
(25, 'jvic', 'jueguecito'),
(26, 'jvic00', 'ukilliso'),
(27, 'YOSU', 'susopanoli');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_action`
--
ALTER TABLE `t_action`
  ADD PRIMARY KEY (`ta_id`);

--
-- Indexes for table `t_almacen`
--
ALTER TABLE `t_almacen`
  ADD PRIMARY KEY (`tal_id`);

--
-- Indexes for table `t_army`
--
ALTER TABLE `t_army`
  ADD PRIMARY KEY (`tar_id`);

--
-- Indexes for table `t_planetas`
--
ALTER TABLE `t_planetas`
  ADD PRIMARY KEY (`tp_id`);

--
-- Indexes for table `t_recursos`
--
ALTER TABLE `t_recursos`
  ADD PRIMARY KEY (`tr_id`),
  ADD UNIQUE KEY `tu_id` (`tu_id`);

--
-- Indexes for table `t_report`
--
ALTER TABLE `t_report`
  ADD PRIMARY KEY (`trep_id`);

--
-- Indexes for table `t_shield`
--
ALTER TABLE `t_shield`
  ADD PRIMARY KEY (`ts_id`);

--
-- Indexes for table `t_update`
--
ALTER TABLE `t_update`
  ADD PRIMARY KEY (`tup_id`);

--
-- Indexes for table `t_update_type`
--
ALTER TABLE `t_update_type`
  ADD PRIMARY KEY (`tupt_id`);

--
-- Indexes for table `t_update_type_seccion`
--
ALTER TABLE `t_update_type_seccion`
  ADD PRIMARY KEY (`tuts_id`);

--
-- Indexes for table `t_usuarios`
--
ALTER TABLE `t_usuarios`
  ADD PRIMARY KEY (`tu_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_action`
--
ALTER TABLE `t_action`
  MODIFY `ta_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `t_almacen`
--
ALTER TABLE `t_almacen`
  MODIFY `tal_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `t_army`
--
ALTER TABLE `t_army`
  MODIFY `tar_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `t_planetas`
--
ALTER TABLE `t_planetas`
  MODIFY `tp_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `t_recursos`
--
ALTER TABLE `t_recursos`
  MODIFY `tr_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `t_report`
--
ALTER TABLE `t_report`
  MODIFY `trep_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `t_shield`
--
ALTER TABLE `t_shield`
  MODIFY `ts_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `t_update`
--
ALTER TABLE `t_update`
  MODIFY `tup_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `t_update_type`
--
ALTER TABLE `t_update_type`
  MODIFY `tupt_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `t_update_type_seccion`
--
ALTER TABLE `t_update_type_seccion`
  MODIFY `tuts_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `t_usuarios`
--
ALTER TABLE `t_usuarios`
  MODIFY `tu_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Id tabla usuarios',AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
