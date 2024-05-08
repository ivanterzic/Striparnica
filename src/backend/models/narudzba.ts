//model za narudzbu
import { PrismaClient, artikal } from '@prisma/client';
const prisma = new PrismaClient();

const narudzbaClass =
        class Narudzba {
                        
            idnarudzbe: number;
            datumstvaranja: Date;
            datumzaprimanja: Date;
            status: string;
            mbrreferenta: string;
            iddobavljaca: number;
            artikli: Array<number>;
            
            constructor(id: number, datumstvaranja: Date, datumzaprimanja: Date, status: string, iddobavljaca: number, mbrreferenta: string, artikli: Array<number>) { 
                this.idnarudzbe = id;
                this.datumstvaranja = datumstvaranja;
                this.datumzaprimanja = datumzaprimanja;
                this.status = status;
                this.iddobavljaca = iddobavljaca;
                this.mbrreferenta = mbrreferenta;
                this.artikli = artikli;
            }
    
            static async dohvatiSveNarudzbe() {
                //return all narudzba and all artikli connected to narudzba
                prisma.narudzba.findMany({
                    include: {
                        narudzbaartikli: true,
                    }
                })
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return error;
                });
            }   
    
            static async dohvatiNarudzbu(id: number) {
                prisma.narudzba.findUnique({
                    where: {
                        idnarudzbe: id
                    }
                })
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return error;
                });
            }

            static async dohvatiArtikleNarudzbe(id: number) {
                prisma.narudzbaartikli.findMany({
                    where: {
                        idnarudzbe: id
                    },
                    include: {
                        artikal: true
                    }
                })
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return error;
                });
            }
    };

export { narudzbaClass as Narudzba };
