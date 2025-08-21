import { Request, Response } from 'express';
import { getAllMarketItems } from '../model/marketModel';

/**
 * 마켓 전체 아이템 정보를 조회합니다.
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {unknown} next - 다음 미들웨어 함수
 * @returns {Promise<Response>} 마켓 전체 아이템 정보 JSON 응답
 */
export const fnallArrMarketItems = async (
  req: Request,
  res: Response,
  next: unknown,
): Promise<Response> => {
  const data = await getAllMarketItems();
  return res.status(200).json(data);
};
