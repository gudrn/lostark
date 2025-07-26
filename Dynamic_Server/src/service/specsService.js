import { getCharacter } from './characterService.js';
import { getAllMarketItems } from './marketService.js';
import { exceptedRelics } from '../constants/data.js';

// str_characterName을 받아 해당 캐릭터의 정보와 마켓 아이템 정보를 조합하여 반환
export const fnSpecCalander = async (str_characterName) => {
  try {
    // 캐릭터 정보 조회
    const characterResult = await getCharacter(str_characterName);
    if (characterResult.error) return characterResult;

    // 마켓 전체 아이템 정보 조회
    const marketResult = await getAllMarketItems();
    // 각인 계산
    const resultRelics = fnCalculatingRelics(
      characterResult.data.armoryEngraving,
      marketResult.data.Relic,
    );

    if (resultRelics == null) {
      return {
        error: '각인 중 유효각인이 아닌 것이 있거나 각인이 정상적으로 착용되어 있지 않습니다.',
      };
    }
    // 예시: 캐릭터 정보와 마켓 정보를 함께 반환
  } catch (e) {
    console.error('fnSpecCalander 오류:');
    console.error(e);
    return { error: '서버 내부 오류가 발생했습니다.' };
  }
};

const fnCalculatingRelics = (armoryengravings, marketrelicItems) => {
  if (armoryengravings.length < 5) {
    return null;
  }
  const hasExeptRelics = armoryengravings.some((value) => exceptedRelics.includes(value));
  if (hasExeptRelics) return null;

  let result = [];
  for (let engraving of armoryengravings) {
    for (let relic of marketrelicItems) {
      if (
        relic.itemName.includes(engraving.name) &&
        engraving.grade === '유물' &&
        engraving.level < 4
      ) {
        result.push({ itemname: relic.itemName, price: relic.itemCurrentMinPrice * 5 });
        break;
      }
    }
  }
  console.log(result);
  if (result.length == 0) {
    return null;
  }

  return result;
};
