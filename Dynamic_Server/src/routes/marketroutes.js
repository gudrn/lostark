import express from 'express';
import { fnallArrMarketItems } from '../controller/marketController.js';

const router = express.Router();

router.get('/items', fnallArrMarketItems);

export default router;
