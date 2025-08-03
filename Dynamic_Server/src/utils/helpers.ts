/**
 * 공통 유틸리티 함수들
 */

/**
 * 문자열이 유효한지 확인
 * @param value 검사할 값
 * @returns 유효한 문자열인지 여부
 */
export const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * 숫자가 유효한지 확인
 * @param value 검사할 값
 * @returns 유효한 숫자인지 여부
 */
export const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * 배열이 유효한지 확인
 * @param value 검사할 값
 * @returns 유효한 배열인지 여부
 */
export const isValidArray = (value: any): value is any[] => {
  return Array.isArray(value) && value.length > 0;
};

/**
 * 객체가 유효한지 확인
 * @param value 검사할 값
 * @returns 유효한 객체인지 여부
 */
export const isValidObject = (value: any): value is object => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * 캐릭터 이름 정규화
 * @param name 캐릭터 이름
 * @returns 정규화된 캐릭터 이름
 */
export const normalizeCharacterName = (name: string): string => {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/<[^>]*>/g, '');
};

/**
 * 가격을 포맷팅
 * @param price 가격
 * @returns 포맷팅된 가격 문자열
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

/**
 * 날짜를 포맷팅
 * @param date 날짜
 * @returns 포맷팅된 날짜 문자열
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

// 이 아래부터는 현재 사용하지 않음. 나중에 사용할 수 있음.
/**
 * 지연 함수
 * @param ms 지연할 시간 (밀리초)
 * @returns Promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 재시도 함수
 * @param fn 실행할 함수
 * @param maxAttempts 최대 시도 횟수
 * @param delayMs 재시도 간격 (밀리초)
 * @returns Promise
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

      if (attempt === maxAttempts) {
        throw lastError;
      }

      await delay(delayMs * attempt); // 지수 백오프
    }
  }

  throw lastError!;
};

/**
 * 안전한 JSON 파싱
 * @param json JSON 문자열
 * @returns 파싱된 객체 또는 null
 */
export const safeJsonParse = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

/**
 * 객체의 깊은 복사
 * @param obj 복사할 객체
 * @returns 복사된 객체
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
};
