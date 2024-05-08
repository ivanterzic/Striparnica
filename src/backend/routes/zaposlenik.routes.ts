import { Router } from 'express';
const ZaposlenikController = require('../controllers/zaposlenikController');

const router = Router();

router.get('/:mbr', ZaposlenikController.apiDohvatiZaposlenika);
router.get('/email/:email', ZaposlenikController.apiDohvatiZaposlenikaPoEmailu);
router.get('/oib/:oib', ZaposlenikController.apiDohvatiZaposlenikaPoOibu);
router.post('/', ZaposlenikController.apiDodajZaposlenika);


export default router;