import { fnFetchCharacterFromApi } from '../model/characterModel.js';
import { characterCache } from '../redis/instances.js';
import { fnFormatCharacterData } from '../mappers/characterFormatter.js';

// 함수명에만 헝가리안 표기법 적용
export const fnGetCharacters = async (str_characterName, res) => {
  try {
    // 기본 방어: 캐릭터 이름이 없을 경우
    if (!str_characterName) {
      return res.status(400).json({ error: '캐릭터 이름이 제공되지 않았습니다.' });
    }

    // 1. 캐시에서 먼저 조회
    const cacheData = await characterCache.get(str_characterName);
    if (cacheData) {
      return res.json({ characterName: str_characterName, data: cacheData });
    }

    // 2. 외부 API에서 데이터 가져오기
    const result = await fnFetchCharacterFromApi(str_characterName);

    // 3. 존재하지 않거나 잘못된 응답
    if (!result || !result.ArmoryProfile) {
      return res.status(404).json({ error: '캐릭터를 찾을 수 없습니다.' });
    }

    // 4. 데이터 정제 및 캐시 저장
    const character = fnFormatCharacterData(result);
    await characterCache.set(str_characterName, character, 300); // 5분 TTL

    // 5. 최종 응답
    return res.json({ key: str_characterName, value: character });
  } catch (error) {
    throw new Error(error);
  }
};
