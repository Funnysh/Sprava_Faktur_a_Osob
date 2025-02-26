-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Stř 26. úno 2025, 20:21
-- Verze serveru: 10.4.32-MariaDB
-- Verze PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `invoicedatabase`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `invoice`
--

CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL,
  `due_date` datetime NOT NULL,
  `invoice_number` int(11) NOT NULL,
  `issued` datetime NOT NULL,
  `note` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL,
  `product` varchar(255) NOT NULL,
  `vat` int(11) NOT NULL,
  `buyer_id` bigint(20) NOT NULL,
  `seller_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `invoice`
--

INSERT INTO `invoice` (`id`, `due_date`, `invoice_number`, `issued`, `note`, `price`, `product`, `vat`, `buyer_id`, `seller_id`) VALUES
(2, '2023-08-12 02:00:00', 2023005, '2023-07-10 02:00:00', 'Tvorba Spring a React článků', 50, 'Článek', 13, 4, 1),
(3, '2023-07-30 02:00:00', 2023001, '2023-07-23 02:00:00', 'Tvorba Spring článků', 100, 'Článek', 21, 2, 1),
(5, '2023-09-17 02:00:00', 2023003, '2023-09-10 02:00:00', 'Vývoj mobilní aplikace pro iOS', 150, 'Mobilní aplikace', 21, 4, 3),
(6, '2023-10-12 02:00:00', 2023004, '2023-10-05 02:00:00', 'Optimalizace pro vyhledávače', 120, 'SEO optimalizace', 21, 5, 4),
(7, '2023-11-08 01:00:00', 2023005, '2023-11-01 01:00:00', 'Tvorba grafických návrhů', 180, 'Grafický design', 21, 6, 5),
(8, '2025-03-19 01:00:00', 7899966, '2025-02-19 01:00:00', 'ZKOUŠKA', 3500, 'ZKOUŠKA', 21, 7, 3),
(9, '2023-08-01 02:00:00', 2023002, '2023-07-25 02:00:00', 'Kurz JavaScriptu', 2500, 'IT školení', 15, 11, 3),
(10, '2023-08-04 02:00:00', 2023003, '2023-07-28 02:00:00', 'Hosting pro klienta', 800, 'Webhosting', 21, 13, 5),
(11, '2023-08-08 02:00:00', 2023004, '2023-08-01 02:00:00', 'Logo design pro startup', 1800, 'Grafický design', 15, 9, 12),
(12, '2023-08-10 02:00:00', 2023005, '2023-08-03 02:00:00', 'Zlepšení vyhledávání', 1200, 'SEO optimalizace', 21, 1, 7),
(13, '2023-08-13 02:00:00', 2023006, '2023-08-06 02:00:00', 'Vývoj aplikace na míru', 5400, 'Mobilní aplikace', 10, 5, 6),
(14, '2023-08-16 02:00:00', 2023007, '2023-08-09 02:00:00', 'Strategie IT infrastruktury', 3000, 'IT konzultace', 15, 3, 13),
(15, '2023-08-19 02:00:00', 2023008, '2023-08-12 02:00:00', 'Texty pro e-shop', 900, 'Copywriting', 21, 6, 4),
(16, '2023-08-22 02:00:00', 2023009, '2023-08-15 02:00:00', 'Vývoj interního systému', 7800, 'Softwarové řešení', 10, 7, 11),
(17, '2023-08-25 02:00:00', 2023010, '2023-08-18 02:00:00', 'Online propagace produktu', 2100, 'Marketingová kampaň', 21, 12, 9),
(18, '2023-08-27 02:00:00', 2023011, '2023-08-20 02:00:00', 'Redesign firemního webu', 5000, 'Tvorba webových stránek', 21, 6, 1),
(19, '2023-08-29 02:00:00', 2023012, '2023-08-22 02:00:00', 'Roční poplatek za hosting', 1500, 'Cloud hosting', 21, 9, 3),
(20, '2023-09-01 02:00:00', 2023013, '2023-08-25 02:00:00', 'Reklamní kampaň na sociálních sítích', 3200, 'Digitální marketing', 15, 11, 5),
(21, '2023-09-04 02:00:00', 2023014, '2023-08-28 02:00:00', 'Kompletní řešení pro online obchod', 7200, 'Vývoj e-shopu', 10, 4, 7),
(22, '2023-09-08 02:00:00', 2023015, '2023-09-01 02:00:00', 'Školení zaměstnanců na nové technologie', 1800, 'Firemní školení', 21, 13, 9),
(23, '2023-09-10 02:00:00', 2023016, '2023-09-03 02:00:00', 'Údržba serverů a sítě', 4200, 'Správa IT infrastruktury', 21, 1, 12),
(24, '2023-09-13 02:00:00', 2023017, '2023-09-06 02:00:00', 'Aplikace pro iOS a Android', 8900, 'Tvorba mobilní aplikace', 10, 7, 6),
(25, '2023-09-16 02:00:00', 2023018, '2023-09-09 02:00:00', 'Optimalizace uživatelského rozhraní', 2800, 'Konzultace v oblasti UX/UI', 15, 3, 4),
(26, '2023-09-19 02:00:00', 2023019, '2023-09-12 02:00:00', 'Detailní analýza IT systému', 3500, 'Softwarová analýza', 21, 5, 11),
(27, '2023-09-22 02:00:00', 2023020, '2023-09-15 02:00:00', 'Personalizovaný CRM pro zákazníky', 10500, 'Vývoj CRM systému', 10, 12, 13),
(28, '2025-03-07 01:00:00', 1478523, '2025-02-20 01:00:00', 'ZKOUŠKA', 78522, 'ZKOUŠKA', 21, 11, 7),
(29, '2025-03-09 01:00:00', 7896655, '2025-02-20 01:00:00', 'ZKOUŠKA', 75566, 'ZKOUŠKA', 21, 13, 7),
(30, '2025-03-03 01:00:00', 8566522, '2025-02-20 01:00:00', 'ZKOUŠKA', 895554, 'ZKOUŠKA', 21, 1, 14);

-- --------------------------------------------------------

--
-- Struktura tabulky `person`
--

CREATE TABLE `person` (
  `id` bigint(20) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `bank_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `hidden` bit(1) NOT NULL,
  `iban` varchar(255) DEFAULT NULL,
  `identification_number` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `tax_number` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `person`
--

INSERT INTO `person` (`id`, `account_number`, `bank_code`, `city`, `country`, `hidden`, `iban`, `identification_number`, `mail`, `name`, `note`, `street`, `tax_number`, `telephone`, `zip`) VALUES
(1, '123456789', '5500', 'Praha', 'CZECHIA', b'0', 'CZ000123456789', '05861381', 'redakce@itnetwork.cz', 'ITnetwork s.r.o.', 'Největší IT akademie v Česku.', 'Karlovo náměstí 290/16, Nové Město (Praha 2)', 'CZ05861381', '+420 123 123 123', '120 00'),
(2, '100234567', '5500', 'Praha', 'CZECHIA', b'1', 'CZ000100234567', '12345678', 'jan.novak@email.cz', 'Jan Novák', 'Software Developer', 'Vinohradská 20, Vinohrady (Praha 3)', 'CZ12345678', '+420 222 333 444', '120 00'),
(3, '200345678', '5500', 'Praha', 'CZECHIA', b'0', 'CZ000200345678', '23456789', 'petra.kovarova@email.cz', 'Petra Kovářová', 'Project Manager', 'Náměstí Míru 10, Vinohrady (Praha 2)', 'CZ23456789', '+420 333 444 555', '120 00'),
(4, '300456789', '5500', 'Praha', 'CZECHIA', b'0', 'CZ000300456789', '34567890', 'martin.horak@email.cz', 'Martin Horák', 'Backend Developer', 'Jižní Město 12, Praha 4', 'CZ34567890', '+420 444 555 666', '140 00'),
(5, '400567890', '5500', 'Praha', 'CZECHIA', b'0', 'CZ000400567890', '45678901', 'eva.dvorakova@email.cz', 'Eva Dvořáková', 'UX/UI Designer', 'Malá Strana 5, Praha 1', 'CZ45678901', '+420 555 666 777', '110 00'),
(6, '500678901', '5500', 'Praha', 'CZECHIA', b'0', 'CZ000500678901', '56789012', 'tomas.cerny@email.cz', 'Tomáš Černý', 'Frontend Developer', 'Kampa 8, Praha 1', 'CZ56789012', '+420 666 777 888', '118 00'),
(7, '987654321', '0600', 'Praha', 'CZECHIA', b'1', 'CZ098765432198', '12345678', 'info@techsolutions.cz', 'TechSolutions a.s.', 'Přední poskytovatel IT řešení.', 'Jungmannova 35, Nové Město (Praha 1)', 'CZ12345678', '+420 987 654 321', '110 00'),
(8, '755622997', '2546', 'Lančov', 'CZECHIA', b'1', 'CZ84269989855255', '147852369', 'perina.radek@fgh.cz', 'Radek Peřina', 'Zkouška', 'Polní 15', 'CZ147852369', '6042314589', '36521'),
(9, '987654321', '0300', 'Brno', 'CZECHIA', b'0', 'CZ0300987654321', '12345678', 'info@abcsoftware.cz', 'ABC Software a.s.', 'Vývoj softwaru na míru.', 'Hlavní 15', 'CZ12345678', '+420 456 789 123', '11000'),
(10, '111222333', '2700', 'Ostrava', 'CZECHIA', b'1', 'CZ2700111222333', '87654321', 'kontakt@webdesign.cz', 'WebDesign s.r.o.', 'Tvorba moderních webových stránek.', 'Nádražní 45', 'CZ87654321', '+420 789 456 123', '60200'),
(11, '111222333', '2700', 'Ostrava', 'CZECHIA', b'0', 'CZ2700111222333', '87654321', 'kontakt@webdesign.cz', 'WebDesign s.r.o.', 'Tvorba moderních webových stránek.', 'Nádražní 45', 'CZ87654321', '+420 789 456 123', '60200'),
(12, '555666777', '2010', 'Hradec Králové', 'CZECHIA', b'0', 'CZ2010555666777', '11223344', 'info@marketingpro.cz', 'MarketingPro s.r.o.', 'Specialisté na online marketing.', 'Dlouhá 120', 'CZ11223344', '+420 321 654 987', '50002'),
(13, '999888777', '0800', 'Plzeň', 'CZECHIA', b'0', 'CZ0800999888777', '55667788', 'kontakt@logistikax.cz', 'LogistikaX a.s.', 'Doprava a skladování po celé ČR.', 'Logistická 7', 'CZ55667788', '+420 741 852 963', '70030'),
(14, '952626946', '5965', 'Lihto', 'CZECHIA', b'0', 'CZ84514584548', '982410', 'polnak@ghl.cz', 'Pavel Polňák', 'ZKOUŠKA', 'Lodní 6', 'CZ894285', '+420 663225448', '46525');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkajlvcm61crtrs7d5gt7x8h0x` (`buyer_id`),
  ADD KEY `FKcsnchr7oirhgjwx57ubp3xt7m` (`seller_id`);

--
-- Indexy pro tabulku `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pro tabulku `person`
--
ALTER TABLE `person`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `FKcsnchr7oirhgjwx57ubp3xt7m` FOREIGN KEY (`seller_id`) REFERENCES `person` (`id`),
  ADD CONSTRAINT `FKkajlvcm61crtrs7d5gt7x8h0x` FOREIGN KEY (`buyer_id`) REFERENCES `person` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
