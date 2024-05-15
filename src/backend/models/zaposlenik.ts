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
    
            static async dohvatiSveZaposlenike() {
                let zaposlenici = await prisma.zaposlenik.findMany();
                return zaposlenici;
            }

            static async dohvatiZaposlenika(mbr: string) {
                let zaposlenik = await prisma.zaposlenik.findUnique({
                    where: {
                        mbr: mbr
                    }
                });
                return zaposlenik;
            }
    
            static async dohvatiZaposlenikaPoEmailu(email: string) {
                let zaposlenik = await prisma.zaposlenik.findUnique({
                    where: {
                        email: email
                    }
                });
                return zaposlenik;
            }
    
            static async dohvatiZaposlenikaPoOibu(oib: string) {
                let zaposlenik = await prisma.zaposlenik.findUnique({
                    where: {
                        oib: oib
                    }
                });
                return zaposlenik;
            }

            static async dohvatiSveReferenteNabave() {
                let referentId = await prisma.uloga.findUnique({
                    where: {
                        naziv: 'referent nabave'
                    }
                });
                let referenti = await prisma.zaposlenik.findMany({
                    where: {
                        iduloge: referentId?.iduloge
                    }
                });
                return referenti;
            }

            static async provjeriReferentaNabave(mbr: string) {
                let referentId = await prisma.uloga.findUnique({
                    where: {
                        naziv: 'referent nabave'
                    }
                });
                let referent = await prisma.zaposlenik.findFirst({
                    where: {
                        mbr: mbr,
                        iduloge: referentId?.iduloge
                    }
                });
                if (referent) {
                    return true;
                }
                throw new Error('Zaposlenik nije referent nabave');
            }

        }

export {zaposlenikClass as Zaposlenik}
    
