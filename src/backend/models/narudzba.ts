import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const statusiNarudzbe = ["potvrdena", "u tijeku", "nepotpuna"];

const narudzbaClass =

        class Narudzba {
                        
            idnarudzbe: number;
            datumstvaranja: Date;
            datumzaprimanja: Date | null;
            status: string;
            mbrreferenta: string;
            iddobavljaca: number;
            
            constructor(id: number, datumstvaranja: Date, datumzaprimanja: Date | null, status: string, iddobavljaca: number, mbrreferenta: string) { 
                this.idnarudzbe = id;
                this.datumstvaranja = datumstvaranja;
                this.datumzaprimanja = datumzaprimanja;
                this.status = status;
                this.iddobavljaca = iddobavljaca;
                this.mbrreferenta = mbrreferenta;
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
                console.log(narudzba);
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

            static async azurirajNarudzbu(id: number, narudzba: Narudzba) {
                console.log(narudzba);
                let result = await prisma.narudzba.update({
                    where: {
                        idnarudzbe: id
                    },
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

            static async obrisiNarudzbu(id: number) {
                let result = await prisma.narudzba.delete({
                    where: {
                        idnarudzbe: id
                    }
                });
                let result2 = await prisma.narudzbaartikli.deleteMany({
                    where: {
                        idnarudzbe: id
                    }
                });
                return result;
            }

            static async urediArtikleNarudzbe(id: number, artikli: Array<{
                idartikla: number
                kolicina: number
            }>) {
 
                let narudzba = await prisma.narudzba.findUnique({
                    where: {
                        idnarudzbe: id
                    }
                });
                if (!narudzba) {
                    return { error: "Narudzba ne postoji" };
                }

                for (let artikal of artikli) {
                    let result = await prisma.artikal.findUnique({
                        where: {
                            idartikla: artikal.idartikla
                        }
                    });
                    if (!result) {
                        return { error: "Artikal ne postoji" };
                    }
                }

                let result = await prisma.narudzbaartikli.deleteMany({
                    where: {
                        idnarudzbe: id
                    }
                });
                let result2 = await prisma.narudzbaartikli.createMany({
                    data: artikli.map((a) => {
                        return {
                            idnarudzbe: id,
                            idartikla: a.idartikla,
                            kolicina: a.kolicina
                        }
                    })
                });
                return result2;
            }

    };

export { narudzbaClass as Narudzba };
