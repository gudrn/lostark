import { getCharacter } from '../service/characterService';
import { getAllMarketItems } from '../service/marketService';

export async function fnSpecCalanderFuntion(str_characterName) {
  try {
    if (!str_characterName) return { error: '캐릭터 이름이 제공되지 않았습니다.' };
  } catch (e) {}
}
