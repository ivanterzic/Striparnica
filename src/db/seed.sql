DROP TABLE IF EXISTS stripZanr;
DROP TABLE IF EXISTS zanr;
DROP TABLE IF EXISTS narudzbaArtikli;
DROP TABLE IF EXISTS narudzba;
DROP TABLE IF EXISTS racunArtikli;
DROP TABLE IF EXISTS dobavljac;
DROP TABLE IF EXISTS strip;
DROP TABLE IF EXISTS collectible;
DROP TABLE IF EXISTS racun;
DROP TABLE IF EXISTS artikal;
DROP TABLE IF EXISTS zaposlenik;
DROP TABLE IF EXISTS uloga;

CREATE TABLE uloga
(
  idUloge INT GENERATED ALWAYS AS IDENTITY,
  naziv VARCHAR(50) NOT NULL UNIQUE,
  placa FLOAT NOT NULL,
  PRIMARY KEY (idUloge)
);

CREATE TABLE zaposlenik
(
  MBR VARCHAR(15),
  ime VARCHAR(30) NOT NULL,
  prezime VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  OIB CHAR(11) NOT NULL UNIQUE,
  datumRodenja DATE NOT NULL,
  spol CHAR(1) NOT NULL CHECK (spol IN ('M', 'Ž')),
  telefon VARCHAR(20) NOT NULL,
  lozinka VARCHAR(30) NOT NULL,
  datumZaposlenja DATE NOT NULL,
  datumOtpustanja DATE,
  idUloge INT NOT NULL,
  PRIMARY KEY (MBR),
  FOREIGN KEY (idUloge) REFERENCES uloga(idUloge)
);

CREATE TABLE artikal
(
  idArtikla INT GENERATED ALWAYS AS IDENTITY,
  naziv VARCHAR(50) NOT NULL,
  opis VARCHAR(100) NOT NULL,
  dostupnaKolicina INT NOT NULL,
  cijena FLOAT NOT NULL,
  PDV FLOAT NOT NULL,
  izdavac VARCHAR(50) NOT NULL,
  izdanje VARCHAR(50) NOT NULL,
  PRIMARY KEY (idArtikla)
);

CREATE TABLE racun
(
  idRacuna INT GENERATED ALWAYS AS IDENTITY,
  datumIzdavanja DATE NOT NULL,
  nacinPlacanja VARCHAR(15) NOT NULL,
  blagajna INT NOT NULL,
  MBRProdavaca VARCHAR(15) NOT NULL,
  PRIMARY KEY (idRacuna),
  FOREIGN KEY (MBRProdavaca) REFERENCES zaposlenik(MBR)
);

CREATE TABLE collectible
(
  idArtikla INT NOT NULL,
  masa FLOAT NOT NULL,
  pakiranje VARCHAR(30) NOT NULL,
  dimenzije VARCHAR(20) NOT NULL,
  proizvodac VARCHAR(50) NOT NULL,
  PRIMARY KEY (idArtikla),
  FOREIGN KEY (idArtikla) REFERENCES artikal(idArtikla)
);

CREATE TABLE strip
(
  idArtikla INT NOT NULL,
  brojStranica INT NOT NULL,
  jezik VARCHAR(30) NOT NULL,
  autor VARCHAR(50) NOT NULL,
  PRIMARY KEY (idArtikla),
  FOREIGN KEY (idArtikla) REFERENCES artikal(idArtikla)
);

CREATE TABLE dobavljac
(
  idDobavljaca INT GENERATED ALWAYS AS IDENTITY,
  ime VARCHAR(50) NOT NULL,
  adresa VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  imeVlasnika VARCHAR(30) NOT NULL,
  prezimeVlasnika VARCHAR(30) NOT NULL,
  PRIMARY KEY (idDobavljaca)
);

CREATE TABLE racunArtikli
(
  idArtikla INT NOT NULL,
  idRacuna INT NOT NULL,
  kolicina INT NOT NULL,
  PRIMARY KEY (idArtikla, idRacuna),
  FOREIGN KEY (idArtikla) REFERENCES artikal(idArtikla),
  FOREIGN KEY (idRacuna) REFERENCES racun(idRacuna)
);

CREATE TABLE narudzba
(
  idNarudzbe INT GENERATED ALWAYS AS IDENTITY,
  datumStvaranja DATE NOT NULL,
  datumZaprimanja DATE,
  status VARCHAR(30) NOT NULL CHECK (status IN ('u tijeku', 'potvrdena', 'nepotpuna')),
  idDobavljaca INT NOT NULL,
  MBRReferenta VARCHAR(15) NOT NULL,
  PRIMARY KEY (idNarudzbe),
  FOREIGN KEY (idDobavljaca) REFERENCES dobavljac(idDobavljaca),
  FOREIGN KEY (MBRReferenta) REFERENCES zaposlenik(MBR)
);

CREATE TABLE narudzbaArtikli
(
  idArtikla INT NOT NULL,
  idNarudzbe INT NOT NULL,
  kolicina INT NOT NULL,
  PRIMARY KEY (idNarudzbe, idArtikla),
  FOREIGN KEY (idNarudzbe) REFERENCES narudzba(idNarudzbe),
  FOREIGN KEY (idArtikla) REFERENCES artikal(idArtikla)
);

CREATE TABLE zanr
(
  idZanra INT GENERATED ALWAYS AS IDENTITY,
  naziv VARCHAR(50) NOT NULL,
  idNadZanr INT,
  PRIMARY KEY (idZanra),
  FOREIGN KEY (idNadZanr) REFERENCES zanr(idZanra)
);

CREATE TABLE stripZanr
(
  idArtikla INT NOT NULL,
  idZanra INT NOT NULL,
  PRIMARY KEY (idArtikla, idZanra),
  FOREIGN KEY (idArtikla) REFERENCES strip(idArtikla),
  FOREIGN KEY (idZanra) REFERENCES zanr(idZanra)
);

INSERT INTO uloga (naziv, placa) VALUES 
('voditelj', 5000),
('prodavač', 1500),
('referent nabave', 1700);

INSERT INTO zaposlenik (MBR, datumZaposlenja, ime, prezime, email, OIB, datumRodenja, spol, datumOtpustanja, telefon, lozinka, idUloge) VALUES 
('1004846926472', '2020-05-01', 'Mia', 'Horvat', 'mia.horvat@gmail.com', '63729163748', '1992-01-05', 'Ž', NULL, '0997654826', '64gfjd92dgf64jg2?', 1),
('1004893549375', '2020-06-01', 'Josip', 'Babić', 'josip.babic@gmail.com', '7963924203', '1985-09-25', 'M', '2021-03-01', '0917522372', 'hf63hf9h365%!hgjf', 2),
('1004893569845', '2021-03-01', 'Matej', 'Šimunović', 'matej.simunovic@gmail.com', '7463936203', '1990-05-15', 'M', NULL, '0927589372', 'hd42/$se24193cq2', 2),
('1006474746334', '2020-06-01', 'Luka', 'Novosel', 'luka.novosel@gmail.com', '87346529834', '1996-01-25', 'M', NULL, '0911650987','dgw%64hd293ndv#', 3);

INSERT INTO artikal (naziv, opis, dostupnaKolicina, cijena, PDV, izdavac, izdanje) VALUES 
--stripovi
('Batman: The Killing Joke', 'Klasik koji istražuje psihološki rat između Batmana i Jokera.', 20, 9.99, 0.25, 'DC Comics', 'Klasično'),
('Watchmen', 'Sukob superjunaka i političkih intriga u alternativnom svijetu.', 15, 9.99, 0.25, 'DC Comics', 'Specijalno'),
('Maus', 'Grafički roman koji prati priču o preživljavanju Holokausta.', 25, 7.99, 0.25, 'Pantheon Books', 'Klasično'),
('Sandman: Preludij i Noć', 'Fantastična epopeja koja istražuje moći i svjetove snova.', 18, 8.99, 0.25, 'DC Comics', 'Specijalno'),
('V for Vendetta', 'Politički triler koji prati borbu za slobodu u totalitarnom društvu.', 22, 6.99, 0.25, 'DC Comics', 'Specijalno'),
('Sin City: Grad koji spava', 'Mračni noir strip koji istražuje podzemlje kriminala.', 30, 5.99, 0.25, 'Dark Horse Comics', 'Klasično'),
('Akira', 'Postapokaliptična priča o mladima koji se bore protiv korupcije.', 12, 9.99, 0.25, 'Kodansha Comics', 'Specijalno'),
('Saga', 'Epopeja o ljubavi, ratu i avanturi koja se proteže kroz galaksije.', 17, 7.99, 0.25, 'Image Comics', 'Klasično'),
('Asterix i Obelix: Gala u Rimu', 'Humorna avantura koja prati dogodovštine Galijaca u Rimu.', 25, 3.99, 0.25, 'Les Éditions Albert René', 'Kolekcionarsko'),
('Persepolis', 'Memoari iranske djevojke tijekom Islamske revolucije.', 15, 4.99, 0.25, 'Pantheon Books', 'Klasično'),
('Superman: Red Son', 'Alternativna stvarnost u kojoj je Superman odrastao u Sovjetskom Savezu.', 10, 5.99, 0.25, 'DC Comics', 'Kolekcionarsko'),
('Deadpool: Kills the Marvel Universe', 'Deadpool kreće u osvetnički pohod ubijajući likove iz Marvelovog univerzuma.', 8, 4.99, 0.25, 'Marvel', 'Specijalno'),
('Saga of the Swamp Thing', 'Priča o Swamp Thingu, šumskom čuvaru i antiheroju.', 12, 3.99, 0.25, 'DC Comics', 'Specijalno'),
('Wonder Woman: Warbringer', 'Mlada Diana Prince otkriva svoju sudbinu kao Wonder Woman.', 15, 2.99, 0.25, 'DC Comics', 'Specijalno'),
('The Walking Dead', 'Komplet stripova koji su poslužili kao osnova za popularnu TV seriju.', 5, 18.99, 0.25, 'Image Comics', 'Kolekcionarsko'),
('Green Lantern: Rebirth', 'Hal Jordan se vraća kao Green Lantern u ovom klasičnom stripu.', 15, 3.99, 0.25, 'DC Comics', 'Specijalno'),
('Thor: God of Thunder', 'Thor se suočava s mračnim silama u ovom epskom stripu.', 20, 6.99, 0.25, 'Marvel', 'Klasično'),
('The Witcher: House of Glass', 'Avantura Witchera Geralta u ovom stripu temeljenom na popularnoj igri.', 10, 9.99, 0.25, 'Dark Horse Comics', 'Specijalno'),

--collectibles
('Iron Man Figurica', 'Detaljno izrađena figurica superjunaka Iron Mana.', 30, 20.99, 0.25, 'Marvel', 'Kolekcionarsko'),
('Darth Vader Funko Pop', 'Funko Pop figurica legendarnog Star Wars lika Darth Vadera.', 25, 19.99, 0.25, 'Lucasfilm', 'Klasično'),
('Harry Potter Čarobnjak Figurica', 'Čarobnjak Harry Potter u minijaturnom obliku.', 20, 14.99, 0.25, 'Wizarding World', 'Kolekcionarsko'),
('Batman Arkham Knight Figurica', 'Figurica Batmana u oklopu iz igre Batman: Arkham Knight.', 35, 20.99, 0.25, 'DC Comics', 'Specijalno'),
('Assassin''s Creed Ezio Figurica', 'Lik Ezio Auditore iz video igre Assassin''s Creed.', 18, 20.99, 0.25, 'Ubisoft', 'Klasično'),
('The Witcher Geralt Figurica', 'Geralt iz Rive u svom karakterističnom izgledu.', 22, 19.99, 0.25, 'CD Projekt', 'Klasično'),
('Spider-Man Miles Morales Figurica', 'Figurica Spider-Mana u njegovom alter egu Milesa Moralesa.', 28, 15.99, 0.25, 'Marvel', 'Kolekcionarsko'),
('Game of Thrones Jon Snow Figurica', 'Minijaturni lik Jon Snowa iz popularne serije Igra prijestolja.', 15, 9.99, 0.25, 'HBO', 'Kolekcionarsko'),
('Super Mario Luigi Figurica', 'Luigi, brat Super Maria, u svojoj karakterističnoj odjeći.', 25, 10.99, 0.25, 'Nintendo', 'Klasično'),
('Avengers Hulk Figurica', 'Figurica Hulka, jednog od glavnih članova Avengersa.', 20, 24.99, 0.25, 'Marvel', 'Specijalno'),
('Dragon Ball Z Goku Figurica', 'Figurica Goku, glavnog lika iz Dragon Ball Z serije.', 18, 14.99, 0.25, 'Bandai', 'Klasično'),
('Naruto Uzumaki Figurica', 'Minijaturni lik Naruto Uzumakija iz istoimenog animea.', 25, 10.99, 0.25, 'Shueisha', 'Kolekcionarsko'),
('Dungeons & Dragons Player''s Handbook', 'Osnovno pravilo za igranje popularne RPG igre Dungeons & Dragons.', 14, 24.99, 0.25, 'Wizards of the Coast', 'Standardno'),
('Magic: The Gathering Booster Box', 'Kutija sa slučajno odabranim Magic: The Gathering karticama.', 20, 59.99, 0.25, 'Wizards of the Coast', 'Klasično'),
('Harry Potter Wizarding Wand Replica', 'Vjerna replika čarobnjakovog štapa iz Harry Potter svijeta.', 20, 19.99, 0.25, 'Wizarding World', 'Kolekcionarsko'),
('Star Wars Millennium Falcon Lego Set', 'Lego set koji omogućuje izgradnju legendarnog svemirskog broda Millennium Falcon.', 10, 139.99, 0.25, 'The Lego Group', 'Klasično'),
('Pokémon Trading Card Game Booster Box', 'Kutija sa slučajno odabranim Pokémon TCG karticama.', 12, 49.99, 0.25, 'The Pokémon Company', 'Kolekcionarsko');

INSERT INTO racun (datumIzdavanja, nacinPlacanja, blagajna, MBRProdavaca) VALUES 
('2024-03-01', 'gotovina', 1, '1004893569845'),
('2024-03-02', 'kartica', 2, '1004893569845'),
('2024-03-03', 'gotovina', 1, '1004893569845'),
('2024-03-04', 'gotovina', 1, '1004893569845'),
('2024-03-05', 'kartica', 2, '1004893569845'),
('2024-03-06', 'gotovina', 1, '1004893569845'),
('2024-03-07', 'gotovina', 1, '1004893569845'),
('2024-03-08', 'kartica', 2, '1004893569845'),
('2024-03-09', 'gotovina', 1, '1004893569845'),
('2024-03-10', 'gotovina', 1, '1004893569845'),
('2024-03-11', 'kartica', 2, '1004893569845'),
('2024-03-12', 'gotovina', 1, '1004893569845'),
('2024-03-13', 'gotovina', 1, '1004893569845'),
('2024-03-14', 'kartica', 2, '1004893569845'),
('2024-03-15', 'gotovina', 1, '1004893569845'),
('2024-03-16', 'gotovina', 1, '1004893569845'),
('2024-03-17', 'kartica', 2, '1004893569845'),
('2024-03-18', 'gotovina', 1, '1004893569845'),
('2024-03-19', 'gotovina', 1, '1004893569845'),
('2024-03-20', 'kartica', 2, '1004893569845'),
('2024-03-21', 'gotovina', 1, '1004893569845'),
('2024-03-22', 'gotovina', 1, '1004893569845'),
('2024-03-23', 'kartica', 2, '1004893569845'),
('2024-03-24', 'gotovina', 1, '1004893569845'),
('2024-03-25', 'gotovina', 1, '1004893569845'),
('2024-03-26', 'kartica', 2, '1004893569845'),
('2024-03-27', 'gotovina', 1, '1004893569845'),
('2024-03-28', 'gotovina', 1, '1004893569845'),
('2024-03-29', 'kartica', 2, '1004893569845'),
('2024-03-30', 'gotovina', 1, '1004893569845'),
('2024-03-31', 'gotovina', 1, '1004893569845'),
('2024-03-01', 'kartica', 2, '1004893569845'),
('2024-03-02', 'gotovina', 1, '1004893569845'),
('2024-03-03', 'gotovina', 1, '1004893569845'),
('2024-03-04', 'kartica', 2, '1004893569845'),
('2024-03-05', 'gotovina', 1, '1004893569845'),
('2024-03-06', 'gotovina', 1, '1004893569845'),
('2024-03-07', 'kartica', 2, '1004893569845'),
('2024-03-08', 'gotovina', 1, '1004893569845');

INSERT INTO collectible (idArtikla, masa, pakiranje, dimenzije, proizvodac) VALUES 
(19, 0.2, 'plastično', '10x10x15', 'Marvel'),
(20, 0.15, 'plastično', '8x8x12', 'Lucasfilm'),
(21, 0.1, 'kartonsko', '8x8x12', 'Wizarding World'),
(22, 0.3, 'plastično', '12x12x20', 'DC Comics'),
(23, 0.25, 'slobodno', '15x15x25', 'Ubisoft'),
(24, 0.4, 'kartonsko', '20x20x30', 'CD Projekt'),
(25, 0.35, 'plastično', '18x18x28', 'Marvel'),
(26, 0.3, 'slobodno', '16x16x24', 'HBO'),
(27, 0.2, 'kartonsko', '10x10x15', 'Nintendo'),
(28, 0.5, 'plastično', '22x22x35', 'Marvel'),
(29, 0.2, 'kartonsko', '10x10x15', 'Bandai'),
(30, 0.15, 'plastično', '8x8x12', 'Shueisha'),
(31, 0.1, 'slobodno', '5x5x10', 'Wizards of the Coast'),
(32, 0.1, 'kartonsko', '5x5x10', 'Wizards of the Coast'),
(33, 0.3, 'plastično', '5x40x5', 'Wizarding World'),
(34, 0.25, 'kartonsko', '100x100x25', 'The Lego Group'),
(35, 0.4, 'kartonsko', '20x20x30', 'The Pokémon Company');

INSERT INTO strip (idArtikla, brojStranica, jezik, autor) VALUES 
(1, 64, 'engleski', 'Alan Moore'),
(2, 416, 'engleski', 'Alan Moore'),
(3, 296, 'engleski', 'Art Spiegelman'),
(4, 240, 'engleski', 'Neil Gaiman'),
(5, 296, 'engleski', 'Alan Moore'),
(6, 208, 'engleski', 'Frank Miller'),
(7, 384, 'engleski', 'Katsuhiro Otomo'),
(8, 54, 'engleski', 'Brian K. Vaughan'),
(9, 48, 'engleski', 'René Goscinny'),
(10, 160, 'engleski', 'Marjane Satrapi'),
(11, 160, 'engleski', 'Mark Millar'),
(12, 96, 'engleski', 'Cullen Bunn'),
(13, 176, 'engleski', 'Alan Moore'),
(14, 208, 'engleski', 'Leigh Bardugo'),
(15, 1088, 'engleski', 'Robert Kirkman'),
(16, 176, 'engleski', 'Geoff Johns'),
(17, 144, 'engleski', 'Jason Aaron'),
(18, 128, 'engleski', 'Paul Tobin');

INSERT INTO dobavljac (ime, adresa, email, imeVlasnika, prezimeVlasnika) VALUES
('Kreativna Kolekcija d.o.o.', 'Ulica Ivana Gundulića 14, 10000 Zagreb', 'kreativna.kolekcija@gmail.com', 'Marko', 'Novak'),
('Artisan Art d.o.o.', 'Trg Petra Krešimira IV 7, 21000 Split', 'artisan.art@gmail.com', 'Ana', 'Horvat'),
('Fantastični Fokus d.o.o.', 'Ulica Kralja Tomislava 22, 31000 Osijek', 'fantasticni.fokus@gmail.com', 'Ivan', 'Kovač'),
('Kreatori Kolekcionarstva d.o.o.', 'Trg Franje Tuđmana 5, 42000 Varaždin', 'kreatori.kolekcionarstva@gmail.com', 'Petra', 'Đurđević'),
('Majstori Stripova d.o.o.', 'Ulica Vladimira Nazora 11, 51000 Rijeka', 'majstori.stripova@gmail.com', 'Ante', 'Jurić');

INSERT INTO racunArtikli (idArtikla, idRacuna, kolicina) VALUES 
(23, 1, 1),
(9, 2, 1),
(34, 2, 1),
(5, 2, 1),
(20, 3, 1),
(31, 4, 1),
(10, 4, 2),
(28, 5, 1),
(2, 5, 1),
(6, 6, 1),
(22, 6, 1),
(18, 7, 2),
(16, 7, 1),
(29, 8, 1),
(14, 9, 1),
(4, 9, 1),
(19, 10, 1),
(12, 10, 2),
(26, 11, 1),
(7, 11, 1),
(11, 12, 1),
(21, 12, 1),
(17, 13, 1),
(3, 13, 1),
(8, 14, 1),
(24, 15, 1),
(13, 15, 1),
(30, 16, 1),
(25, 16, 1),
(27, 17, 1),
(35, 18, 2),
(23, 18, 1),
(15, 19, 1),
(34, 20, 1),
(5, 20, 1),
(31, 21, 1),
(10, 21, 2),
(28, 22, 1),
(2, 22, 1),
(6, 23, 1),
(22, 23, 1),
(18, 24, 1),
(16, 24, 1),
(1, 25, 3),
(14, 26, 1),
(4, 26, 1),
(19, 27, 1),
(12, 27, 1),
(26, 28, 1),
(7, 28, 1),
(11, 29, 1),
(21, 29, 1),
(3, 30, 1),
(33, 31, 1),
(8, 31, 1),
(24, 32, 1),
(13, 32, 1),
(30, 33, 1),
(27, 34, 1),
(35, 35, 1),
(23, 35, 1),
(15, 36, 2),
(9, 36, 1),
(5, 37, 1),
(31, 38, 1),
(10, 38, 1),
(2, 39, 1);

INSERT INTO narudzba (datumStvaranja, datumZaprimanja, status, idDobavljaca, MBRReferenta) VALUES 
('2023-01-15', NULL, 'u tijeku', 3, '1006474746334'),
('2023-02-22', '2023-03-05', 'potvrdena', 2, '1006474746334'),
('2023-03-08', NULL, 'u tijeku', 4, '1006474746334'),
('2023-04-12', '2023-04-20', 'potvrdena', 1, '1006474746334'),
('2023-05-18', '2023-05-22', 'potvrdena', 5, '1006474746334'),
('2023-06-25', NULL, 'u tijeku', 2, '1006474746334'),
('2023-07-30', '2023-08-05', 'potvrdena', 3, '1006474746334'),
('2023-08-14', '2023-08-20', 'potvrdena', 4, '1006474746334'),
('2023-09-20', NULL, 'u tijeku', 5, '1006474746334'),
('2023-10-28', '2023-11-05', 'potvrdena', 1, '1006474746334');

INSERT INTO narudzbaArtikli (idArtikla, idNarudzbe, kolicina) VALUES 
(1, 1, 5),
(2, 1, 4),
(3, 1, 5),
(21, 2, 2),
(4, 2, 5),
(6, 2, 5),
(17, 3, 8),
(2, 3, 9),
(9, 3, 5),
(8, 4, 5),
(10, 4, 10),
(11, 4, 5),
(16, 5, 7),
(19, 5, 5),
(17, 5, 10),
(10, 6, 5),
(11, 6, 10),
(13, 6, 5),
(5, 7, 5),
(6, 7, 4),
(9, 7, 5),
(32, 8, 6),
(26, 8, 5),
(10, 9, 5),
(1, 9, 10),
(30, 10, 5);

INSERT INTO zanr (naziv, idNadZanr) VALUES 
('Akcija', NULL),
('Avantura', NULL),
('Horor', NULL),
('Sci-Fi', NULL),
('Drama', NULL),
('Superheroji', 1),
('Kriminal', 1),
('Ratni', 1),
('Pustolovina', 2),
('Pirati', 2),
('Nadnaravno', 3),
('Triler', 3),
('Misterija', 3),
('Distopija', 4),
('Cyberpunk', 4),   
('Space Opera', 4),
('Ljubav', 5),
('Tragedija', 5);

INSERT INTO stripZanr (idArtikla, idZanra) VALUES
(1, 6), (1, 12),   -- Batman: The Killing Joke
(2, 6), (2, 12),   -- Watchmen
(3, 8),            -- Maus
(4, 6), (4, 11),   -- Sandman: Preludij i Noć
(5, 6), (5, 12),   -- V for Vendetta
(6, 7), (6, 12),   -- Sin City: Grad koji spava
(7, 3), (7, 4),    -- Akira
(8, 6), (8, 17),   -- Saga
(9, 2), (9, 9),    -- Asterix i Obelix: Gala u Rimu
(10, 5), (10, 18), -- Persepolis
(11, 6), (11, 14), -- Superman: Red Son
(12, 6), (12, 14), -- Deadpool: Kills the Marvel Universe
(13, 6), (13, 11), -- Saga of the Swamp Thing
(14, 6), (14, 17), -- Wonder Woman: Warbringer
(15, 1), (15, 3),  -- The Walking Dead
(16, 6), (16, 11), -- Green Lantern: Rebirth
(17, 1), (17, 6),  -- Thor: God of Thunder
(18, 9), (18, 13); -- The Witcher: House of Glass
