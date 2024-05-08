
import { Router } from 'express';
import {NarudzbaController} from '../controllers/narudzbaController';

const router = Router();

router.get('/stranikljucevi', NarudzbaController.apiDohvatSvihStranihKljuceva);
router.get('/statusi', NarudzbaController.apiDohvatiSveStatuseNarudzbi);

router.get('/next/:id', NarudzbaController.apiDohvatiNarudzbuSPrvimVecimID);
router.get('/previous/:id', NarudzbaController.apiDohvatiNarudzbuSPrvimManjimID);

router.get('/:id', NarudzbaController.apiDohvatiNarudzbu);
router.get('/', NarudzbaController.apiDohvatiSveNarudzbe);

router.post('/', NarudzbaController.apiKreirajNarudzbu);

router.all('/', function (req, res) {
    res.send('Method not allowed');
});


export default router;