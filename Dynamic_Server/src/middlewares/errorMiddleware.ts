import { Request, Response, NextFunction } from 'express';
import {
  CustomError,
  ValidationError,
  ApiError,
  CacheError,
  ExternalApiError,
} from '../utils/customError';

/**
 * 에러 응답 타입 정의
 */
interface ErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    field?: string;
    type?: string;
  };
}

/**
 * 에러 미들웨어
 * 모든 에러를 일관된 형식으로 처리
 */
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // 에러 로깅
  console.error('[에러 발생]', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // 커스텀 에러인 경우
  if (err instanceof CustomError) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
        timestamp: err.timestamp.toISOString(),
        path: req.path,
        method: req.method,
      },
    };

    // 검증 에러인 경우 필드 정보 추가
    if (err instanceof ValidationError) {
      errorResponse.error.field = err.field;
      errorResponse.error.type = 'VALIDATION_ERROR';
    }

    // API 에러인 경우
    if (err instanceof ApiError) {
      errorResponse.error.type = 'API_ERROR';
    }

    // 캐시 에러인 경우
    if (err instanceof CacheError) {
      errorResponse.error.type = 'CACHE_ERROR';
    }

    // 외부 API 에러인 경우
    if (err instanceof ExternalApiError) {
      errorResponse.error.type = 'EXTERNAL_API_ERROR';
    }

    return res.status(err.statusCode).json(errorResponse);
  }

  // 일반 에러인 경우
  const statusCode = 500;
  const message =
    process.env.NODE_ENV === 'production' ? '서버 내부 오류가 발생했습니다' : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      type: 'INTERNAL_SERVER_ERROR',
    },
  });
};
