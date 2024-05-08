import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const statusiNarudzbe = ["potvrdena", "u tijeku", "neispravna"];

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
                let result = await prisma.narudzba.findMany();
                return result;
            }   
    
            static async dohvatiNarudzbu(id: number) {
                let result = await prisma.narudzba.findUnique({
                    where: {
                        idnarudzbe: id
                    }
                });
                let artikli = await prisma.narudzbaartikli.findMany({
                    where: {
                        idnarudzbe: id
                    }
                });
                return {
                    narudzba : result,
                    artikli : artikli
                }
            }

            static async dohvatiSveStatuseNarudzbi() {
                return statusiNarudzbe;
            }

            static async dohvatiPrviVeciID(id: number) {
                let result = await prisma.narudzba.findFirst({
                    where: {
                        idnarudzbe: {
                            gt: id
                        }
                    }
                });
                return result?.idnarudzbe;
            }

            static async dohvatiPrviManjiID(id: number) {
                let result = await prisma.narudzba.findFirst({
                    where: {
                        idnarudzbe: {
                            lt: id
                        }
                    }
                });
                return result?.idnarudzbe;
            }

           static async kreirajNarudzbu(narudzba: Narudzba) {
                let result = await prisma.narudzba.create({
                    data: {
                        datumstvaranja: narudzba.datumstvaranja,
                        datumzaprimanja: narudzba.datumzaprimanja,
                        status: narudzba.status,
                        iddobavljaca: narudzba.iddobavljaca,
                        mbrreferenta: narudzba.mbrreferenta
                    }
                });
                return result;
            }
    };

export { narudzbaClass as Narudzba };
