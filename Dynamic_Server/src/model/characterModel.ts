import { fnFetchCharacterFromApi } from '../service/characterService';
import { characterCache } from '../redis/instances';
import { fnFormatCharacterData } from '../mappers/characterFormatter';
import {
  IGetCharacterResult,
  IFormattedCharacter,
  ICharacterProfile,
} from './types/characterServiceType';

// 캐릭터 정보를 가져와 캐시하는 함수로 분리
export const getCharacter = async (characterName: string): Promise<IGetCharacterResult> => {
  // 1. 캐시에서 먼저 조회
  const cacheData = await characterCache.get<IFormattedCharacter>(characterName);

  if (cacheData) return { characterName: characterName, data: cacheData };

  // 2. 외부 API에서 데이터 가져오기
  const result: ICharacterProfile | null = await fnFetchCharacterFromApi(characterName);

  // 3. 존재하지 않거나 잘못된 응답
  if (!result || !result.ArmoryProfile) return { error: '캐릭터를 찾을 수 없습니다.' };

  // 4. 데이터 정제 및 캐시 저장
  const character: IFormattedCharacter = fnFormatCharacterData(result as any);
  await characterCache.set(characterName, character, 300); // 5분 TTL

  return { characterName: characterName, data: character };
};
