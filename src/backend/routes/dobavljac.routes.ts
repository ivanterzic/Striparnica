import { Router } from 'express';
const DobavljacController = require('../controllers/dobavljacController');

const router = Router();

router.get('/', DobavljacController.apiDohvatiSveDobavljace);
router.get('/:id', DobavljacController.apiDohvatiDobavljaca);
router.post('/', DobavljacController.apiDodajDobavljaca);
router.put('/:id', DobavljacController.apiAzurirajDobavljaca);
router.delete('/:id', DobavljacController.apiObrisiDobavljaca);

export default router;