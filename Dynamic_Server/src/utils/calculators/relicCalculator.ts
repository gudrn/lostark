import { exceptedRelics } from '../../constants/data';
import { ArmoryEngraving, MarketRelicItem, ItemResult } from '../type';

/**
 * 각인 계산 함수
 * @param armoryengravings 캐릭터의 각인 정보
 * @param marketrelicItems 마켓의 각인서 정보
 * @returns 계산된 각인서 결과 배열 또는 null
 */
export const fnCalculatingRelics = (
  armoryengravings: ArmoryEngraving[],
  marketrelicItems: MarketRelicItem[],
): ItemResult[] | null => {
  // 각인이 5개 미만이면 계산 불가
  if (!armoryengravings || armoryengravings.length < 5) {
    return null;
  }

  // 제외할 각인서 목록 확인
  const exceptedRelicsArr: string[] = Array.isArray(exceptedRelics)
    ? (exceptedRelics as unknown as string[])
    : [];

  // 제외할 각인서가 포함되어 있으면 계산하지 않음
  const hasExeptRelics = armoryengravings.some((value) => exceptedRelicsArr.includes(value.name));
  if (hasExeptRelics) return null;

  let result: ItemResult[] = [];

  // 각인별로 필요한 각인서 계산
  for (let engraving of armoryengravings) {
    for (let relic of marketrelicItems) {
      if (
        relic.itemName.includes(engraving.name) &&
        engraving.grade === '유물' &&
        engraving.level < 4
      ) {
        result.push({
          name: relic.itemName,
          price: relic.itemCurrentMinPrice * 5,
        });
        break;
      }
    }
  }

  // 결과가 없으면 null 반환
  if (result.length === 0) {
    return null;
  }

  return result;
};
