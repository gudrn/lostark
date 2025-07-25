import express from 'express';
import { allArrMarketItems } from '../controller/marketController.js';

const router = express.Router();

router.get('/items', allArrMarketItems);

export default router;