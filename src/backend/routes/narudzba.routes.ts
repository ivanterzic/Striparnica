
import { Router } from 'express';
import {NarudzbaController} from '../controllers/narudzbaController';
import { narudzbaVallidation } from '../vallidation/NarudzbaVallidation';

const router = Router();

router.get('/kljucevi', NarudzbaController.apiDohvatSvihKljuceva); 
router.get('/statusi', NarudzbaController.apiDohvatiSveStatuseNarudzbi); 

router.get('/:id', NarudzbaController.apiDohvatiNarudzbu); 
router.get('/', NarudzbaController.apiDohvatiSveNarudzbe); 

router.post('/:id/urediartikle', NarudzbaController.apiUrediArtikleNarudzbe); 
router.post('/', narudzbaVallidation, NarudzbaController.apiKreirajNarudzbu); 

router.put('/:id', narudzbaVallidation, NarudzbaController.apiAzurirajNarudzbu); 

router.delete('/:id', NarudzbaController.apiObrisiNarudzbu); 

router.all('/', function (req, res) {
    res.send('Method not allowed');
});

export default router;