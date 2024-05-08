import {Zaposlenik} from '../models/zaposlenik';
import { Request, Response } from 'express';

export class ZaposlenikController {

    static async apiDohvatiZaposlenika(req: Request, res: Response){
        let mbr = req.params.mbr;
        let zaposlenik = Zaposlenik.dohvatiZaposlenika(mbr);
        res.json(zaposlenik);
    }

    static async apiDohvatiZaposlenikaPoEmailu(req: Request, res: Response){
        let email = req.params.email;
        let zaposlenik = Zaposlenik.dohvatiZaposlenikaPoEmailu(email);
        res.json(zaposlenik);
    }

    static async apiDohvatiZaposlenikaPoOibu(req: Request, res: Response){
        let oib = req.params.oib;
        let zaposlenik = Zaposlenik.dohvatiZaposlenikaPoOibu(oib);
        res.json(zaposlenik);
    }

}

