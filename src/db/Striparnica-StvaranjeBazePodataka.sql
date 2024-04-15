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