/* test for narudzbaController */
/*import { Narudzba } from "../models/narudzba";
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

import { Narudzba } from "../models/narudzba";
import { NarudzbaController } from "../controllers/narudzbaController";
import { Request, Response } from "express";
import { Zaposlenik } from "../models/zaposlenik";
import { Dobavljac } from "../models/dobavljac";

// mock
jest.mock("../models/narudzba", () => ({
    Narudzba: {
        dohvatiSveNarudzbe: jest.fn().mockResolvedValue([{ idnarudzbe: 1, status: "potvrdena" }, { idnarudzbe: 2, status: "u tijeku" }]),
        dohvatiNarudzbu: jest.fn(),
        dohvatiPrviManjiID: jest.fn(),
        dohvatiPrviVeciID: jest.fn(),
        dohvatiSveStatuseNarudzbi: jest.fn().mockResolvedValue(["potvrdena", "u tijeku"]),
        kreirajNarudzbu: jest.fn(),
        azurirajNarudzbu: jest.fn(),
        obrisiNarudzbu: jest.fn(),
        urediArtikleNarudzbe: jest.fn(),
    },
}));

jest.mock("../models/zaposlenik", () => ({
    Zaposlenik: {
        dohvatiSveReferenteNabave: jest.fn().mockResolvedValue([{ mbr: '1', ime: "Zaposlenik 1" }, { mbr: '2', ime: "Zaposlenik 2" }]),
    },
}));

jest.mock("../models/dobavljac", () => ({
    Dobavljac: {
        dohvatiSveDobavljace: jest.fn().mockResolvedValue([{ iddobavljaca: 1, ime: "Dobavljac 1" }, { iddobavljaca: 2, ime: "Dobavljac 2" }]),
    },
}));

describe('Narudzba controller tests', () => {
    it('apiDohvatiSveNarudzbe', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatiSveNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([
            { idnarudzbe: 1, status: "potvrdena" },
            { idnarudzbe: 2, status: "u tijeku" }
        ]);
    });

    it('apiDohvatiNarudzbu', async () => {
        Narudzba.dohvatiNarudzbu = jest.fn().mockResolvedValueOnce({ idnarudzbe: 1, status: "Kreirana" });
        Narudzba.dohvatiPrviManjiID = jest.fn().mockResolvedValueOnce(0);
        Narudzba.dohvatiPrviVeciID = jest.fn().mockResolvedValueOnce(2);
        let req = { params: { id: '1' } };
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({
            idnarudzbe: 1,
            status: "Kreirana",
            previousId: 0,
            nextId: 2,
        });
    });

    it('apiDohvatiSveStatuseNarudzbi', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatiSveStatuseNarudzbi(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(["potvrdena", "u tijeku"]);
    });

    it('apiDohvatSvihKljuceva', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatSvihKljuceva(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({
            mbrreferenata: ['1', '2'],
            statusi: ["potvrdena", "u tijeku"],
            dobavljaci: [
                { id: 1, ime: "Dobavljac 1" },
                { id: 2, ime: "Dobavljac 2" },
            ],
            narudzbe: [1, 2],
        });
    }
    );

    it('apiKreirajNarudzbu', async () => {
        const req = {
            body: {
                datumstvaranja: "2021-01-01",
                datumzaprimanja: "2021-01-02",
                status: "Kreirana",
                iddobavljaca: 1,
                mbrreferenta: '1',
            }
        };
        const res = { json: jest.fn(), status: jest.fn() };
        await NarudzbaController.apiKreirajNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalled();
    });

    it('apiAzurirajNarudzbu', async () => {
        const req = {
            params: { id: '1' },
            body: {
                datumstvaranja: "2021-01-01",
                datumzaprimanja: "2021-01-02",
                status: "Kreirana",
                iddobavljaca: 1,
                mbrreferenta: '1',
            }
        };
        const res = { json: jest.fn(), status: jest.fn() };
        await NarudzbaController.apiAzurirajNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalled();
    });

    it('apiObrisiNarudzbu', async () => {
        const req = {
            params: { id: '1' },
        };
        const res = { json: jest.fn(), status: jest.fn() };
        await NarudzbaController.apiObrisiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalled();
    });

    it('apiUrediArtikleNarudzbe', async () => {
        const req = {
            params: { id: '1' },
            body: {
                stavkenarudzbe: [
                    { idartikla: 1, kolicina: 1 },
                    { idartikla: 2, kolicina: 2 },
                ]
            }
        };
        const res = { json: jest.fn(), status: jest.fn() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalled();
    });

    it('pretvoriDatume', async () => {
        let result = await NarudzbaController.pretvoriDatume("2021-01-01", "2021-01-02");
        expect(result).toEqual({
            datumstvaranja: new Date("2021-01-01"),
            datumzaprimanja: new Date("2021-01-02"),
        });
    });

    it('provjeriIdDobavljaca', async () => {
        expect(() => NarudzbaController.provjeriIdDobavljaca("1")).not.toThrow();
        expect(() => NarudzbaController.provjeriIdDobavljaca("a")).toThrow();
    });

}
);