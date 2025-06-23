import { fetchCharacterFromAPI, formatCharacterData } from '../services/characterService.js';
import { errorHandler } from '../utils/errorHandler.js';
import { characterCache } from '../redis/cacheInstances.js';

export const getCharacters = async (characterName, res) => {
  try {
    // 기본 방어: 캐릭터 이름이 없을 경우
    if (!characterName) {
      return res.status(400).json({ error: '캐릭터 이름이 제공되지 않았습니다.' });
    }

    // 1. 캐시에서 먼저 조회
    const cacheData = await characterCache.get(characterName);
    if (cacheData) {
      return res.json({ key: characterName, value: cacheData });
    }

    // 2. 외부 API에서 데이터 가져오기
    const result = await fetchCharacterFromAPI(characterName);

    // 3. 존재하지 않거나 잘못된 응답
    if (!result || !result.ArmoryProfile) {
      return res.status(404).json({ error: '캐릭터를 찾을 수 없습니다.' });
    }

    // 4. 데이터 정제 및 캐시 저장
    const character = formatCharacterData(result);
    await characterCache.set(characterName, character, 300); // 5분 TTL

    // 5. 최종 응답
    return res.json({ key: characterName, value: character });
  } catch (error) {
    // 에러 미들웨어에서 처리 (원본 error 전달)
    return errorHandler(error, res);
  }
};
