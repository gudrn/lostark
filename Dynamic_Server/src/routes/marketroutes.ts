/**
 * @fileoverview 마켓 라우터
 * 
 * 이 파일은 마켓 관련 API 엔드포인트를 정의하는 Express 라우터입니다.
 * 클라이언트의 마켓 데이터 요청을 적절한 컨트롤러로 라우팅합니다.
 * 
 * 주요 엔드포인트:
 * - GET /market/items - 마켓 전체 아이템 정보 조회
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import express, { Request, Response, NextFunction } from 'express';
import { fnallArrMarketItems } from '../controller/marketController';

// Express 라우터 인스턴스 생성
const router = express.Router();

/**
 * 마켓 전체 아이템 정보 조회 엔드포인트
 * 
 * @description
 * GET /market/items 경로로 마켓의 모든 아이템 정보를 조회합니다.
 * 보석, 유물, 강화재료 정보를 포함한 전체 마켓 데이터를 반환합니다.
 * 
 * @route GET /market/items
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - 다음 미들웨어 함수
 * @returns {void} JSON 형태의 마켓 데이터 응답
 * 
 * @example
 * GET /market/items
 * 
 * Response:
 * {
 *   "Gem": [...],
 *   "Relic": [...],
 *   "Force": [...]
 * }
 */
router.get('/items', (req: Request, res: Response, next: NextFunction) => {
  try {
    // 마켓 컨트롤러의 전체 아이템 조회 함수 호출
    fnallArrMarketItems(req, res, next);
  } catch (err) {
    // 예상치 못한 에러 발생 시 에러 미들웨어로 전달
    next(err);
  }
});

export default router;
