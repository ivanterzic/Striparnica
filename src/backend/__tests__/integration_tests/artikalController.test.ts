import { Artikal } from '../../models/artikal';
import { ArtikalController } from '../../controllers/artikalController';

/*
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

import {Artikal} from '../models/artikal';
import { Request, Response } from 'express';

export class ArtikalController{

    static async apiDohvatiArtikal(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let artikal = await Artikal.dohvatiArtikal(id);
            if (!artikal) {
                res.status(400).json({error: "Artikal nije pronađen."});
                return;
            }
            res.json(artikal);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveArtikle(req: Request, res: Response){
        try {
            let artikli = await Artikal.dohvatiSveArtikle();
            res.json(artikli);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

}
*/

jest.mock('../../models/artikal', () => {
    return {
        Artikal: {
            dohvatiSveArtikle: jest.fn().mockResolvedValue([
                {
                    idartikla: 1,
                    naziv: "Artikal 1",
                    opis: "Opis artikla 1",
                    dostupnakolicina: 10,
                    cijena: 100,
                    pdv: 25,
                    izdavac: "Izdavac 1",
                    izdanje: "Izdanje 1"
                }
            ]),
            dohvatiArtikal: jest.fn(async (id: number) => {
                return {
                    idartikla: 1,
                    naziv: "Artikal 1",
                    opis: "Opis artikla 1",
                    dostupnakolicina: 10,
                    cijena: 100,
                    pdv: 25,
                    izdavac: "Izdavac 1",
                    izdanje: "Izdanje 1"
                }
            })

        }
    }
}); 

describe('Artikal controller integration tests', () => {
   
    it('apiDohvatiSveArtikle', async () => {
        let artikli = await Artikal.dohvatiSveArtikle();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ArtikalController.apiDohvatiSveArtikle(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(artikli);
    });

    it('apiDohvatiArtikal', async () => {
        let artikal = await Artikal.dohvatiArtikal(1);
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ArtikalController.apiDohvatiArtikal(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(artikal);
    });

});