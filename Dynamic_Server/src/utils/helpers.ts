/**
 * 공통 유틸리티 함수들
 */

/**
 * 문자열이 유효한지 확인합니다.
 * @param {any} value
 * @returns {boolean}
 */
export const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * 숫자가 유효한지 확인합니다.
 * @param {any} value
 * @returns {boolean}
 */
export const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * 배열이 유효한지 확인합니다.
 * @param {any} value
 * @returns {boolean}
 */
export const isValidArray = (value: any): value is any[] => {
  return Array.isArray(value) && value.length > 0;
};

/**
 * 객체가 유효한지 확인합니다.
 * @param {any} value
 * @returns {boolean}
 */
export const isValidObject = (value: any): value is object => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * 캐릭터 이름을 정규화합니다.
 * @param {string} name
 * @returns {string}
 */
export const normalizeCharacterName = (name: string): string => {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/<[^>]*>/g, '');
};

/**
 * 가격을 포맷팅합니다.
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

/**
 * 날짜를 포맷팅합니다.
 * @param {Date} date
 * @returns {string}
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
 * 지정한 시간(ms)만큼 지연시킵니다.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 비동기 함수를 재시도합니다.
 * @param {() => Promise<T>} fn
 * @param {number} [maxAttempts=3]
 * @param {number} [delayMs=1000]
 * @returns {Promise<T>}
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
 * 안전하게 JSON 문자열을 파싱합니다.
 * @param {string} json
 * @returns {T | null}
 */
export const safeJsonParse = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

/**
 * 객체를 깊은 복사합니다.
 * @param {T} obj
 * @returns {T}
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
