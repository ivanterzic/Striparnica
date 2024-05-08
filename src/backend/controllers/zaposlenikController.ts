const Zaposlenik = require('../models/zaposlenik');

module.exports = class ZaposlenikController{

    apiDohvatiZaposlenika(req, res){
        let mbr = req.params.mbr;
        let zaposlenik = Zaposlenik.dohvatiZaposlenika(mbr);
        res.json(zaposlenik);
    }

    apiDohvatiZaposlenikaPoEmailu(req, res){
        let email = req.params.email;
        let zaposlenik = Zaposlenik.dohvatiZaposlenikaPoEmailu(email);
        res.json(zaposlenik);
    }

    apiDohvatiZaposlenikaPoOibu(req, res){
        let oib = req.params.oib;
        let zaposlenik = Zaposlenik.dohvatiZaposlenikaPoOibu(oib);
        res.json(zaposlenik);
    }

    apiDodajZaposlenika(req, res){
        let zaposlenik = new Zaposlenik(req.body.mbr, req.body.ime, req.body.prezime, req.body.email, req.body.oib, req.body.datumrodenja, req.body.spol, req.body.telefon, req.body.lozinka, req.body.datumzaposlenja, req.body.datumotpustanja, req.body.iduloge);
        let result = Zaposlenik.dodajZaposlenika(zaposlenik);
        res.json(result);
    }
}

