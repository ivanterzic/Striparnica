import { Router } from 'express';
import {DobavljacController} from '../controllers/dobavljacController';

const router = Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    console.log('Request Type: ', req.method);
    console.log('Request URL: ', req.originalUrl);
    next();
}
    
    );


router.get('/ids', DobavljacController.apiDohvatiSveId);
router.get('/:id', DobavljacController.apiDohvatiDobavljaca);
router.get('/', DobavljacController.apiDohvatiSveDobavljace);
router.all('/', function (req, res) {
    res.send('Method not allowed');
}
);

export default router;