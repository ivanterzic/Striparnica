import { parse } from 'path';
import {Dobavljac} from '../models/dobavljac';
import { Request, Response } from 'express';

export class DobavljacController{

    static async apiDohvatiSveDobavljace(req: Request, res: Response){
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        res.json(dobavljaci);
    }

    static async apiDohvatiDobavljaca(req: Request, res: Response){
        let id = req.params.id;
        let dobavljac = await Dobavljac.dohvatiDobavljaca(parseInt(id));
        res.json(dobavljac);
    }

    static async apiDodajDobavljaca(req: Request, res: Response){
        let dobavljac = new Dobavljac(req.body.iddobavljaca, req.body.ime, req.body.adresa, req.body.email, req.body.imevlasnika, req.body.prezimevlasnika);
        let result = await Dobavljac.dodajDobavljaca(dobavljac);
        res.json(result);
    }

    static async apiAzurirajDobavljaca(req: Request, res: Response){
        let dobavljac = new Dobavljac(req.body.iddobavljaca, req.body.ime, req.body.adresa, req.body.email, req.body.imevlasnika, req.body.prezimevlasnika);
        let result = await Dobavljac.azurirajDobavljaca(dobavljac);
        res.json(result);
    }

}