import { Router } from 'express';
import {ArtikalController} from '../controllers/artikalController';

const router = Router();


router.get('/:id', ArtikalController.apiDohvatiArtikal);
router.get('/', ArtikalController.apiDohvatiSveArtikle);
router.all('/', function (req, res) {
    res.send('Method not allowed');
}
);

export default router;