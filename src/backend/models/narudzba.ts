import { PrismaClient } from '@prisma/client';
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
                let result = await prisma.narudzba.findMany();
                return result;
            }   
    
            static async dohvatiNarudzbu(id: number) {
                let result = await prisma.narudzba.findUnique({
                    where: {
                        idnarudzbe: id
                    }
                });
                return result;
            }

           
    };

export { narudzbaClass as Narudzba };
