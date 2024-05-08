import {Artikal} from '../models/artikal';
import { Request, Response } from 'express';

export class ArtikalController{

    static async apiDohvatiArtikal(req: Request, res: Response){
        let id = req.params.id;
        let artikal = await Artikal.dohvatiArtikal(parseInt(id));
        res.json(artikal);
    }

}