/**
 * @fileoverview 전역 에러 처리 미들웨어
 * 
 * 이 파일은 Express 애플리케이션에서 발생하는 모든 에러를 일관된 형식으로 처리합니다.
 * 커스텀 에러 타입별로 적절한 HTTP 상태 코드와 에러 메시지를 반환합니다.
 * 
 * 주요 기능:
 * - 커스텀 에러 타입별 분류 및 처리
 * - 에러 로깅 및 디버깅 정보 제공
 * - 일관된 에러 응답 형식 제공
 * - 프로덕션 환경에서 민감한 정보 보호
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { Request, Response, NextFunction } from 'express';
import {
  CustomError,
  ValidationError,
  ApiError,
  CacheError,
  ExternalApiError,
} from '../utils/customError';
import { getTodayStringKST } from '../utils/timeUtil';

/**
 * 에러 응답 인터페이스 정의
 * 
 * @description
 * 클라이언트에게 반환할 에러 응답의 구조를 정의합니다.
 * 모든 에러 응답은 success: false와 함께 상세한 에러 정보를 포함합니다.
 */
interface ErrorResponse {
  success: false;
  error: {
    message: string;        // 에러 메시지
    statusCode: number;     // HTTP 상태 코드
    timestamp: string;      // 에러 발생 시간 (KST)
    path: string;          // 요청 경로
    method: string;        // HTTP 메서드
    field?: string;        // 검증 에러 시 필드명 (선택적)
    type?: string;         // 에러 타입 (선택적)
  };
}

/**
 * 전역 에러 처리 미들웨어
 * 
 * @description
 * Express 애플리케이션에서 발생하는 모든 에러를 캐치하여 일관된 형식으로 처리합니다.
 * 커스텀 에러 타입에 따라 적절한 HTTP 상태 코드와 에러 메시지를 반환합니다.
 * 
 * @param {Error} err - 발생한 에러 객체
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - 다음 미들웨어 함수
 * @returns {void} JSON 형태의 에러 응답을 클라이언트에게 전송
 */
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // 에러 발생 시 상세 정보를 콘솔에 로깅
  console.error('[에러 발생]', {
    message: err.message,           // 에러 메시지
    stack: err.stack,              // 스택 트레이스
    url: req.url,                  // 요청 URL
    method: req.method,            // HTTP 메서드
    timestamp: getTodayStringKST(), // 에러 발생 시간
  });

  // 커스텀 에러인 경우 (애플리케이션에서 정의한 에러)
  if (err instanceof CustomError) {
    // 기본 에러 응답 구조 생성
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
        timestamp: getTodayStringKST(),
        path: req.path,
        method: req.method,
      },
    };

    // 검증 에러인 경우 필드 정보와 타입 추가
    if (err instanceof ValidationError) {
      errorResponse.error.field = err.field;
      errorResponse.error.type = 'VALIDATION_ERROR';
    }

    // API 에러인 경우 타입 추가
    if (err instanceof ApiError) {
      errorResponse.error.type = 'API_ERROR';
    }

    // 캐시 에러인 경우 타입 추가
    if (err instanceof CacheError) {
      errorResponse.error.type = 'CACHE_ERROR';
    }

    // 외부 API 에러인 경우 타입 추가
    if (err instanceof ExternalApiError) {
      errorResponse.error.type = 'EXTERNAL_API_ERROR';
    }

    // 커스텀 에러의 상태 코드로 응답
    return res.status(err.statusCode).json(errorResponse);
  }

  // 일반 에러인 경우 (예상치 못한 에러)
  const statusCode = 500; // 내부 서버 에러
  const message = process.env.NODE_ENV === 'production' 
    ? '서버 내부 오류가 발생했습니다'  // 프로덕션: 일반적인 메시지
    : err.message;                    // 개발: 실제 에러 메시지

  // 500 에러로 응답
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      timestamp: getTodayStringKST(),
      path: req.path,
      method: req.method,
      type: 'INTERNAL_SERVER_ERROR',
    },
  });
};
