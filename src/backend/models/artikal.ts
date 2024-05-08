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

        constructor(id: number, naziv: string, opis: string, dostupnakolicina: number, cijena: number, pdv: number, izdavac: string, izdanje: string) {
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
