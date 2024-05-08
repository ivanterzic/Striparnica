import { Narudzba } from '../models/narudzba';
import { Request, Response } from 'express';
import { Zaposlenik } from '../models/zaposlenik';
import { ZaposlenikController } from './zaposlenikController';
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
            let narudzba = await Narudzba.dohvatiNarudzbu(id);
            res.json(narudzba);
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
}