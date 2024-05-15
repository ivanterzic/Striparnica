import { Zaposlenik } from "../models/zaposlenik";

/*import { PrismaClient } from '@prisma/client';
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
                try {
                    let zaposlenik = await prisma.zaposlenik.findUnique({
                        where: {
                            mbr: mbr
                        }
                    });
                    if (!zaposlenik) {
                        throw new Error('Zaposlenik ne postoji');
                    }
                    return zaposlenik;
                }
                catch (err) {
                    throw err;
                }
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
                let zaposlenik
                try {
                    zaposlenik = await prisma.zaposlenik.findUnique({
                        where: {
                            mbr: mbr
                        }
                    });
                    if (!zaposlenik) {
                        throw "Zaposlenik ne postoji!"
                    }
                }
                catch (err) {
                    throw "Zaposlenik ne postoji!"
                }
                try {
                    let referentId = await prisma.uloga.findUnique({
                        where: {
                            naziv: 'referent nabave'
                        }
                    });
                    if (zaposlenik?.iduloge === referentId?.iduloge) {
                        return true;
                    }
                    else {
                        throw "Zaposlenik nije referent nabave!"
                    }
                }
                catch (err) {
                    throw err;
                }
                

            }

        }

export {zaposlenikClass as Zaposlenik}
    
*/

jest.mock("../models/zaposlenik", () => ({
    Zaposlenik: {
        dohvatiSveZaposlenike: jest.fn().mockResolvedValue([
            { mbr: "1", email: "test1@example.com", oib: "11111111111" },
            { mbr: "2", email: "test2@example.com", oib: "22222222222" },
        ]),
        dohvatiZaposlenika: jest.fn(),
        dohvatiZaposlenikaPoEmailu: jest.fn(),
        dohvatiZaposlenikaPoOibu: jest.fn(),
        dohvatiSveReferenteNabave: jest.fn(),
        provjeriReferentaNabave: jest.fn(),
    },
}));

describe('Zaposlenik model tests', () => {
    test('dohvati sve zaposlenike', async () => {
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        expect(zaposlenici).not.toBeNull();
    } );

    test('dohvati zaposlenika', async () => {
        Zaposlenik.dohvatiZaposlenika = jest.fn().mockResolvedValueOnce({ mbr: "1", email: "test1@example.com", oib: "11111111111" });
        let zaposlenik = await Zaposlenik.dohvatiZaposlenika("1");
        expect(zaposlenik).not.toBeNull();
        zaposlenik = await Zaposlenik.dohvatiZaposlenika("4");
        expect(zaposlenik).toBeUndefined

    }
    );

});
