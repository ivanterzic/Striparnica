import { Request, Response } from 'express';
import { Dobavljac } from '../models/dobavljac';
import { Zaposlenik } from '../models/zaposlenik';
import { Narudzba } from '../models/narudzba';


export async function narudzbaVallidation(req: Request, res: Response, next: Function) {
    let dobavljaci = (await Dobavljac.dohvatiSveDobavljace()).map((d) => d.iddobavljaca);
    let referenti = (await Zaposlenik.dohvatiSveReferenteNabave()).map((z) => z.mbr);
    let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();

    if (!req.body.datumstvaranja || !req.body.status || !req.body.mbrreferenta || !req.body.iddobavljaca) {
        res.status(400).json({ error: 'Nedostaju obavezna polja.' });
        return;
    }
    let iddobavljaca = parseInt(req.body.iddobavljaca);
    let datumstvaranja = new Date(req.body.datumstvaranja);
    let datumzaprimanja = new Date(req.body.datumzaprimanja);
    if (isNaN(datumstvaranja.getTime())) {
        res.status(400).json({ error: 'Datum stvaranja nije validan datum.' });
        return;
    }
    if (datumstvaranja.getTime() > Date.now()) {
        res.status(400).json({ error: 'Datum stvaranja ne može biti u budućnosti.' });
        return;
    }
    if (!req.body.datumzaprimanja || req.body.datumzaprimanja === "" || req.body.datumzaprimanja === null) {
        req.body.datumzaprimanja = null;
    } else if (isNaN(datumzaprimanja.getTime())) {
        res.status(400).json({ error: 'Datum zaprimanja nije validan datum.' });
        return;
    }
    else if (datumzaprimanja.getTime() < datumstvaranja.getTime()) {
        res.status(400).json({ error: 'Datum zaprimanja mora biti nakon datuma stvaranja.' });
        return;
    }
    if (req.body.datumzaprimanja){
        req.body.datumzaprimanja += "T00:00:00.000Z";
    }
    req.body.datumstvaranja += "T00:00:00.000Z";
    if (!referenti.includes(req.body.mbrreferenta)) {
        res.status(400).json({ error: 'Mbr referenta nije među referentima nabave.' });
        return;
    }
    if (!dobavljaci.includes(iddobavljaca)) {
        res.status(400).json({ error: 'Id dobavljača nije među validnim dobavljačima.' });
        return;
    }
    if (!statusi.includes(req.body.status)) {
        res.status(400).json({ error: 'Status nije među validnim statusima narudžbe.' });
        return;
    }

    next();
}