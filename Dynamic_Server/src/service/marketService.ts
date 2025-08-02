import {
  fnFetchRelicMarketPage,
  fnFetchEnTierForceProductFromApi,
  fnFetchEnGemstoneFromApi,
} from '../model/marketModel';
import { fnMapMarketItem, fnMapMarketforceItem } from '../mappers/marketFormater';
import { gemstones } from '../constants/data';
import { marketCache } from '../redis/instances';
import {
  RelicItem,
  GemItem,
  ForceItem,
  AllMarketItems,
  GetAllMarketItemsResult,
} from './types/marketServiceTypes';

// 유물 아이템(각인서 등) 마켓 데이터를 외부 API에서 1~4페이지까지 조회하여 정제된 배열로 반환
const arrMarketRelicsItemFromApi = async (): Promise<RelicItem[]> => {
  try {
    const arrAllItems = (
      await Promise.all(Array.from({ length: 4 }, (_, i) => fnFetchRelicMarketPage(i + 1)))
    ).flatMap((arrItems: any[] | null) => (arrItems ? arrItems.map(fnMapMarketItem) : []));
    return arrAllItems;
  } catch (oError: any) {
    throw new Error(`❌ 아이템 정보 조회 실패: ${oError.message}`);
  }
};

// 티어별 강화 재료(재련 재료) 마켓 데이터를 외부 API에서 1, 2페이지 조회 후 정제된 배열로 반환
const objMarketTierForceProductFromApi = async (): Promise<ForceItem[]> => {
  try {
    const arrAllItems = (
      await Promise.all([
        fnFetchEnTierForceProductFromApi(4, 1),
        fnFetchEnTierForceProductFromApi(4, 2),
      ])
    ).flatMap((arrItems: any[] | null) => (arrItems ? arrItems.map(fnMapMarketforceItem) : []));
    return arrAllItems;
  } catch (oError: any) {
    throw new Error(`❌ 강화 재료 정보 조회 실패: ${oError.message}`);
  }
};

// 보석(작열/겁화 등) 마켓 데이터를 gemstones 배열의 각 조합별로 외부 API에서 조회하여 이름, 가격만 추출한 배열로 반환
const arrMarketGemItemFromApi = async (): Promise<GemItem[]> => {
  const gemParams = gemstones.flatMap(({ name, levels, grade }) =>
    levels.map((level: number) => ({
      gemName: `${level}레벨 ${name}`,
      grade,
    })),
  );

  const gemResults = await Promise.all(
    gemParams.map(({ gemName, grade }) => fnFetchEnGemstoneFromApi(gemName, grade)),
  );

  const arrGemItems: GemItem[] = gemResults
    .map((gemItems: any) => {
      if (Array.isArray(gemItems) && gemItems[0]) {
        return {
          name: gemItems[0].Name,
          buyPrice: gemItems[0].AuctionInfo.BuyPrice,
        };
      }
      return null;
    })
    .filter(Boolean) as GemItem[];

  return arrGemItems;
};

// 마켓 전체 아이템을 캐시 및 조회하는 함수
export const getAllMarketItems = async (): Promise<AllMarketItems> => {
  const cacheKey = 'allArrMarketItems';
  const cachedData = await marketCache.get<AllMarketItems>(cacheKey);

  if (cachedData) {
    // 캐시된 데이터가 있으면 반환
    return cachedData;
  }

  // 캐시가 없으면 API에서 데이터 조회
  const [gem, relic, force] = await Promise.all([
    arrMarketGemItemFromApi(),
    arrMarketRelicsItemFromApi(),
    objMarketTierForceProductFromApi(),
  ]);

  const result: AllMarketItems = { Gem: gem, Relic: relic, Force: force };

  // 1시간 동안 캐시에 저장
  await marketCache.set(cacheKey, result, 3600);

  return result;
};
