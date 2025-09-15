/**
 * @fileoverview 시간 관련 유틸리티 함수
 * 
 * 이 파일은 시간과 날짜를 처리하는 유틸리티 함수들을 제공합니다.
 * 한국 시간대(KST) 기준으로 시간을 처리합니다.
 * 
 * 주요 기능:
 * - 한국 시간대 기준 현재 시간 문자열 생성
 * - YYYY-MM-DD HH:mm:ss 형식으로 포맷팅
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * 한국 시간대(KST) 기준 현재 시간 문자열 반환 함수
 * 
 * @description
 * 현재 시간을 한국 시간대(KST)로 변환하여 문자열로 반환합니다.
 * YYYY-MM-DD HH:mm:ss 형식으로 포맷팅됩니다.
 * 
 * @returns {string} 한국 시간대 기준 현재 시간 문자열
 * 
 * @example
 * const now = getTodayStringKST();
 * console.log(now); // "2024-01-01 15:30:45"
 */
export function getTodayStringKST(): string {
  // 현재 시간을 Date 객체로 생성
  const now = new Date();

  // 한국 시간으로 변환 (UTC+9)
  const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  // 각 시간 구성 요소 추출 및 포맷팅
  const year = kstNow.getFullYear();                                    // 연도
  const month = String(kstNow.getMonth() + 1).padStart(2, '0');        // 월 (0부터 시작하므로 +1)
  const day = String(kstNow.getDate()).padStart(2, '0');               // 일
  const hour = String(kstNow.getHours()).padStart(2, '0');             // 시
  const minute = String(kstNow.getMinutes()).padStart(2, '0');         // 분
  const second = String(kstNow.getSeconds()).padStart(2, '0');         // 초

  // YYYY-MM-DD HH:mm:ss 형식으로 조합하여 반환
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
