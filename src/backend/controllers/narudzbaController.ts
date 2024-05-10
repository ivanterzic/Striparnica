import { Narudzba } from '../models/narudzba';
import { Request, Response } from 'express';
import { Zaposlenik } from '../models/zaposlenik';
import { Dobavljac } from '../models/dobavljac';

export class NarudzbaController{

    static async apiDohvatiSveNarudzbe(req : Request, res : Response){
        try {
            let narudzbe = await Narudzba.dohvatiSveNarudzbe();
            res.json(narudzbe);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiDohvatiNarudzbu(req : Request, res : Response){
        try {
            let id = parseInt(req.params.id);
            let result = await Narudzba.dohvatiNarudzbu(id);
            let previousId = await Narudzba.dohvatiPrviManjiID(id);
            let nextId = await Narudzba.dohvatiPrviVeciID(id);
            res.json({
                ...result,
                previousId: previousId,
                nextId: nextId
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiDohvatiSveStatuseNarudzbi(req : Request, res : Response){
        try {
            let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
            res.json(statusi);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiDohvatSvihKljuceva(req : Request, res : Response){
        try {
            let mbrreferenata = await Zaposlenik.dohvatiSveReferenteNabave();
            let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
            let iddobavljaca = await Dobavljac.dohvatiSveDobavljace();
            let narudzbe = await Narudzba.dohvatiSveNarudzbe();
            res.json({
                mbrreferanata: mbrreferenata.map((z) => z.mbr),
                statusi: statusi, 
                dobavljaci : iddobavljaca.map((d) => {
                    return {
                        id: d.iddobavljaca,
                        ime: d.ime
                    }
                }),
                narudzbe: narudzbe.map((n) => {
                    return n.idnarudzbe
                })
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiKreirajNarudzbu(req : Request, res : Response){
        try {
            let narudzba = new Narudzba(
                0,
                req.body.datumstvaranja,
                req.body.datumzaprimanja = "" ? null : req.body.datumzaprimanja,
                req.body.status,
                parseInt(req.body.iddobavljaca),
                req.body.mbrreferenta
            );
            let result = await Narudzba.kreirajNarudzbu(narudzba);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiAzurirajNarudzbu(req : Request, res : Response){
        try {
            let narudzba = new Narudzba(
                0,
                req.body.datumstvaranja,
                req.body.datumzaprimanja = "" ? null : req.body.datumzaprimanja,
                req.body.status,
                parseInt(req.body.iddobavljaca),
                req.body.mbrreferenta
            );
            let result = await Narudzba.azurirajNarudzbu(parseInt(req.params.id), narudzba);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiObrisiNarudzbu(req : Request, res : Response){
        try {
            let id = parseInt(req.params.id);
            let result = await Narudzba.obrisiNarudzbu(id);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiUrediArtikleNarudzbe(req : Request, res : Response){
        try {
            let id = parseInt(req.params.id);
            if (!req.body.stavkenarudzbe) {
                res.status(400).json({ error: 'Nedostaju stavke narudzbe' });
                return;
            }
            let artikli : Array<{
                idartikla: number
                kolicina: number
            }> = []
            if (typeof req.body.stavkenarudzbe === 'string'){
                for (let stavka of JSON.parse(req.body.stavkenarudzbe)) {
                    artikli.push({
                        idartikla: stavka.idartikla,
                        kolicina: stavka.kolicina
                    });
                }
            }
            else {
                for (let stavka of req.body.stavkenarudzbe) {
                    artikli.push({
                        idartikla: stavka.idartikla,
                        kolicina: stavka.kolicina
                    });
                }
            }
            let result = await Narudzba.urediArtikleNarudzbe(id, artikli);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}