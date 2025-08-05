import { getCharacter } from '../model/characterModel';
import { getAllMarketItems } from '../model/marketModel';
import { IGetCharacterResult } from '../model/types/characterServiceType';
import { AllMarketItems } from '../model/types/marketServiceTypes';
import { fnCalculatingRelics } from './calculators/relicCalculator';
import { fnCalculatingGem } from './calculators/gemCalculator';
import {
  ArmoryEngraving,
  ArmoryGem,
  ForceItem,
  GemItem,
  MarketRelicItem,
  ItemResult,
} from './type';

/**
 * 캐릭터 스펙 계산 메인 함수
 * @param str_characterName 캐릭터 이름
 * @returns 계산된 아이템 결과 배열 또는 null
 */
export const fnSpecCalculate = async (str_characterName: string): Promise<ItemResult[] | null> => {
  try {
    // 캐릭터 정보 조회
    const characterResult: IGetCharacterResult = await getCharacter(str_characterName);
    if (characterResult.error) return null;

    // 각인 정보 추출
    const armoryEngraving: ArmoryEngraving[] = characterResult.data?.armoryEngraving ?? [];
    const armoryGem: ArmoryGem[] = characterResult.data?.armoryGem ?? [];

    // 마켓 전체 아이템 정보 조회
    const marketResult: AllMarketItems = await getAllMarketItems();

    const forceItems: ForceItem[] = marketResult.Force;
    const relicItems: MarketRelicItem[] = marketResult.Relic;
    const gemItems: GemItem[] = marketResult.Gem;

    if (!relicItems || !forceItems || !gemItems) {
      return null;
    }

    // 각인 계산
    const resultRelics = fnCalculatingRelics(armoryEngraving, relicItems);

    // 보석 계산
    const resultGem = fnCalculatingGem(armoryGem, gemItems);

    // 결과 합치기
    const resultArr = resultRelics?.concat(resultGem ?? []);

    return resultArr ?? null;
  } catch (e) {
    console.error('fnSpecCalculate 오류:');
    console.error(e);
    return null;
  }
};
