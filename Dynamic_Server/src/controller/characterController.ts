import { getCharacter } from '../service/characterService';
import { IGetCharacterResult } from '../service/types/characterServiceType';
import { ApiError } from '../utils/customError';

// fnGetCharacters 함수 타입 정의
export const fnGetCharacters = async (str_characterName: string): Promise<IGetCharacterResult> => {
  try {
    if (!str_characterName) {
      return { error: '캐릭터 이름이 제공되지 않았습니다.' };
    }

    const characterResult = await getCharacter(str_characterName);
    if ((characterResult as any).error) return characterResult;

    return characterResult;
  } catch (error: any) {
    console.error('fnGetCharacters 오류:', error);
    throw new ApiError('서버 내부 오류가 발생했습니다.');
  }
};
