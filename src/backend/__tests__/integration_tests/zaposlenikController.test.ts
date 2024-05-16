import { Dobavljac } from '../../models/dobavljac';
import { DobavljacController } from '../../controllers/dobavljacController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/*
import {Zaposlenik} from '../models/zaposlenik';
import { Request, Response } from 'express';

export class ZaposlenikController {

    static async apiDohvatiZaposlenika(req: Request, res: Response){
        try {
            let mbr = req.params.mbr;
            let zaposlenik = await Zaposlenik.dohvatiZaposlenika(mbr);
            if (!zaposlenik) {
                res.status(400).json({error: "Zaposlenik nije pronađen."});
                return;
            }
            res.json(zaposlenik);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveZaposlenike(req: Request, res: Response){
        try {
            let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
            res.json(zaposlenici);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveReferenteNabave(req: Request, res: Response){
        try {
            let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
            if (!referenti) {
                res.status(400).json({error: "Referenti nabave nisu pronađeni."});
                return;
            }
            res.json(referenti);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveIdReferentataNabave(req: Request, res: Response){
        try {
            let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
            let referentiId = referenti.map(referent => referent.mbr);
            if (!referentiId) {
                res.status(400).json({error: "Referenti nabave nisu pronađeni."});
                return;
            }
            res.json(referentiId);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const zaposlenikClass =

    class Zaposlenik {
            mbr: string;
            ime: string;
            prezime: string;
            email: string;
            oib: string;
            datumrodenja: Date;
            spol: string;
            telefon: string;
            lozinka: string;
            datumzaposlenja: Date;
            datumotpustanja: Date;
            iduloge: number;
    
            constructor(mbr: string, ime: string, prezime: string, email: string, oib: string, datumrodenja: Date, spol: string, telefon: string, lozinka: string, datumzaposlenja: Date, datumotpustanja: Date, iduloge: number) {
                this.mbr = mbr;
                this.ime = ime;
                this.prezime = prezime;
                this.email = email;
                this.oib = oib;
                this.datumrodenja = datumrodenja;
                this.spol = spol;
                this.telefon = telefon;
                this.lozinka = lozinka;
                this.datumzaposlenja = datumzaposlenja;
                this.datumotpustanja = datumotpustanja;
                this.iduloge = iduloge;
            }
    
            static async dohvatiSveZaposlenike() {
                let zaposlenici = await prisma.zaposlenik.findMany();
                return zaposlenici;
            }

            static async dohvatiZaposlenika(mbr: string) {
                try {
                    let zaposlenik = await prisma.zaposlenik.findUnique({
                        where: {
                            mbr: mbr
                        }
                    });
                    if (!zaposlenik) {
                        throw new Error('Zaposlenik ne postoji');
                    }
                    return zaposlenik;
                }
                catch (err) {
                    throw err;
                }
            }
    
            static async dohvatiZaposlenikaPoEmailu(email: string) {
                let zaposlenik = await prisma.zaposlenik.findUnique({
                    where: {
                        email: email
                    }
                });
                return zaposlenik;
            }
    
            static async dohvatiZaposlenikaPoOibu(oib: string) {
                let zaposlenik = await prisma.zaposlenik.findUnique({
                    where: {
                        oib: oib
                    }
                });
                return zaposlenik;
            }

            static async dohvatiSveReferenteNabave() {
                let referentId = await prisma.uloga.findUnique({
                    where: {
                        naziv: 'referent nabave'
                    }
                });
                let referenti = await prisma.zaposlenik.findMany({
                    where: {
                        iduloge: referentId?.iduloge
                    }
                });
                return referenti;
            }

            static async provjeriReferentaNabave(mbr: string) {
                let zaposlenik
                try {
                    zaposlenik = await prisma.zaposlenik.findUnique({
                        where: {
                            mbr: mbr
                        }
                    });
                    if (!zaposlenik) {
                        throw "Zaposlenik ne postoji!"
                    }
                }
                catch (err) {
                    throw "Zaposlenik ne postoji!"
                }
                try {
                    let referentId = await prisma.uloga.findUnique({
                        where: {
                            naziv: 'referent nabave'
                        }
                    });
                    if (zaposlenik?.iduloge === referentId?.iduloge) {
                        return true;
                    }
                    else {
                        throw "Zaposlenik nije referent nabave!"
                    }
                }
                catch (err) {
                    throw err;
                }
                

            }

        }

export {zaposlenikClass as Zaposlenik}
    

 */


describe('Zaposlenik controller integration tests', () => {
    it('apiDohvatiZaposlenika', async () => {
        let o = await Dobavljac.dohvatiSveDobavljace();
        let id = o[0].iddobavljaca;
        let resultDobavljac = await prisma.dobavljac.findUnique({ where: { iddobavljaca: id } });
        let req = { params: { id: id } };
        let res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiDobavljaca(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(resultDobavljac);

        let badID = 0;
        req = { params: { id: badID } };
        res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        resultDobavljac = await prisma.dobavljac.findUnique({ where: { iddobavljaca: badID } });
        await DobavljacController.apiDohvatiDobavljaca(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('apiDohvatiSveDobavljace', async () => {
        let dobavljaci = await prisma.dobavljac.findMany();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiSveDobavljace(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(dobavljaci);
    });

    it('apiDohvatiSveId', async () => {
        let dobavljaci = await prisma.dobavljac.findMany();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiSveId(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(dobavljaci.map((dobavljac) => dobavljac.iddobavljaca));
    });
});