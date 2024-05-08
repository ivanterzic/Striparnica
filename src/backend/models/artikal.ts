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

        static async dohvatiArtikal(id: number) {
            prisma.artikal.findUnique({
                where: {
                    idartikla: id
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
