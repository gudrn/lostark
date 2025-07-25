import express from 'express';
import { fnGetCharacters } from '../controller/characterController.js';

const router = express.Router();

// 쿼리 파라미터로 name을 받도록 라우터 수정
router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: '캐릭터 이름이 필요합니다' });

    const result = await fnGetCharacters(name);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
