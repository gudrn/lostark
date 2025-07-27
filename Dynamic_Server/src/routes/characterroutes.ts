import express, { Request, Response, NextFunction } from 'express';
import { fnGetCharacters } from '../controller/characterController';

const router = express.Router();

// 쿼리 파라미터로 name을 받도록 라우터 수정 (TypeScript 적용)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: '캐릭터 이름이 필요합니다' });
    }

    const result = await fnGetCharacters(name);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
