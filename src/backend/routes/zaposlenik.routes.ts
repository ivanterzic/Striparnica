import { Router } from 'express';
import { ZaposlenikController } from '../controllers/zaposlenikController';

const router = Router();

router.get('/referentinabave', ZaposlenikController.apiDohvatiSveReferenteNabave);
router.get('/mbrreferentinabave', ZaposlenikController.apiDohvatiSveIdReferentataNabave);
router.get('/:mbr', ZaposlenikController.apiDohvatiZaposlenika);
router.get('/', ZaposlenikController.apiDohvatiSveZaposlenike);

router.all('/', function (req, res) {
    res.send('Method not allowed');
}
);


export default router;