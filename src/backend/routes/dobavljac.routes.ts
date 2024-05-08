import { Router } from 'express';
import {DobavljacController} from '../controllers/dobavljacController';

const router = Router();

router.get('/', DobavljacController.apiDohvatiSveDobavljace);
router.get('/:id', DobavljacController.apiDohvatiDobavljaca);
router.post('/', DobavljacController.apiDodajDobavljaca);
router.put('/:id', DobavljacController.apiAzurirajDobavljaca);

export default router;