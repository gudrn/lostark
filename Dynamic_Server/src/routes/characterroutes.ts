/**
 * @fileoverview 캐릭터 라우터
 * 
 * 이 파일은 캐릭터 관련 API 엔드포인트를 정의하는 Express 라우터입니다.
 * 캐릭터 정보 조회 및 스펙 계산 요청을 적절한 컨트롤러로 라우팅합니다.
 * 
 * 주요 엔드포인트:
 * - GET /character?name={캐릭터명} - 캐릭터 정보 조회
 * - GET /character/specs?name={캐릭터명} - 캐릭터 스펙 계산 (구현 예정)
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import express, { Request, Response, NextFunction } from 'express';
import { fnGetCharacters } from '../controller/characterController';
import { fnSpecCalculate } from '../utils/specsCalculate';
import { normalizeCharacterName, isValidString } from '../utils/helpers';
import { ValidationError } from '../utils/customError';
import { getTodayStringKST } from '../utils/timeUtil';

// Express 라우터 인스턴스 생성
const router = express.Router();

/**
 * 캐릭터 정보 조회 API 엔드포인트
 * 
 * @description
 * GET /character?name={캐릭터명} 경로로 특정 캐릭터의 상세 정보를 조회합니다.
 * 캐릭터 이름을 검증하고 정규화한 후, 캐릭터 컨트롤러를 통해 데이터를 조회합니다.
 * 
 * @route GET /character
 * @param {Request} req - Express 요청 객체 (query.name에 캐릭터명 포함)
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - 다음 미들웨어 함수
 * @returns {void} JSON 형태의 캐릭터 정보 응답
 * 
 * @example
 * GET /character?name=홍길동
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": { ... },
 *   "timestamp": "2024-01-01T00:00:00.000Z"
 * }
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  // 캐릭터 이름 입력 검증
  if (!isValidString(name)) {
    throw new ValidationError('캐릭터 이름이 필요합니다', 'name');
  }

  // 캐릭터 이름 정규화 (공백 제거, 대소문자 통일 등)
  const normalizedName = normalizeCharacterName(name);

  // 캐릭터 컨트롤러를 통해 캐릭터 정보 조회
  const result = await fnGetCharacters(normalizedName);
  
  // 성공 응답 반환
  res.status(200).json({
    success: true,
    data: result.data,
    timestamp: getTodayStringKST(),
  });
});

/**
 * 캐릭터 스펙 계산 API 엔드포인트 (구현 예정)
 * 
 * @description
 * GET /character/specs?name={캐릭터명} 경로로 캐릭터의 스펙을 계산합니다.
 * 현재는 구현이 완료되지 않아 주석 처리되어 있습니다.
 * 
 * @route GET /character/specs
 * @param {Request} req - Express 요청 객체 (query.name에 캐릭터명 포함)
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - 다음 미들웨어 함수
 * @returns {void} JSON 형태의 스펙 계산 결과 응답
 * 
 * @todo 스펙 계산 로직 구현 완료 후 주석 해제
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
