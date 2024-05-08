const Dobavljac = require('../models/dobavljac');

module.exports = class DobavljacController{

    static async apiDohvatiSveDobavljace(req, res){
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        res.json(dobavljaci);
    }

    static async apiDohvatiDobavljaca(req, res){
        let id = req.params.id;
        let dobavljac = await Dobavljac.dohvatiDobavljaca(id);
        res.json(dobavljac);
    }

    static async apiDodajDobavljaca(req, res){
        let dobavljac = new Dobavljac(req.body.iddobavljaca, req.body.ime, req.body.adresa, req.body.email, req.body.imevlasnika, req.body.prezimevlasnika);
        let result = await Dobavljac.dodajDobavljaca(dobavljac);
        res.json(result);
    }

    static async apiAzurirajDobavljaca(req, res){
        let dobavljac = new Dobavljac(req.body.iddobavljaca, req.body.ime, req.body.adresa, req.body.email, req.body.imevlasnika, req.body.prezimevlasnika);
        let result = await Dobavljac.azurirajDobavljaca(dobavljac);
        res.json(result);
    }

    static async apiObrisiDobavljaca(req, res){
        let id = req.params.id;
        let result = await Dobavljac.obrisiDobavljaca(id);
        res.json(result);
    }

}