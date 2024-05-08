/*
model zaposlenik {
  mbr             String     @id @db.VarChar(15)
  ime             String     @db.VarChar(30)
  prezime         String     @db.VarChar(30)
  email           String     @unique @db.VarChar(50)
  oib             String     @unique @db.Char(11)
  datumrodenja    DateTime   @db.Date
  spol            String     @db.Char(1)
  telefon         String     @db.VarChar(20)
  lozinka         String     @db.VarChar(30)
  datumzaposlenja DateTime   @db.Date
  datumotpustanja DateTime?  @db.Date
  iduloge         Int
  narudzba        narudzba[]
  racun           racun[]
  uloga           uloga      @relation(fields: [iduloge], references: [iduloge], onDelete: NoAction, onUpdate: NoAction)
}*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const zaposlenikClass =
    class Zaposlenik {
            mbr: string;
            ime: string;
            prezime: string;
            email: string;
            oib: string;
            datumrodenja: Date;
            spol: string;
            telefon: string;
            lozinka: string;
            datumzaposlenja: Date;
            datumotpustanja: Date;
            iduloge: number;
    
            constructor(mbr: string, ime: string, prezime: string, email: string, oib: string, datumrodenja: Date, spol: string, telefon: string, lozinka: string, datumzaposlenja: Date, datumotpustanja: Date, iduloge: number) {
                this.mbr = mbr;
                this.ime = ime;
                this.prezime = prezime;
                this.email = email;
                this.oib = oib;
                this.datumrodenja = datumrodenja;
                this.spol = spol;
                this.telefon = telefon;
                this.lozinka = lozinka;
                this.datumzaposlenja = datumzaposlenja;
                this.datumotpustanja = datumotpustanja;
                this.iduloge = iduloge;
            }
    
            static async dohvatiZaposlenika(mbr: string) {
                prisma.zaposlenik.findUnique({
                    where: {
                        mbr: mbr
                    }
                })
                    .then((result) => {
                        return result;
                    })
                    .catch((error) => {
                        return error;
                    });
            }
    
            static async dohvatiZaposlenikaPoEmailu(email: string) {
                prisma.zaposlenik.findUnique({
                    where: {
                        email: email
                    }
                })
                    .then((result) => {
                        return result;
                    })
                    .catch((error) => {
                        return error;
                    });
            }
    
            static async dohvatiZaposlenikaPoOibu(oib: string) {
                prisma.zaposlenik.findUnique({
                    where: {
                        oib: oib
                    }
                })
                    .then((result) => {
                        return result;
                    })
                    .catch((error) => {
                        return error;
                    });
            }

        }

export {zaposlenikClass as Zaposlenik}
    
