/*
example
import { Dobavljac } from '../../models/dobavljac';
import { DobavljacController } from '../../controllers/dobavljacController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
});*/

/*
import { Narudzba } from "../models/narudzba";
import { Request, Response } from "express";
import { Zaposlenik } from "../models/zaposlenik";
import { Dobavljac } from "../models/dobavljac";

export class NarudzbaController {
    static async apiDohvatiSveNarudzbe(req: Request, res: Response) {
        try {
            let narudzbe = await Narudzba.dohvatiSveNarudzbe();
            res.json(narudzbe);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiDohvatiNarudzbu(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            let result = await Narudzba.dohvatiNarudzbu(id);
            let previousId = await Narudzba.dohvatiPrviManjiID(id);
            let nextId = await Narudzba.dohvatiPrviVeciID(id);
            res.json({
                ...result,
                previousId: previousId,
                nextId: nextId,
            });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiDohvatiSveStatuseNarudzbi(req: Request, res: Response) {
        try {
            let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
            res.json(statusi);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiDohvatSvihKljuceva(req: Request, res: Response) {
        try {
            let mbrreferenata = await Zaposlenik.dohvatiSveReferenteNabave();
            let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
            let iddobavljaca = await Dobavljac.dohvatiSveDobavljace();
            let narudzbe = await Narudzba.dohvatiSveNarudzbe();
            res.json({
                mbrreferenata: mbrreferenata.map((z) => z.mbr),
                statusi: statusi,
                dobavljaci: iddobavljaca.map((d) => {
                    return {
                        id: d.iddobavljaca,
                        ime: d.ime,
                    };
                }),
                narudzbe: narudzbe.map((n) => {
                    return n.idnarudzbe;
                }),
            });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiKreirajNarudzbu(req : Request, res : Response){
        try {
            let {datumstvaranja, datumzaprimanja} = await NarudzbaController.pretvoriDatume(req.body.datumstvaranja, req.body.datumzaprimanja);
            req.body.iddobavljaca ? NarudzbaController.provjeriIdDobavljaca(req.body.iddobavljaca) : null;
            let result = await Narudzba.kreirajNarudzbu(
                datumstvaranja,
                datumzaprimanja,
                req.body.status,
                parseInt(req.body.iddobavljaca),
                req.body.mbrreferenta
            )
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiAzurirajNarudzbu(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            let {datumstvaranja, datumzaprimanja} = await NarudzbaController.pretvoriDatume(req.body.datumstvaranja, req.body.datumzaprimanja);
            req.body.iddobavljaca ? NarudzbaController.provjeriIdDobavljaca(req.body.iddobavljaca) : null;
            let result = await Narudzba.azurirajNarudzbu(
                id,
                datumstvaranja,
                datumzaprimanja,
                req.body.status,
                parseInt(req.body.iddobavljaca),
                req.body.mbrreferenta
            )
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiObrisiNarudzbu(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            let result = await Narudzba.obrisiNarudzbu(id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async apiUrediArtikleNarudzbe(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            let artikli: Array<{
                idartikla: number;
                kolicina: number;
            }> = [];
            let result = await Narudzba.urediArtikleNarudzbe(id, req.body.stavkenarudzbe);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async pretvoriDatume(datumstvaranja: string, datumzaprimanja: string){
        let datumstvaranjaDate = new Date(datumstvaranja);
        try {
            if (datumstvaranja){
                if (isNaN(datumstvaranjaDate.getTime())){
                    throw "Datum stvaranja nije ispravan!";
                }
            }
            else {
                throw "Datum stvaranja je obavezan!";
            }
            
            if (!datumzaprimanja || datumzaprimanja === "" || datumzaprimanja === null){
                return {
                    datumstvaranja: datumstvaranjaDate,
                    datumzaprimanja: null
                }
            }
            let datumzaprimanjaDate = new Date(datumzaprimanja);
            if (isNaN(datumzaprimanjaDate.getTime())){
                throw "Datum zaprimanja nije ispravan!";
            }
            return {
                datumstvaranja: datumstvaranjaDate,
                datumzaprimanja: datumzaprimanjaDate
            }
        } catch (err){
            throw err;
        }

        
    }
    static  provjeriIdDobavljaca(id: string){
        if (!/^[0-9]+$/.test(id)) {
            throw "ID dobavljača mora biti broj!";
        }
    }
}
*/

/*import { PrismaClient } from '@prisma/client';
import { Dobavljac } from './dobavljac';
import { Artikal } from './artikal';
import { Zaposlenik } from './zaposlenik';
import e from 'express';
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
            static idnarudzbe: number | undefined;
            
            private constructor(id: number, datumstvaranja: Date, datumzaprimanja: Date | null, status: string, iddobavljaca: number, mbrreferenta: string) { 
                this.idnarudzbe = id;
                this.datumstvaranja = datumstvaranja;
                this.datumzaprimanja = datumzaprimanja;
                this.status = status;
                this.iddobavljaca = iddobavljaca;
                this.mbrreferenta = mbrreferenta;
            }

            
            static async kreirajNarudzbu(
                datumstvaranja: Date | undefined,
                datumzaprimanja: Date | null,
                status: string | undefined,
                iddobavljaca: number | undefined,
                mbrreferenta: string | undefined
            ) {
                try {
                    Narudzba.provjeriObaveznaPolja(datumstvaranja, status, mbrreferenta, iddobavljaca);
                    if (!datumstvaranja || !status || !mbrreferenta || !iddobavljaca) {
                        throw 'Nedostaju obavezna polja.';
                    }
                    Narudzba.provjeriDatumStvaranja(datumstvaranja);
                    if (datumzaprimanja) {
                        Narudzba.provjeriDatumZaprimanja(datumzaprimanja, datumstvaranja);
                    }
                    await Narudzba.provjeriDobavljaca(iddobavljaca);
                    await Zaposlenik.provjeriReferentaNabave(mbrreferenta);
                    Narudzba.provjeriStatus(status);
    
                    let result = await prisma.narudzba.create({
                        data: {
                            datumstvaranja: datumstvaranja,
                            datumzaprimanja: datumzaprimanja,
                            status: status,
                            iddobavljaca: iddobavljaca,
                            mbrreferenta: mbrreferenta
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
                catch (err) {
                    throw err;
                }
            }

            static async dohvatiSveNarudzbe() {
                let result = await prisma.narudzba.findMany(
                    {orderBy: {idnarudzbe: 'asc'}}
                );
                let result2 = [];
                for (let r of result) {
                    result2.push({
                        idnarudzbe: r.idnarudzbe,
                        datumstvaranja: r.datumstvaranja ? r.datumstvaranja.toJSON().split('T')[0] : null,
                        datumzaprimanja: r.datumzaprimanja ? r.datumzaprimanja.toJSON().split('T')[0] : null,
                        status: r.status,
                        iddobavljaca: r.iddobavljaca,
                        mbrreferenta: r.mbrreferenta
                    });
                }
                return result2;
            }   
    
            static async dohvatiNarudzbu(id: number) {
                try {
                    await Narudzba.provjeriIdNarudzbe(id);
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
                    let artikliProsireno = [];
                    for (let a of artikli) {
                        let art = await prisma.artikal.findUnique({
                            where: {
                                idartikla: a.idartikla
                            }
                        });
                        artikliProsireno.push({
                            ...art,
                            kolicina: a.kolicina
                        });
                    }
                    return {
                        narudzba : {
                            idnarudzbe: result?.idnarudzbe,
                            datumstvaranja: result?.datumstvaranja ? result?.datumstvaranja.toJSON().split('T')[0] : null,
                            datumzaprimanja: result?.datumzaprimanja ? result?.datumzaprimanja.toJSON().split('T')[0] : null,
                            status: result?.status,
                            iddobavljaca: result?.iddobavljaca,
                            mbrreferenta: result?.mbrreferenta
                        
                        },
                        artikli : artikliProsireno
                    }
                }
                catch (err) {
                    throw err;
                }
            }

            static async dohvatiSveStatuseNarudzbi() {
                return statusiNarudzbe;
            }

            static async dohvatiPrviVeciID(id: number) {
                try {
                    Narudzba.provjeriIdNarudzbe(id);
                let result = await prisma.narudzba.findFirst({
                    where: {
                        idnarudzbe: {
                            gt: id
                        }
                    },
                    orderBy: {
                        idnarudzbe: 'asc'
                    }
                });
                return result?.idnarudzbe;
                } catch (err) {
                    throw err;
                }
                
            }

            static async dohvatiPrviManjiID(id: number) {
                try{
                    Narudzba.provjeriIdNarudzbe(id);
                    let result = await prisma.narudzba.findFirst({
                        where: {
                            idnarudzbe: {
                                lt: id
                            }
                        },
                        orderBy: {
                            idnarudzbe: 'desc'
                        }
                    });
                    return result?.idnarudzbe;
                }
                catch (err) {
                    throw err;
                }
            }
   
            static async azurirajNarudzbu(
                id : number | undefined,
                datumstvaranja: Date | undefined,
                datumzaprimanja: Date | null | undefined,
                status: string | undefined,
                iddobavljaca: number | undefined,
                mbrreferenta: string | undefined
            ) {
                try {
                    await Narudzba.provjeriIdNarudzbe(id);
                    if (!datumstvaranja || !status || !mbrreferenta || !iddobavljaca) {
                        throw 'Nedostaju obavezna polja.';
                    }
                    Narudzba.provjeriObaveznaPolja(datumstvaranja, status, mbrreferenta, iddobavljaca);
                    Narudzba.provjeriDatumStvaranja(datumstvaranja);
                    if (datumzaprimanja) {
                        Narudzba.provjeriDatumZaprimanja(datumzaprimanja, datumstvaranja);
                    }
                    await Narudzba.provjeriDobavljaca(iddobavljaca);
                    await Zaposlenik.provjeriReferentaNabave(mbrreferenta);
                    Narudzba.provjeriStatus(status);

                    let result = await prisma.narudzba.update({
                        where: {
                            idnarudzbe: id
                        },
                        data: {
                            datumstvaranja: datumstvaranja,
                            datumzaprimanja: datumzaprimanja,
                            status: status,
                            iddobavljaca: iddobavljaca,
                            mbrreferenta: mbrreferenta
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
                catch (err) {
                    throw err;
                }
            }

            static async obrisiNarudzbu(id: number) {
                try {
                    await Narudzba.provjeriIdNarudzbe(id);
                    let result2 = await prisma.narudzbaartikli.deleteMany({
                        where: {
                            idnarudzbe: id
                        }
                    });
                    let result = await prisma.narudzba.delete({
                        where: {
                            idnarudzbe: id
                        }
                    });
                    return result;
                }
                catch (err) {
                    throw err;
                }
            }

            static async urediArtikleNarudzbe(id: number, artikli: Array<{
                idartikla: number
                kolicina: number
            }>) {
                try {
                    await Narudzba.provjeriIdNarudzbe(id);
                    if (!artikli) {
                        throw 'Nedostaju stavke narudžbe.';
                    }
                    await Narudzba.provjeriStavkeNarudzbe(artikli);

                    let narudzba = await prisma.narudzba.findUnique({
                        where: {
                            idnarudzbe: id
                        }
                    });
                    for (let artikal of artikli) {
                        let result = await prisma.artikal.findUnique({
                            where: {
                                idartikla: artikal.idartikla
                            }
                        });
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
                catch (err) {
                    throw err;
                }
                
            }

            static provjeriObaveznaPolja(datumstvaranja: Date | undefined, status: string | undefined, mbrreferenta: string | undefined, iddobavljaca: number | undefined){
                if (!datumstvaranja || !status || !mbrreferenta || !iddobavljaca) {
                    throw 'Nedostaju obavezna polja.';
                }
            }


            static  provjeriDatumStvaranja(datumstvaranja: Date) {
                if (isNaN(datumstvaranja.getTime())) {
                    throw 'Datum stvaranja nije validan datum.';
                }
                if (datumstvaranja.getTime() > Date.now()) {
                    throw 'Datum stvaranja ne može biti u budućnosti.';
                }
            }

            static provjeriDatumZaprimanja(datumzaprimanja: Date, datumstvaranja: Date) {
                if (isNaN(datumzaprimanja.getTime())) {
                    throw 'Datum zaprimanja nije validan datum.';
                }
                if (datumzaprimanja.getTime() < datumstvaranja.getTime()) {
                    throw 'Datum zaprimanja mora biti nakon datuma stvaranja.';
                }
            }

            static async provjeriDobavljaca(iddobavljaca: number) {
                try {
                    let dobavljaci = await Dobavljac.dohvatiSveDobavljace()
                    let dobavljaciID = dobavljaci.map((d) => d.iddobavljaca);
                    if (!dobavljaciID.includes(iddobavljaca)) {
                        throw 'Id dobavljača nije među validnim dobavljačima.';
                    }
                }
                catch (err) {
                    throw err;
                }
                
            }

            static provjeriStatus(status: string) {       
                if (!statusiNarudzbe.includes(status)) {
                    throw 'Status nije među validnim statusima narudžbe.';
                }
            }

            static async provjeriIdNarudzbe(id: number | undefined) {
                try {
                    if (id == 0){
                        throw 'Id narudžbe ne može biti 0.';
                    }
                    if (!id || id == undefined) {
                        throw 'Nedostaje id narudžbe.';
                    }
                    if (isNaN(id)) {
                        throw 'Id narudžbe mora biti broj.';
                    }
                    if (id <= 0) {
                        throw 'Id narudžbe mora biti veći od 0.';
                    }
                    if (id % 1 != 0) {
                        throw 'Id narudžbe mora biti cijeli broj.';
                    }
                    let narudzbe = await Narudzba.dohvatiSveNarudzbe();
                    let narudzbeID = narudzbe.map((n) => n.idnarudzbe);
                    if (!narudzbeID.includes(id)) {
                        throw 'Id narudžbe nije validan.';
                    }
                }
                catch (err) {
                    throw err;
                }
                
            }

            static async provjeriStavkeNarudzbe(stavke: Array<{
                idartikla: number
                kolicina: number
            }> | undefined | Array<any> | string) {
                try {
                    if (!stavke) {
                        throw 'Nedostaju stavke narudžbe.';
                    }
                    let artikli, artikliID;
                    try {
                        artikli = await Artikal.dohvatiSveArtikle();
                        artikliID = artikli.map((a) => a.idartikla)
                    }
                    catch (err) {
                        throw 'Greška prilikom dohvaćanja artikala.';
                    }
                ;
                    let stavkenarudzbe
                    try {
                        stavkenarudzbe = typeof stavke === 'string' ? JSON.parse(stavke) : stavke;
                        if (!Array.isArray(stavkenarudzbe)) {
                            throw 'Stavke narudžbe nisu u validnom formatu.';
                        }
                    }
                    catch (err) {
                        throw err;
                    }
                    for (let stavka of stavkenarudzbe) {
                        if (!stavka.idartikla || stavka.kolicina == undefined || stavka.kolicina == null) {
                            throw 'Nedostaju obavezna polja u stavci narudžbe.';
                        }
                        if (typeof stavka.kolicina != 'number') {
                            throw 'Količina mora biti broj.';
                        }
                        if (stavka.kolicina <= 0) {
                            throw 'Količina mora biti veća od 0.';
                        }
                        if (!artikliID.includes(stavka.idartikla)) {
                            throw 'Id artikla nije među validnim artiklima.';
                        }
                    }
                }
                catch (err) {
                    throw err;
                }
            }
    };

export { narudzbaClass as Narudzba };
*/

import { Narudzba } from "../../models/narudzba";
import { NarudzbaController } from "../../controllers/narudzbaController";
import { PrismaClient } from '@prisma/client';
import { Zaposlenik } from "../../models/zaposlenik";
import e from "express";
import exp from "constants";

const prisma = new PrismaClient();

describe('Narudzba controller integration tests', () => {
    it('apiDohvatiSveNarudzbe', async () => {
        let narudzbe = await Narudzba.dohvatiSveNarudzbe();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiSveNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(narudzbe);
    });

    it('apiDohvatiNarudzbu', async () => {
        let o = await Narudzba.dohvatiSveNarudzbe();
        let id = o[0].idnarudzbe;
        let resultNarudzba = await Narudzba.dohvatiNarudzbu(id);
        let previousId = await Narudzba.dohvatiPrviManjiID(id);
        let nextId = await Narudzba.dohvatiPrviVeciID(id);
        const req = { params: { id: id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({
            ...resultNarudzba,
            previousId: previousId,
            nextId: nextId,
        });
    });

    it('apiDohvatiSveStatuseNarudzbi', async () => {
        let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiSveStatuseNarudzbi(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(statusi);
    });

    it('apiDohvatSvihKljuceva', async () => {
        let ulogaID = await prisma.uloga.findMany({where: {naziv: "referent nabave"}});
        let mbrreferenata = await prisma.zaposlenik.findMany({where: {iduloge: ulogaID[0].iduloge}});
        let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
        let iddobavljaca = await prisma.dobavljac.findMany();
        let narudzbe = await prisma.narudzba.findMany({orderBy: {idnarudzbe: 'asc'}});
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatSvihKljuceva(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({
            mbrreferenata: mbrreferenata.map((z) => z.mbr),
            statusi: statusi,
            dobavljaci: iddobavljaca.map((d) => {
                return {
                    id: d.iddobavljaca,
                    ime: d.ime,
                };
            }),
            narudzbe: narudzbe.map((n) => {
                return n.idnarudzbe;
            }),
        });
    }
    );

    it('apiKreirajNarudzbu', async () => {
        let datumstvaranja = new Date();
        let datumzaprimanja = new Date();
        let status = "potvrdena";
        let iddobavljaca = 1;
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        let mbrreferenta =  referenti[0].mbr;
        let req = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);

        let req2 = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: "0" } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(400);
        
        let req3 = { body: { datumstvaranja: undefined, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res3 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req3 as any, res3 as any);
        expect(res3.status).toHaveBeenCalledWith(400);

        let req4 = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: 982374, mbrreferenta: mbrreferenta } };
        let res4 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req4 as any, res4 as any);
        expect(res4.status).toHaveBeenCalledWith(400);

        let req5 = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: "neki status nevaljani", iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res5 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req5 as any, res5 as any);
        expect(res5.status).toHaveBeenCalledWith(400);

    });

    it('apiAzurirajNarudzbu', async () => {
        let o = await Narudzba.dohvatiSveNarudzbe();
        let id = o[0].idnarudzbe;
        let datumstvaranja = new Date();
        let datumzaprimanja = new Date();
        let status = "potvrdena";
        let iddobavljaca = 1;
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        let mbrreferenta =  referenti[0].mbr;
        let req = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);

        let req2 = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: "0" } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(400);
        
        let req3 = { params: { id: id }, body: { datumstvaranja: undefined, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res3 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req3 as any, res3 as any);
        expect(res3.status).toHaveBeenCalledWith(400);

        let req4 = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: 982374, mbrreferenta: mbrreferenta } };
        let res4 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req4 as any, res4 as any);
        expect(res4.status).toHaveBeenCalledWith(400);

            
        let req5 = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: "neki status nevaljani", iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res5 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };   
        await NarudzbaController.apiAzurirajNarudzbu(req5 as any, res5 as any);
        expect(res5.status).toHaveBeenCalledWith(400);

    });

    jest.mock('../../models/narudzba', () => {
        return {
            Narudzba: {
                obrisiNarudzbu: jest.fn(),
                urediArtikleNarudzbe: jest.fn(),
                dohvatiSveNarudzbe: jest.fn().mockResolvedValue([
                    {
                        idnarudzbe: 1,
                        datumstvaranja: new Date(),
                        datumzaprimanja: new Date(),
                        status: "potvrdena",
                        iddobavljaca: 1,
                        mbrreferenta: "1234567890123"
                    }
                ])
            }
        }
    });

    it('apiObrisiNarudzbu', async () => {
        let o = await Narudzba.dohvatiSveNarudzbe();
        let id = o[0].idnarudzbe;
        let req = { params: { id: id } };
        let res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiObrisiNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);

        let req2 = { params: { id: 0 } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiObrisiNarudzbu(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(400);
        
    });

    it('apiUrediArtikleNarudzbe', async () => {
        let o = await Narudzba.dohvatiSveNarudzbe();
        let id = o[0].idnarudzbe;
        let artikli = await prisma.artikal.findMany();
        let stavkenarudzbe = [];
        for (let a of artikli) {
            stavkenarudzbe.push({ idartikla: a.idartikla, kolicina: 1 });
        }
        let result = Narudzba.urediArtikleNarudzbe(id, stavkenarudzbe);
        let req = { params: { id: id }, body: { stavkenarudzbe: stavkenarudzbe } };
        let res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);

        let req2 = { params: { id: id }, body: { stavkenarudzbe: [] } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(200);

        let req3 = { params: { id: id }, body: { stavkenaruzbe: [{ idartikla: 0, kolicina: 1 }] } };
        let res3 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req3 as any, res3 as any);
        expect(res3.status).toHaveBeenCalledWith(400);

        let req4 = { params: { id: id }, body: { stavkenarudzbe: [{ idartikla: 1, kolicina: 0 }] } };
        let res4 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req4 as any, res4 as any);
        expect(res4.status).toHaveBeenCalledWith(400);


    });
});




