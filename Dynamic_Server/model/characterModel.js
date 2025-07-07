import { lostarkConfig } from '../config/config.js';
import {
  mapStats,
  mapEquipmentDetail,
  mapAvatars,
  mapSkills,
  mapEngraving,
  mapCardDetail,
  mapCardEffects,
  mapGems,
  mapPassive,
} from '../mappers/characterFormatter.js';

// 캐릭터 정보를 API에서 가져오는 함수
export async function fetchCharacterFromApi(characterName) {
  try {
    const response = await fetch(
      `${lostarkConfig.lostarkapiurl}/armories/characters/${encodeURIComponent(characterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`❌ 캐릭터 정보 조회 실패: ${error.message}`);
  }
}
