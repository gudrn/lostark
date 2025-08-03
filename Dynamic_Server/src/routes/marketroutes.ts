import express, { Request, Response, NextFunction } from 'express';
import { fnallArrMarketItems } from '../controller/marketController';

const router = express.Router();

router.get('/items', (req: Request, res: Response, next: NextFunction) => {
  try {
    fnallArrMarketItems(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;
