/**
 * @fileoverview 캐릭터 서비스
 * 
 * 이 파일은 로스트아크 공식 API를 통해 캐릭터 정보를 조회하는 서비스입니다.
 * 캐릭터의 상세 정보, 장비, 스킬 등의 데이터를 가져옵니다.
 * 
 * 주요 기능:
 * - 캐릭터 기본 정보 조회
 * - 캐릭터 장비 및 아이템 정보 조회
 * - API 에러 처리 및 예외 상황 관리
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { lostarkConfig } from '../config/config';
import { ExternalApiError } from '../utils/customError';

/**
 * 캐릭터 정보 인터페이스 정의
 * 
 * @description
 * 로스트아크 API에서 반환하는 캐릭터 정보의 기본 구조를 정의합니다.
 * 실제 사용 시에는 더 구체적인 타입으로 확장할 수 있습니다.
 * 
 * @interface CharacterInfo
 */
export interface CharacterInfo {
  [key: string]: any;
}

/**
 * 캐릭터 정보 조회 함수
 * 
 * @description
 * 로스트아크 아머리 API에서 특정 캐릭터의 상세 정보를 조회합니다.
 * 캐릭터 이름을 URL 인코딩하여 안전하게 전달하고, JSON 응답을 파싱합니다.
 * 
 * @param {string} strCharacterName - 조회할 캐릭터 이름
 * @returns {Promise<CharacterInfo>} 캐릭터 정보 객체
 * @throws {ExternalApiError} API 요청 실패 또는 JSON 파싱 실패 시 에러 발생
 * 
 * @example
 * const character = await fnFetchCharacterFromApi('홍길동');
 * console.log(character); // { CharacterName: "홍길동", ItemLevel: 1580, ... }
 */
export const fnFetchCharacterFromApi = async (strCharacterName: string): Promise<CharacterInfo> => {
  let response;
  
  try {
    // 로스트아크 아머리 API에 GET 요청
    // 캐릭터 이름을 URL 인코딩하여 특수문자 처리
    response = await fetch(
      `${lostarkConfig.lostarkapiurl}/armories/characters/${encodeURIComponent(strCharacterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      },
    );
  } catch (err) {
    // 네트워크 오류나 기타 예외 발생 시
    throw new ExternalApiError('캐릭터 정보 조회 중 알 수 없는 에러 발생', 500);
  }

  // HTTP 응답이 성공적이지 않은 경우
  if (!response.ok) {
    throw new ExternalApiError('캐릭터 정보 조회 실패', response.status);
  }

  try {
    // JSON 응답 파싱
    const data: CharacterInfo = await response.json();
    return data;
  } catch (err) {
    // JSON 파싱 실패 시 (유효하지 않은 JSON 응답)
    throw new ExternalApiError('캐릭터 정보 응답 파싱 실패 (유효하지 않은 JSON)', response.status);
  }
};
