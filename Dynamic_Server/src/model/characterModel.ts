/**
 * @fileoverview 캐릭터 데이터 모델
 * 
 * 이 파일은 캐릭터 관련 데이터를 관리하는 모델 레이어입니다.
 * 캐릭터 정보를 조회하고 캐시를 활용하여 성능을 최적화합니다.
 * 
 * 주요 기능:
 * - 캐릭터 정보 조회 및 캐싱
 * - 캐릭터 데이터 정제 및 포맷팅
 * - 캐시 TTL 관리 (5분)
 * - 에러 처리 및 예외 상황 관리
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { fnFetchCharacterFromApi } from '../service/characterService';
import { characterCache } from '../redis/instances';
import { fnFormatCharacterData } from '../mappers/characterFormatter';
import {
  IGetCharacterResult,
  IFormattedCharacter,
  ICharacterProfile,
} from './types/characterServiceType';

/**
 * 캐릭터 정보 조회 및 캐시 관리 함수
 * 
 * @description
 * 캐릭터 이름을 받아 캐릭터의 상세 정보를 조회합니다.
 * Redis 캐시를 우선 확인하고, 캐시가 없으면 외부 API에서 조회합니다.
 * 조회된 데이터는 정제하여 캐시에 저장하고 반환합니다.
 * 
 * @param {string} characterName - 조회할 캐릭터 이름
 * @returns {Promise<IGetCharacterResult>} 캐릭터 정보 또는 에러 객체
 * 
 * @example
 * const result = await getCharacter('홍길동');
 * if (result.error) {
 *   console.error('에러:', result.error);
 * } else {
 *   console.log('캐릭터 정보:', result.data);
 * }
 */
export const getCharacter = async (characterName: string): Promise<IGetCharacterResult> => {
  // 1. Redis 캐시에서 먼저 조회 (성능 최적화)
  const cacheData = await characterCache.get<IFormattedCharacter>(characterName);

  // 캐시에 데이터가 있으면 즉시 반환
  if (cacheData) {
    return { characterName: characterName, data: cacheData };
  }

  // 2. 캐시가 없으면 외부 API에서 데이터 조회
  const result: ICharacterProfile | null = await fnFetchCharacterFromApi(characterName);

  // 3. 캐릭터가 존재하지 않거나 잘못된 응답인 경우
  if (!result || !result.ArmoryProfile) {
    return { error: '캐릭터를 찾을 수 없습니다.' };
  }

  // 4. API 응답 데이터를 정제된 형태로 변환
  const character: IFormattedCharacter = fnFormatCharacterData(result as any);
  
  // 5. 정제된 데이터를 캐시에 저장 (5분 TTL)
  await characterCache.set(characterName, character, 300);

  // 6. 캐릭터 정보 반환
  return { characterName: characterName, data: character };
};
