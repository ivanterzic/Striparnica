import { Router } from 'express';
import {ArtikalController} from '../controllers/artikalController';

const router = Router();

router.get('/:id', ArtikalController.apiDohvatiArtikal);

export default router;