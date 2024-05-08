import { Router } from 'express';
const ArtikalController = require('../controllers/artikalController');

const router = Router();

router.get('/:id', ArtikalController.apiDohvatiArtikal);

export default router;