const Artikal = require('../models/artikal');

module.exports = class ArtikalController{

    static async apiDohvatiArtikal(req, res){
        let id = req.params.id;
        let artikal = await Artikal.dohvatiArtikal(id);
        res.json(artikal);
    }

}