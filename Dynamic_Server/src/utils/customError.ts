/**
 * @fileoverview 커스텀 에러 클래스 정의
 * 
 * 이 파일은 애플리케이션에서 사용할 커스텀 에러 클래스들을 정의합니다.
 * 각 에러 타입별로 적절한 HTTP 상태 코드와 메시지를 제공합니다.
 * 
 * 주요 에러 타입:
 * - CustomError: 기본 커스텀 에러 클래스
 * - ApiError: API 관련 에러
 * - ValidationError: 입력 검증 에러
 * - CacheError: 캐시 관련 에러
 * - ExternalApiError: 외부 API 에러
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * 기본 커스텀 에러 클래스
 * 
 * @description
 * 애플리케이션에서 사용하는 모든 커스텀 에러의 기본 클래스입니다.
 * HTTP 상태 코드, 운영 에러 여부, 타임스탬프 등의 정보를 포함합니다.
 * 
 * @class CustomError
 * @extends Error
 */
export class CustomError extends Error {
  statusCode: number;      // HTTP 상태 코드
  isOperational: boolean;  // 운영 에러 여부 (true: 예상 가능한 에러, false: 시스템 에러)
  timestamp: Date;         // 에러 발생 시간

  /**
   * CustomError 생성자
   * 
   * @param {string} message - 에러 메시지
   * @param {number} [statusCode=500] - HTTP 상태 코드 (기본값: 500)
   * @param {boolean} [isOperational=true] - 운영 에러 여부 (기본값: true)
   */
  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    // 프로토타입 체인 설정 (instanceof 연산자 정상 작동을 위해)
    Object.setPrototypeOf(this, CustomError.prototype);

    // 스택 트레이스 캡처 (V8 엔진에서만 지원)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

/**
 * API 에러 클래스
 * 
 * @description
 * API 요청/응답 처리 중 발생하는 에러를 나타냅니다.
 * 주로 서버 내부 로직에서 발생하는 에러에 사용됩니다.
 * 
 * @class ApiError
 * @extends CustomError
 */
export class ApiError extends CustomError {
  /**
   * ApiError 생성자
   * 
   * @param {string} message - 에러 메시지
   * @param {number} [statusCode=500] - HTTP 상태 코드 (기본값: 500)
   */
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode, true);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * 검증 에러 클래스
 * 
 * @description
 * 입력 데이터 검증 실패 시 발생하는 에러를 나타냅니다.
 * 어떤 필드에서 검증이 실패했는지 정보를 포함합니다.
 * 
 * @class ValidationError
 * @extends CustomError
 */
export class ValidationError extends CustomError {
  field?: string;  // 검증 실패한 필드명

  /**
   * ValidationError 생성자
   * 
   * @param {string} message - 에러 메시지
   * @param {string} [field] - 검증 실패한 필드명 (선택적)
   */
  constructor(message: string, field?: string) {
    super(message, 400, true);  // 400 Bad Request
    this.field = field;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * 캐시 에러 클래스
 * 
 * @description
 * Redis 캐시 관련 작업에서 발생하는 에러를 나타냅니다.
 * 캐시 서버 연결 실패, 데이터 저장/조회 실패 등에 사용됩니다.
 * 
 * @class CacheError
 * @extends CustomError
 */
export class CacheError extends CustomError {
  /**
   * CacheError 생성자
   * 
   * @param {string} message - 에러 메시지
   */
  constructor(message: string) {
    super(message, 503, true);  // 503 Service Unavailable
    Object.setPrototypeOf(this, CacheError.prototype);
  }
}

/**
 * 외부 API 에러 클래스
 * 
 * @description
 * 외부 API 호출 중 발생하는 에러를 나타냅니다.
 * 로스트아크 API 호출 실패, 네트워크 오류 등에 사용됩니다.
 * 
 * @class ExternalApiError
 * @extends CustomError
 */
export class ExternalApiError extends CustomError {
  /**
   * ExternalApiError 생성자
   * 
   * @param {string} message - 에러 메시지
   * @param {number} [statusCode=502] - HTTP 상태 코드 (기본값: 502)
   */
  constructor(message: string, statusCode: number = 502) {
    super(message, statusCode, true);  // 502 Bad Gateway
    Object.setPrototypeOf(this, ExternalApiError.prototype);
  }
}
