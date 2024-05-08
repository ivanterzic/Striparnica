
import { Router } from 'express';
const NarudzbaController = require('../controllers/narudzbaController');

const router = Router();

router.get('/', NarudzbaController.apiDohvatiSveNarudzbe);
router.get('/:id', NarudzbaController.apiDohvatiNarudzbu);
router.get('/artikli/:id', NarudzbaController.apiDohvatiArtikleNarudzbe);
router.post('/', NarudzbaController.apiDodajNarudzbu);


export default router;