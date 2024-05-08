import { Narudzba } from '../models/narudzba';
import { Request, Response } from 'express';
import { Zaposlenik } from '../models/zaposlenik';
import { Dobavljac } from '../models/dobavljac';
import { Artikal } from '../models/artikal';
import { parse } from 'path';

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
            let narudzba = result.narudzba;
            let updatedArtikli = [];
            for (let artikal of result.artikli) {
                let a = await Artikal.dohvatiArtikal(artikal.idartikla);
                updatedArtikli.push({
                    arikal : a,
                    kolicina : artikal.kolicina
                });
            }
            res.json({
                narudzba : narudzba,
                artikli : updatedArtikli
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

    static async apiDohvatSvihStranihKljuceva(req : Request, res : Response){
        try {
            let mbrreferenata = await Zaposlenik.dohvatiSveReferenteNabave();
            let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
            let iddobavljaca = await Dobavljac.dohvatiSveDobavljace();
            res.json({
                mbrreferanata: mbrreferenata.map((z) => z.mbr),
                statusi: statusi, 
                iddobavljaca : iddobavljaca.map((d) => d.iddobavljaca)
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiDohvatiNarudzbuSPrvimVecimID(req : Request, res : Response){
       try {
            let id = parseInt(req.params.id);
            let nextId = await Narudzba.dohvatiPrviVeciID(id);
            if (nextId) {
                let result = await Narudzba.dohvatiNarudzbu(nextId);
                res.json(result);
            }
            else {
                res.json(null);
            }
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiDohvatiNarudzbuSPrvimManjimID(req : Request, res : Response){
        try {
            let id = parseInt(req.params.id);
            let previousId = await Narudzba.dohvatiPrviManjiID(id);
            if (previousId) {
                let result = await Narudzba.dohvatiNarudzbu(previousId);
                res.json(result);
            }
            else {
                res.json(null);
            }
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

            for (let stavka of JSON.parse(req.body.stavkenarudzbe)) {
                artikli.push({
                    idartikla: stavka.idartikla,
                    kolicina: stavka.kolicina
                });
            }
            let result = await Narudzba.urediArtikleNarudzbe(id, artikli);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}