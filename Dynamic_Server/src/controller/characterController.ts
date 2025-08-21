import { getCharacter } from '../model/characterModel';
import { IGetCharacterResult } from '../model/types/characterServiceType';

/**
 * fnGetCharacters 함수
 * 캐릭터 이름을 받아 해당 캐릭터 정보를 반환합니다.
 * @param {string} str_characterName - 조회할 캐릭터 이름
 * @returns {Promise<IGetCharacterResult>} 캐릭터 정보 또는 에러 객체
 */
export const fnGetCharacters = async (str_characterName: string): Promise<IGetCharacterResult> => {
  if (!str_characterName) {
    return { error: '캐릭터 이름이 제공되지 않았습니다.' };
  }

  const characterResult = await getCharacter(str_characterName);
  if ((characterResult as any).error) return characterResult;

  return characterResult;
};
