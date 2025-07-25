import {
  fnFetchRelicMarketPage,
  fnFetchEnTierForceProductFromApi,
  fnFetchEnGemstoneFromApi,
} from '../model/marketModel.js';
import { fnMapMarketItem, fnMapMarketforceItem } from '../mappers/marketFormater.js';
import { gemstones } from '../constants/data.js';

// 유물 아이템 데이터를 가져오는 함수
export const arrMarketRelicsItemFromApi = async () => {
  try {
    // 1페이지부터 4페이지까지의 결과를 flatMap으로 변환
    const arrAllItems = (
      await Promise.all(Array.from({ length: 4 }, (_, i) => fnFetchRelicMarketPage(i + 1)))
    ).flatMap((arrItems) => arrItems.map(fnMapMarketItem));
    return arrAllItems;
  } catch (oError) {
    throw new Error(`❌ 아이템 정보 조회 실패: ${oError.message}`);
  }
};

export const objMarketTierForceProductFromApi = async () => {
  // 1, 2페이지에 대해 각각 API 호출 후 결과를 평탄화(flatten)
  const arrAllItems = (
    await Promise.all([
      fnFetchEnTierForceProductFromApi(4, 1),
      fnFetchEnTierForceProductFromApi(4, 2),
    ])
  )
    .flat()
    .map(fnMapMarketforceItem);
  return arrAllItems;
};

// 4티어 어보석 아이템 데이터를 가져오는 함수 (병렬 최적화)
export const arrMarketGemItemFromApi = async () => {
  // gemstones 배열의 각 보석/레벨 조합에 대해 요청할 파라미터 생성
  const gemParams = gemstones.flatMap(({ name, levels, grade }) =>
    levels.map((level) => ({
      gemName: `${level}레벨 ${name}`,
      grade,
    })),
  );

  // 모든 요청을 병렬로 처리
  const gemResults = await Promise.all(
    gemParams.map(({ gemName, grade }) => fnFetchEnGemstoneFromApi(gemName, grade)),
  );

  // 결과를 정제하여 반환
  const arrGemItems = gemResults
    .map((gemItems) => {
      if (Array.isArray(gemItems) && gemItems[0]) {
        return {
          name: gemItems[0].Name,
          buyPrice: gemItems[0].AuctionInfo.BuyPrice,
        };
      }
      return null;
    })
    .filter(Boolean);

  return arrGemItems;
};
