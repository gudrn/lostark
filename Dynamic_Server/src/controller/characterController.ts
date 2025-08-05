import { getCharacter } from '../service/characterModel';
import { IGetCharacterResult } from '../model/types/characterServiceType';
import { ApiError } from '../utils/customError';

// fnGetCharacters 함수 타입 정의
export const fnGetCharacters = async (str_characterName: string): Promise<IGetCharacterResult> => {
  if (!str_characterName) {
    return { error: '캐릭터 이름이 제공되지 않았습니다.' };
  }

  const characterResult = await getCharacter(str_characterName);
  if ((characterResult as any).error) return characterResult;

  return characterResult;
};
