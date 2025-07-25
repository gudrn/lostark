import express from 'express';
import { fnGetCharacters } from '../controller/characterController.js';

const router = express.Router();

router.get('/:name', fnGetCharacters);

export default router;
