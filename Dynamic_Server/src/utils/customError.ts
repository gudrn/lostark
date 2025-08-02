/**
 * 커스텀 에러 클래스
 */
export class CustomError extends Error {
  statusCode: number;
  isOperational: boolean;
  timestamp: Date;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    // 스택 트레이스 설정
    Object.setPrototypeOf(this, CustomError.prototype);

    // 에러 스택 트레이스 캡처
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

/**
 * API 에러 클래스
 */
export class ApiError extends CustomError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode, true);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * 검증 에러 클래스
 */
export class ValidationError extends CustomError {
  field?: string;

  constructor(message: string, field?: string) {
    super(message, 400, true);
    this.field = field;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * 캐시 에러 클래스
 */
export class CacheError extends CustomError {
  constructor(message: string) {
    super(message, 503, true);
    Object.setPrototypeOf(this, CacheError.prototype);
  }
}

/**
 * 외부 API 에러 클래스
 */
export class ExternalApiError extends CustomError {
  constructor(message: string, statusCode: number = 502) {
    super(message, statusCode, true);
    Object.setPrototypeOf(this, ExternalApiError.prototype);
  }
}
