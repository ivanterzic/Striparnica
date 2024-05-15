/*aritkal test
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const artikalClass =
    class Artikal {
        idartikla: number;
        naziv: string;
        opis: string;
        dostupnakolicina: number;
        cijena: number;
        pdv: number;
        izdavac: string;
        izdanje: string;

        private constructor(id: number, naziv: string, opis: string, dostupnakolicina: number, cijena: number, pdv: number, izdavac: string, izdanje: string) {
            this.idartikla = id;
            this.naziv = naziv;
            this.opis = opis;
            this.dostupnakolicina = dostupnakolicina;
            this.cijena = cijena;
            this.pdv = pdv;
            this.izdavac = izdavac;
            this.izdanje = izdanje;
        }

        static async dohvatiSveArtikle() {
            let artikli = await prisma.artikal.findMany();
            return artikli;
        }

        static async dohvatiArtikal(id: number) {
            let artikal = await prisma.artikal.findUnique({
                where: {
                    idartikla: id
                }
            });
            return artikal;
        }

        

    }

export { artikalClass as Artikal };
*/
import { Artikal } from "../models/artikal";

describe('Artikal model tests ', () => {
    test('doahvati sve artikle', async () => {
        let artikli = await Artikal.dohvatiSveArtikle();
        expect(artikli).not.toBeNull();
    }
    );
    test('dohvati artikal', async () => {
        let artikal = await Artikal.dohvatiArtikal(1);
        expect(artikal).not.toBeNull();
        // check what happens if you ask for an existing and non existing artikal
        let existingArikalId: number,
            nonExistingArtikalId: number;
        let artikli = await Artikal.dohvatiSveArtikle();
        existingArikalId = artikli[0].idartikla;
        nonExistingArtikalId = 81236       
        expect(await Artikal.dohvatiArtikal(existingArikalId)).not.toBeNull();
        expect(await Artikal.dohvatiArtikal(nonExistingArtikalId)).toBeNull();
    });

});
