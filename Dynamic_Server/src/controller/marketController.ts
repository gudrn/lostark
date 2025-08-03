import { Request, Response } from 'express';
import { getAllMarketItems } from '../service/marketService';
import { ApiError } from '../utils/customError';

// 마켓 전체 아이템을 조회하는 함수
// Express 라우터에서 (req, res) 형태로 호출되어야 함
export const fnallArrMarketItems = async (
  req: Request,
  res: Response,
  next: unknown,
): Promise<Response> => {
  try {
    // 함수 호출 및 응답 처리
    const data = await getAllMarketItems();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('allArrMarketItems에서 오류 발생:', error);
    throw new ApiError('서버 내부 오류가 발생했습니다.');
  }
};
