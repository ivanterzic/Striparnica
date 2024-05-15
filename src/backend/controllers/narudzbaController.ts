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
            if (typeof req.body.stavkenarudzbe === "string") {
                try {
                    for (let stavka of JSON.parse(req.body.stavkenarudzbe)) {
                        artikli.push({
                            idartikla: stavka.idartikla,
                            kolicina: stavka.kolicina,
                        });
                    }
                }
                catch (err){
                    throw "Stavke narudžbe nisu ispravno definirane!";
                }
                
            } else {
                for (let stavka of req.body.stavkenarudzbe) {
                    artikli.push({
                        idartikla: stavka.idartikla,
                        kolicina: stavka.kolicina,
                    });
                }
            }
            let result = await Narudzba.urediArtikleNarudzbe(id, artikli);
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
