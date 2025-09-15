/**
 * @fileoverview 캐릭터 컨트롤러
 * 
 * 이 파일은 캐릭터 관련 API 요청을 처리하는 컨트롤러입니다.
 * 캐릭터 정보 조회 요청을 받아 적절한 모델 함수를 호출하고 응답을 반환합니다.
 * 
 * 주요 기능:
 * - 캐릭터 정보 조회 API
 * - 입력 데이터 검증 및 에러 처리
 * - 캐릭터 모델과의 연동
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { getCharacter } from '../model/characterModel';
import { IGetCharacterResult } from '../model/types/characterServiceType';

/**
 * 캐릭터 정보 조회 함수
 * 
 * @description
 * 캐릭터 이름을 받아 해당 캐릭터의 상세 정보를 조회합니다.
 * 입력 검증을 수행하고, 캐릭터 모델을 통해 실제 데이터를 조회합니다.
 * 
 * @param {string} str_characterName - 조회할 캐릭터 이름
 * @returns {Promise<IGetCharacterResult>} 캐릭터 정보 또는 에러 객체
 * 
 * @example
 * const result = await fnGetCharacters('홍길동');
 * if (result.error) {
 *   console.error('에러:', result.error);
 * } else {
 *   console.log('캐릭터 정보:', result);
 * }
 */
export const fnGetCharacters = async (str_characterName: string): Promise<IGetCharacterResult> => {
  // 캐릭터 이름 입력 검증
  if (!str_characterName) {
    return { error: '캐릭터 이름이 제공되지 않았습니다.' };
  }

  // 캐릭터 모델을 통해 실제 데이터 조회
  const characterResult = await getCharacter(str_characterName);
  
  // 조회 결과에 에러가 있는지 확인
  if ((characterResult as any).error) {
    return characterResult;
  }

  // 성공적으로 조회된 캐릭터 정보 반환
  return characterResult;
};
