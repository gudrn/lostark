import { getCharacter } from '../service/characterService.js';
// Express 라우터에서 (req, res) 형태로 사용하도록 수정
export const fnGetCharacters = async (str_characterName) => {
  try {
    // 캐릭터 이름이 없을 경우
    if (!str_characterName) return { error: '캐릭터 이름이 제공되지 않았습니다.' };

    const characterResult = await getCharacter(str_characterName);
    if (characterResult.error) return characterResult;

    // 5. 최종 응답
    return characterResult;
  } catch (error) {
    console.error('fnGetCharacters 오류:', error);
    return { error: '서버 내부 오류가 발생했습니다.' };
  }
};
