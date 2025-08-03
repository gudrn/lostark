import express, { Request, Response, NextFunction } from 'express';
import { fnGetCharacters } from '../controller/characterController';
import { fnSpecCalculate } from '../utils/specsCalculate';
import { normalizeCharacterName, isValidString } from '../utils/helpers';
import { ValidationError } from '../utils/customError';
import { getTodayStringKST } from '../utils/timeUtil';

const router = express.Router();

/**
 * 캐릭터 정보 조회 API
 * GET /character?name={캐릭터명}
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  // 캐릭터 이름 검증
  if (!isValidString(name)) {
    throw new ValidationError('캐릭터 이름이 필요합니다', 'name');
  }

  // 캐릭터 이름 정규화
  const normalizedName = normalizeCharacterName(name);

  // 캐릭터 정보 조회
  const result = await fnGetCharacters(normalizedName);

  res.status(200).json({
    success: true,
    data: result,
    timestamp: getTodayStringKST(),
  });
});

/**
 * 캐릭터 스펙 계산 API
 * GET /character/specs?name={캐릭터명}
 * 아직 구현 안되어서 주석처리리
 */
/*
router.get('/specs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;

    // 캐릭터 이름 검증
    if (!isValidString(name)) {
      throw new ValidationError('캐릭터 이름이 필요합니다', 'name');
    }

    // 캐릭터 이름 정규화
    const normalizedName = normalizeCharacterName(name);

    // 스펙 계산 실행
    const result = await fnSpecCalculate(normalizedName);

    // 가격 순으로 정렬하여 반환
    const sortedResult = result?.sort((a, b) => a.price - b.price);

    res.status(200).json({
      success: true,
      data: sortedResult,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});
*/

export default router;
