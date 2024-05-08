
import { Router } from 'express';
import {NarudzbaController} from '../controllers/narudzbaController';
import { narudzbaVallidation } from '../vallidation/NarudzbaVallidation';

const router = Router();

router.get('/stranikljucevi', NarudzbaController.apiDohvatSvihStranihKljuceva); //testirano
router.get('/statusi', NarudzbaController.apiDohvatiSveStatuseNarudzbi); //testirano

router.get('/next/:id', NarudzbaController.apiDohvatiNarudzbuSPrvimVecimID); //testirano
router.get('/previous/:id', NarudzbaController.apiDohvatiNarudzbuSPrvimManjimID); //testirano

router.get('/:id', NarudzbaController.apiDohvatiNarudzbu); //testirano
router.get('/', NarudzbaController.apiDohvatiSveNarudzbe); //testirano

router.post('/:id/urediartikle', NarudzbaController.apiUrediArtikleNarudzbe); //testirano
router.post('/', narudzbaVallidation, NarudzbaController.apiKreirajNarudzbu); //testirano

router.put('/:id', narudzbaVallidation, NarudzbaController.apiAzurirajNarudzbu); //testirano

router.delete('/:id', NarudzbaController.apiObrisiNarudzbu); //testirano

router.all('/', function (req, res) {
    res.send('Method not allowed');
});


export default router;