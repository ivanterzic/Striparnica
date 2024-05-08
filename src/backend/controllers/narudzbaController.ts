import { Narudzba } from '../models/narudzba';
import { Request, Response } from 'express';

export class NarudzbaController{

    static async apiDohvatiSveNarudzbe(req : Request, res : Response){
        let narudzbe = await Narudzba.dohvatiSveNarudzbe();
        res.json(narudzbe);
    }

    static async apiDohvatiNarudzbu(req : Request, res : Response){
        let id = req.params.id;
        let narudzba = await Narudzba.dohvatiNarudzbu(parseInt(id));
        res.json(narudzba);
    }

    static async apiDohvatiArtikleNarudzbe(req : Request, res : Response){
        let id = req.params.id;
        let artikli = await Narudzba.dohvatiArtikleNarudzbe(parseInt(id));
        res.json(artikli);
    }

}