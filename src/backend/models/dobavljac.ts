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
        
        constructor(id: number, ime: string, adresa: string, email: string, imevlasnika: string, prezimevlasnika: string) { 
            this.iddobavljaca = id;
            this.ime = ime;
            this.adresa = adresa;
            this.email = email;
            this.imevlasnika = imevlasnika;
            this.prezimevlasnika = prezimevlasnika;
        }

        static async dohvatiSveDobavljace() {
            prisma.dobavljac.findMany()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
        }   

        static async dohvatiDobavljaca(id: number) {
            prisma.dobavljac.findUnique({
                where: {
                    iddobavljaca: id
                }
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
        }

        static async dodajDobavljaca(dobavljac: Dobavljac) {
            prisma.dobavljac.create({
                data: {
                    iddobavljaca: dobavljac.iddobavljaca,
                    ime: dobavljac.ime,
                    adresa: dobavljac.adresa,
                    email: dobavljac.email,
                    imevlasnika: dobavljac.imevlasnika,
                    prezimevlasnika: dobavljac.prezimevlasnika
                }
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
        }

        static async azurirajDobavljaca(dobavljac: Dobavljac) {
            prisma.dobavljac.update({
                where: {
                    iddobavljaca: dobavljac.iddobavljaca
                },
                data: {
                    ime: dobavljac.ime,
                    adresa: dobavljac.adresa,
                    email: dobavljac.email,
                    imevlasnika: dobavljac.imevlasnika,
                    prezimevlasnika: dobavljac.prezimevlasnika
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

export { dobavljacClass as Dobavljac };
