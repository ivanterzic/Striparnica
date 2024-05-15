import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dobavljacClass =
    class Dobavljac {
        
        iddobavljaca: number;
        ime: string;
        adresa: string;
        email: string;
        imevlasnika: string;
        prezimevlasnika: string;
        
        private constructor(id: number, ime: string, adresa: string, email: string, imevlasnika: string, prezimevlasnika: string) { 
            this.iddobavljaca = id;
            this.ime = ime;
            this.adresa = adresa;
            this.email = email;
            this.imevlasnika = imevlasnika;
            this.prezimevlasnika = prezimevlasnika;
        }

        static async dohvatiSveDobavljace() {
            let result = await prisma.dobavljac.findMany();
            return result;
        }   

        static async dohvatiDobavljaca(id: number) {
            let result = await prisma.dobavljac.findUnique({
                where: {
                    iddobavljaca: id
                }
            });
            return result;
        }


    };

export { dobavljacClass as Dobavljac };
