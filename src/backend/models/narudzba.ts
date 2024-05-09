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
                let result2 = [];
                for (let r of result) {
                    result2.push({
                        narudzba: {
                            idnarudzbe: r.idnarudzbe,
                            datumstvaranja: r.datumstvaranja ? r.datumstvaranja.toJSON().split('T')[0] : null,
                            datumzaprimanja: r.datumzaprimanja ? r.datumzaprimanja.toJSON().split('T')[0] : null,
                            status: r.status,
                            iddobavljaca: r.iddobavljaca,
                            mbrreferenta: r.mbrreferenta
                        }
                    });
                }
                return result2;
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
                    narudzba : {
                        idnarudzbe: result?.idnarudzbe,
                        datumstvaranja: result?.datumstvaranja ? result?.datumstvaranja.toJSON().split('T')[0] : null,
                        datumzaprimanja: result?.datumzaprimanja ? result?.datumzaprimanja.toJSON().split('T')[0] : null,
                        status: result?.status,
                        iddobavljaca: result?.iddobavljaca,
                        mbrreferenta: result?.mbrreferenta
                    
                    },
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
                        datumzaprimanja: narudzba.datumzaprimanja? narudzba.datumzaprimanja : null,
                        status: narudzba.status,
                        iddobavljaca: narudzba.iddobavljaca,
                        mbrreferenta: narudzba.mbrreferenta
                    }
                });
                return {
                    idnarudzbe: result.idnarudzbe,
                    datumstvaranja: result.datumstvaranja ? result.datumstvaranja.toJSON().split('T')[0] : null,
                    datumzaprimanja: result.datumzaprimanja ? result.datumzaprimanja.toJSON().split('T')[0] : null,
                    status: result.status,
                    iddobavljaca: result.iddobavljaca,
                    mbrreferenta: result.mbrreferenta
                }
            }

            static async azurirajNarudzbu(id: number, narudzba: Narudzba) {
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
                return {
                    idnarudzbe: result.idnarudzbe,
                    datumstvaranja: result.datumstvaranja ? result.datumstvaranja.toJSON().split('T')[0] : null,
                    datumzaprimanja: result.datumzaprimanja ? result.datumzaprimanja.toJSON().split('T')[0] : null,
                    status: result.status,
                    iddobavljaca: result.iddobavljaca,
                    mbrreferenta: result.mbrreferenta
                };
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
