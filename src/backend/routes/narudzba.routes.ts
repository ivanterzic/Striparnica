
import { Router } from 'express';
import {NarudzbaController} from '../controllers/narudzbaController';

const router = Router();

router.get('/', NarudzbaController.apiDohvatiSveNarudzbe);
router.get('/:id', NarudzbaController.apiDohvatiNarudzbu);
router.get('/artikli/:id', NarudzbaController.apiDohvatiArtikleNarudzbe);

export default router;