/**
 * @fileoverview 공통 유틸리티 함수 모음
 * 
 * 이 파일은 애플리케이션 전반에서 사용되는 공통 유틸리티 함수들을 제공합니다.
 * 데이터 검증, 포맷팅, 비동기 처리 등의 기능을 포함합니다.
 * 
 * 주요 기능:
 * - 데이터 타입 검증 함수들
 * - 문자열 및 숫자 포맷팅
 * - 비동기 처리 유틸리티 (재시도, 지연)
 * - 객체 및 JSON 처리 유틸리티
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * 문자열 유효성 검증 함수
 * 
 * @description
 * 주어진 값이 유효한 문자열인지 확인합니다.
 * 빈 문자열이나 공백만 있는 문자열은 유효하지 않은 것으로 간주합니다.
 * 
 * @param {any} value - 검증할 값
 * @returns {boolean} 유효한 문자열인지 여부
 * 
 * @example
 * isValidString("hello");     // true
 * isValidString("");          // false
 * isValidString("   ");       // false
 * isValidString(123);         // false
 */
export const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * 숫자 유효성 검증 함수
 * 
 * @description
 * 주어진 값이 유효한 숫자인지 확인합니다.
 * NaN이나 Infinity는 유효하지 않은 것으로 간주합니다.
 * 
 * @param {any} value - 검증할 값
 * @returns {boolean} 유효한 숫자인지 여부
 * 
 * @example
 * isValidNumber(123);        // true
 * isValidNumber(0);          // true
 * isValidNumber(NaN);        // false
 * isValidNumber(Infinity);   // false
 * isValidNumber("123");      // false
 */
export const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * 배열 유효성 검증 함수
 * 
 * @description
 * 주어진 값이 유효한 배열인지 확인합니다.
 * 빈 배열은 유효하지 않은 것으로 간주합니다.
 * 
 * @param {any} value - 검증할 값
 * @returns {boolean} 유효한 배열인지 여부
 * 
 * @example
 * isValidArray([1, 2, 3]);   // true
 * isValidArray([]);          // false
 * isValidArray("hello");     // false
 * isValidArray(null);        // false
 */
export const isValidArray = (value: any): value is any[] => {
  return Array.isArray(value) && value.length > 0;
};

/**
 * 객체 유효성 검증 함수
 * 
 * @description
 * 주어진 값이 유효한 객체인지 확인합니다.
 * null이나 배열은 유효하지 않은 것으로 간주합니다.
 * 
 * @param {any} value - 검증할 값
 * @returns {boolean} 유효한 객체인지 여부
 * 
 * @example
 * isValidObject({});         // true
 * isValidObject({a: 1});     // true
 * isValidObject(null);       // false
 * isValidObject([]);         // false
 * isValidObject("hello");    // false
 */
export const isValidObject = (value: any): value is object => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * 캐릭터 이름 정규화 함수
 * 
 * @description
 * 캐릭터 이름을 정규화하여 일관된 형태로 만듭니다.
 * 공백을 정리하고 HTML 태그를 제거합니다.
 * 
 * @param {string} name - 정규화할 캐릭터 이름
 * @returns {string} 정규화된 캐릭터 이름
 * 
 * @example
 * normalizeCharacterName("  홍길동  ");           // "홍길동"
 * normalizeCharacterName("홍길동    테스트");      // "홍길동 테스트"
 * normalizeCharacterName("<b>홍길동</b>");        // "홍길동"
 */
export const normalizeCharacterName = (name: string): string => {
  return name
    .trim()                    // 앞뒤 공백 제거
    .replace(/\s+/g, ' ')      // 연속된 공백을 하나로 변환
    .replace(/<[^>]*>/g, '');  // HTML 태그 제거
};

/**
 * 가격 포맷팅 함수
 * 
 * @description
 * 숫자를 한국식 숫자 포맷으로 변환합니다.
 * 천 단위마다 콤마를 추가합니다.
 * 
 * @param {number} price - 포맷팅할 가격
 * @returns {string} 포맷팅된 가격 문자열
 * 
 * @example
 * formatPrice(1000);      // "1,000"
 * formatPrice(1234567);   // "1,234,567"
 * formatPrice(0);         // "0"
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

/**
 * 날짜 포맷팅 함수
 * 
 * @description
 * Date 객체를 한국식 날짜/시간 형식으로 변환합니다.
 * YYYY-MM-DD HH:mm:ss 형식으로 포맷팅됩니다.
 * 
 * @param {Date} date - 포맷팅할 날짜
 * @returns {string} 포맷팅된 날짜 문자열
 * 
 * @example
 * formatDate(new Date()); // "2024-01-01 12:30:45"
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

// 아래 함수들은 현재 사용하지 않지만, 추후 사용할 수 있습니다.

/**
 * 비동기 지연 함수
 * 
 * @description
 * 지정한 시간(밀리초)만큼 실행을 지연시킵니다.
 * 비동기 작업에서 타이밍 제어가 필요할 때 사용합니다.
 * 
 * @param {number} ms - 지연할 시간 (밀리초)
 * @returns {Promise<void>} 지연 완료 시 resolve
 * 
 * @example
 * await delay(1000); // 1초 대기
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 비동기 함수 재시도 함수
 * 
 * @description
 * 비동기 함수가 실패할 경우 지정한 횟수만큼 재시도합니다.
 * 지수 백오프를 사용하여 재시도 간격을 점진적으로 늘립니다.
 * 
 * @template T - 함수의 반환 타입
 * @param {() => Promise<T>} fn - 재시도할 비동기 함수
 * @param {number} [maxAttempts=3] - 최대 재시도 횟수
 * @param {number} [delayMs=1000] - 기본 지연 시간 (밀리초)
 * @returns {Promise<T>} 함수 실행 결과
 * @throws {Error} 모든 재시도가 실패한 경우 마지막 에러 발생
 * 
 * @example
 * const result = await retry(async () => {
 *   return await fetchData();
 * }, 3, 1000);
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000,
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // 마지막 시도인 경우 에러 발생
      if (attempt === maxAttempts) {
        throw lastError;
      }

      // 지수 백오프: 시도할 때마다 지연 시간을 늘림
      await delay(delayMs * attempt);
    }
  }

  throw lastError!;
};

/**
 * 안전한 JSON 파싱 함수
 * 
 * @description
 * JSON 문자열을 안전하게 파싱합니다.
 * 파싱에 실패할 경우 null을 반환하여 에러를 방지합니다.
 * 
 * @template T - 파싱할 JSON의 타입
 * @param {string} json - 파싱할 JSON 문자열
 * @returns {T | null} 파싱된 객체 또는 null
 * 
 * @example
 * const data = safeJsonParse<User>('{"name": "홍길동"}');
 * if (data) {
 *   console.log(data.name); // "홍길동"
 * }
 */
export const safeJsonParse = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

/**
 * 깊은 복사 함수
 * 
 * @description
 * 객체를 깊은 복사하여 완전히 새로운 객체를 생성합니다.
 * 중첩된 객체와 배열도 모두 복사됩니다.
 * 
 * @template T - 복사할 객체의 타입
 * @param {T} obj - 복사할 객체
 * @returns {T} 복사된 새로운 객체
 * 
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const copied = deepClone(original);
 * copied.b.c = 3;
 * console.log(original.b.c); // 2 (원본은 변경되지 않음)
 */
export const deepClone = <T>(obj: T): T => {
  // null이나 원시 타입인 경우 그대로 반환
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Date 객체인 경우 새로운 Date 객체 생성
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  // 배열인 경우 각 요소를 재귀적으로 복사
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  // 일반 객체인 경우 각 속성을 재귀적으로 복사
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
};
