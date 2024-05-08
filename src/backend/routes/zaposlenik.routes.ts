import { Router } from 'express';
import { ZaposlenikController } from '../controllers/zaposlenikController';

const router = Router();

router.get('/:mbr', ZaposlenikController.apiDohvatiZaposlenika);
router.get('/email/:email', ZaposlenikController.apiDohvatiZaposlenikaPoEmailu);



export default router;