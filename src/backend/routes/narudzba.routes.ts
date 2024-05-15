
import { Router } from 'express';
import {NarudzbaController} from '../controllers/narudzbaController';

const router = Router();

router.get('/kljucevi', NarudzbaController.apiDohvatSvihKljuceva); 
router.get('/statusi', NarudzbaController.apiDohvatiSveStatuseNarudzbi); 

router.get('/:id', NarudzbaController.apiDohvatiNarudzbu); 
router.get('/', NarudzbaController.apiDohvatiSveNarudzbe); 

router.post('/:id/urediartikle', NarudzbaController.apiUrediArtikleNarudzbe); 
router.post('/', NarudzbaController.apiKreirajNarudzbu); 

router.put('/:id', NarudzbaController.apiAzurirajNarudzbu); 

router.delete('/:id', NarudzbaController.apiObrisiNarudzbu); 

router.all('/', function (req, res) {
    res.send('Method not allowed');
});

export default router;