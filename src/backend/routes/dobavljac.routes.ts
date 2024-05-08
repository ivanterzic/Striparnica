import { Router } from 'express';
import {DobavljacController} from '../controllers/dobavljacController';

const router = Router();

router.get('/ids', DobavljacController.apiDohvatiSveId);
router.get('/:id', DobavljacController.apiDohvatiDobavljaca);
router.get('/', DobavljacController.apiDohvatiSveDobavljace);
router.all('/', function (req, res) {
    res.send('Method not allowed');
}
);

export default router;