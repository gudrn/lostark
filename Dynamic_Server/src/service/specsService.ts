import { getCharacter } from './characterService';
import { getAllMarketItems } from './marketService';
import { exceptedRelics } from '../constants/data';
import { IGetCharacterResult, IFormattedCharacter } from './types/characterServiceType';
import { GetAllMarketItemsResult, AllMarketItems } from './types/marketServiceTypes';

// 타입 정의
interface ArmoryEngraving {
  name: string;
  grade: string;
  level: number;
}

interface MarketRelicItem {
  itemName: string;
  itemCurrentMinPrice: number;
}

interface RelicResult {
  itemname: string;
  price: number;
}

interface FnSpecCalanderResult {
  error?: string;
  data?: RelicResult[];
}

// str_characterName을 받아 해당 캐릭터의 정보와 마켓 아이템 정보를 조합하여 반환
export const fnSpecCalander = async (str_characterName: string): Promise<FnSpecCalanderResult> => {
  try {
    // 캐릭터 정보 조회
    const characterResult: IGetCharacterResult = await getCharacter(str_characterName);
    if (characterResult.error) return { error: characterResult.error };

    // armoryEngraving 정보가 있는지 확인
    const armoryEngraving: ArmoryEngraving[] | undefined = characterResult.data?.armoryEngraving;
    if (!armoryEngraving) {
      return { error: '캐릭터 각인 정보를 찾을 수 없습니다.' };
    }

    // 마켓 전체 아이템 정보 조회
    const marketResult: GetAllMarketItemsResult | AllMarketItems = await getAllMarketItems();
    // 마켓 데이터에서 Relic 정보 추출
    let relicItems: MarketRelicItem[] | undefined;
    if ('data' in marketResult && marketResult.data) {
      relicItems = marketResult.data.Relic;
    } else if ('Relic' in marketResult) {
      relicItems = (marketResult as AllMarketItems).Relic;
    }

    if (!relicItems) {
      return { error: '마켓 유물 각인서 정보를 찾을 수 없습니다.' };
    }

    // 각인 계산
    const resultRelics = fnCalculatingRelics(armoryEngraving, relicItems);

    if (resultRelics == null) {
      return {
        error: '각인 중 유효각인이 아닌 것이 있거나 각인이 정상적으로 착용되어 있지 않습니다.',
      };
    }
    // 캐릭터 정보와 마켓 정보를 함께 반환 (예시로 resultRelics만 반환)
    return { data: resultRelics };
  } catch (e) {
    console.error('fnSpecCalander 오류:');
    console.error(e);
    return { error: '서버 내부 오류가 발생했습니다.' };
  }
};

const fnCalculatingRelics = (
  armoryengravings: ArmoryEngraving[],
  marketrelicItems: MarketRelicItem[],
): RelicResult[] | null => {
  if (!armoryengravings || armoryengravings.length < 5) {
    return null;
  }
  // exceptedRelics의 타입이 string[]이 아닐 경우를 대비하여 any로 변환
  const exceptedRelicsArr: string[] = Array.isArray(exceptedRelics)
    ? (exceptedRelics as unknown as string[])
    : [];
  const hasExeptRelics = armoryengravings.some((value) => exceptedRelicsArr.includes(value.name));
  if (hasExeptRelics) return null;

  let result: RelicResult[] = [];
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
  // console.log(result); // 필요시 주석 해제
  if (result.length == 0) {
    return null;
  }

  return result;
};
