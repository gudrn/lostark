import { getCharacter, IGetCharacterResult } from '../service/characterService';

// fnGetCharacters 함수 타입 정의
export const fnGetCharacters = async (str_characterName: string): Promise<IGetCharacterResult> => {
  try {
    if (!str_characterName) {
      return { error: '캐릭터 이름이 제공되지 않았습니다.' };
    }

    const characterResult = await getCharacter(str_characterName);
    if ((characterResult as any).error) return characterResult;

    return characterResult;
  } catch (error) {
    console.error('fnGetCharacters 오류:', error);
    return { error: '서버 내부 오류가 발생했습니다.' };
  }
};
