import {Zaposlenik} from '../models/zaposlenik';
import { Request, Response } from 'express';

export class ZaposlenikController {

    static async apiDohvatiZaposlenika(req: Request, res: Response){
        try {
            let mbr = req.params.mbr;
            let zaposlenik = await Zaposlenik.dohvatiZaposlenika(mbr);
            if (!zaposlenik) {
                res.status(400).json({error: "Zaposlenik nije pronađen."});
                return;
            }
            res.json(zaposlenik);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveZaposlenike(req: Request, res: Response){
        try {
            let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
            res.json(zaposlenici);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveReferenteNabave(req: Request, res: Response){
        try {
            let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
            if (!referenti) {
                res.status(400).json({error: "Referenti nabave nisu pronađeni."});
                return;
            }
            res.json(referenti);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async apiDohvatiSveIdReferentataNabave(req: Request, res: Response){
        try {
            let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
            let referentiId = referenti.map(referent => referent.mbr);
            if (!referentiId) {
                res.status(400).json({error: "Referenti nabave nisu pronađeni."});
                return;
            }
            res.json(referentiId);
        }
        catch (err) {
            res.status(400).json({error: err});
        }
    }

}

