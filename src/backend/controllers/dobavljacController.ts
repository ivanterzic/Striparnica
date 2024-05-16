import { dobavljac } from '@prisma/client';
import {Dobavljac} from '../models/dobavljac';
import { Request, Response } from 'express';

export class DobavljacController{

    static async apiDohvatiSveDobavljace(req: Request, res: Response){
        try {
            let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
            res.json(dobavljaci);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiDobavljaca(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let dobavljac = await Dobavljac.dohvatiDobavljaca(id);
            if (!dobavljac) {
                res.status(400).json({error: "Dobavljac nije pronađen."});
                return;
            }
            res.json(dobavljac);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveId(req: Request, res: Response){
        try {    
            let idovi = await Dobavljac.dohvatiSveDobavljace();
            res.json(idovi.map((dobavljac: dobavljac) => dobavljac.iddobavljaca));
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

}