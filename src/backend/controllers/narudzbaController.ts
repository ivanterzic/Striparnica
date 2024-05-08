import { Narudzba } from '../models/narudzba';
import { Request, Response } from 'express';

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

   

}