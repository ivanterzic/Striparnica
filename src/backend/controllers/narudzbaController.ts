const Narudzba = require('../models/narudzbaModel');

module.exports = class NarudzbaController{

    static async apiDohvatiSveNarudzbe(req, res){
        let narudzbe = await Narudzba.dohvatiSveNarudzbe();
        res.json(narudzbe);
    }

    static async apiDohvatiNarudzbu(req, res){
        let id = req.params.id;
        let narudzba = await Narudzba.dohvatiNarudzbu(id);
        res.json(narudzba);
    }

    static async apiDohvatiArtikleNarudzbe(req, res){
        let id = req.params.id;
        let artikli = await Narudzba.dohvatiArtikleNarudzbe(id);
        res.json(artikli);
    }

    static async apiDodajNarudzbu(req, res){
        let narudzba = new Narudzba(req.body.idnarudzbe, req.body.datumstvaranja, req.body.datumzaprimanja, req.body.status, req.body.iddobavljaca, req.body.mbrreferenta, req.body.artikli);
        let result = await Narudzba.dodajNarudzbu(narudzba);
        res.json(result);
    }

}