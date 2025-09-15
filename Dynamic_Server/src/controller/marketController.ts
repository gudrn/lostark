/**
 * @fileoverview 마켓 컨트롤러
 * 
 * 이 파일은 마켓 관련 API 요청을 처리하는 컨트롤러입니다.
 * 클라이언트의 요청을 받아 적절한 모델 함수를 호출하고 응답을 반환합니다.
 * 
 * 주요 기능:
 * - 마켓 전체 아이템 정보 조회 API
 * - 요청/응답 데이터 검증 및 변환
 * - 에러 처리 및 적절한 HTTP 상태 코드 반환
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { Request, Response } from 'express';
import { getAllMarketItems } from '../model/marketModel';

/**
 * 마켓 전체 아이템 정보 조회 API 핸들러
 * 
 * @description
 * 클라이언트로부터 마켓 전체 아이템 정보 조회 요청을 받아 처리합니다.
 * Redis 캐시를 활용하여 성능을 최적화하고, 보석, 유물, 강화재료 정보를 모두 반환합니다.
 * 
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {unknown} next - 다음 미들웨어 함수 (사용하지 않음)
 * @returns {Promise<Response>} 마켓 전체 아이템 정보가 포함된 JSON 응답
 * 
 * @example
 * GET /market/items
 * 
 * Response:
 * {
 *   "Gem": [{ "name": "1레벨 작열 보석", "buyPrice": 10000 }],
 *   "Relic": [{ "name": "각인서", "price": 5000 }],
 *   "Force": [{ "name": "재련석", "price": 1000 }]
 * }
 */
export const fnallArrMarketItems = async (
  req: Request,
  res: Response,
  next: unknown,
): Promise<Response> => {
  // 마켓 모델에서 전체 아이템 정보 조회 (캐시 포함)
  const data = await getAllMarketItems();
  
  // 성공 응답 반환 (200 OK)
  return res.status(200).json(data);
};
