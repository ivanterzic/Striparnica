import { Request, Response } from 'express';
import { Artikal } from '../models/artikal';
import { Narudzba } from '../models/narudzba';


export async function artiklVallidation(req: Request, res: Response, next: Function) {
    let artikli = (await Artikal.dohvatiSveArtikle()).map((a) => a.idartikla);
    let idNarudzba = (await Narudzba.dohvatiSveNarudzbe() as { idnarudzbe: number }[]).map((n) => n.idnarudzbe.toString());
    let id = (req.params.id);
    if (!req.body.stavkenarudzbe) {
        res.status(400).json({ error: 'Nedostaju stavke narudzbe' });
        return;
    }
    if (!id || !idNarudzba.includes(id)) {
        res.status(400).json({ error: 'Id narudzbe nije medju narudzbama' });
        return;
    }
    let stavke;
    try {
        stavke = typeof req.body.stavkenarudzbe === 'string' ? JSON.parse(req.body.stavkenarudzbe) : req.body.stavkenarudzbe;
    }
    catch (err) {
        res.status(400).json({ error: 'Stavke narudzbe nisu validne' });
        return;
    }
    for (let stavka of stavke) {
        if (!stavka.idartikla || !stavka.kolicina) {
            res.status(400).json({ error: 'Nedostaju obavezna polja u stavci narudzbe' });
            return;
        }
        if (typeof stavka.kolicina != 'number') {
            res.status(400).json({ error: 'Kolicina mora biti broj' });
            return;
        }
        if (stavka.kolicina <= 0) {
            res.status(400).json({ error: 'Kolicina mora biti pozitivan broj' });
            return;
        }
        if (!artikli.includes(stavka.idartikla)) {
            res.status(400).json({ error: 'Id artikla nije medju artiklima' });
            return;
        }
    }

    next();
}