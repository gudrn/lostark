import express, { Request, Response, NextFunction } from 'express';
import { fnallArrMarketItems } from '../controller/marketController';

const router = express.Router();

// 타입스크립트 적용: req, res, next 타입 명시
router.get('/items', (req: Request, res: Response, next: NextFunction) => {
  fnallArrMarketItems(req, res, next);
});

export default router;
