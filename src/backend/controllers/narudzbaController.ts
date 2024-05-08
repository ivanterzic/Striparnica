import { Narudzba } from '../models/narudzba';
import { Request, Response } from 'express';
import { Zaposlenik } from '../models/zaposlenik';
import { ZaposlenikController } from './zaposlenikController';
import { Dobavljac } from '../models/dobavljac';
import { Artikal } from '../models/artikal';
import { artikal } from '@prisma/client';

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
            let dobavljaci = (await Dobavljac.dohvatiSveDobavljace()).map((d) => d.iddobavljaca);
            let referenti = (await Zaposlenik.dohvatiSveReferenteNabave()).map((z) => z.mbr);
            
            if (!req.body.datumstvaranja || !req.body.datumzaprimanja || !req.body.status || !req.body.mbrreferenta || !req.body.iddobavljaca || !req.body.stavkenarudzbe) {
                res.status(400).json({ error: 'Nedostaju obavezna polja' });
                return;
            }
            if (req.body.datumstvaranja > req.body.datumzaprimanja) {
                res.status(400).json({ error: 'Datum zaprimanja mora biti veci od datuma stvaranja' });
                return;
            }
            if (!referenti.includes(req.body.mbrreferenta)) {
                res.status(400).json({ error: 'Mbr referenta nije medju referentima nabave' });
                return;
            }
            if (!dobavljaci.includes(req.body.iddobavljaca)) {
                res.status(400).json({ error: 'Id dobavljaca nije medju dobavljacima' });
                return;
            }
            let narudzba = new Narudzba(
                0,
                req.body.datumstvaranja,
                req.body.datumzaprimanja,
                req.body.status,
                req.body.mbrreferenta,
                req.body.iddobavljaca,
                req.body.stavkenarudzbe
            );
            let result = await Narudzba.kreirajNarudzbu(narudzba);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }
}