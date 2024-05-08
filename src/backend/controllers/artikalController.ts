import {Artikal} from '../models/artikal';
import { Request, Response } from 'express';

export class ArtikalController{

    static async apiDohvatiArtikal(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let artikal = await Artikal.dohvatiArtikal(id);
            res.json(artikal);
        }
        catch (err) {
            res.status(500).json({error: err});
        }
    }

    static async apiDohvatiSveArtikle(req: Request, res: Response){
        try {
            let artikli = await Artikal.dohvatiSveArtikle();
            res.json(artikli);
        }
        catch (err) {
            res.status(500).json({error: err});
        }
    }

}