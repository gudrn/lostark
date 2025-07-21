import { fnFetchRelicMarketPage, fnFetchEnTierForceProductFromApi, fnFetchEnGemstoneFromApi } from '../model/marketModel';
import { mapMarketItem, mapMarketforceItem } from '../mappers/marketFormater';
import { gemstones } from '../constants/data';

// 유물 아이템 데이터를 가져오는 함수
const arrMarketRelicsItemFromApi = async () => {
  try {
    // 1페이지부터 4페이지까지의 결과를 모두 가져옵니다.
    const arrAllResults = [];
    for (let nPage = 1; nPage <= 4; nPage++) {
      const arrItems = await fnFetchRelicMarketPage(nPage);
      arrAllResults.push(...arrItems);
    }
    // 아이템 변환
    const arrAllItems = arrAllResults.map(fnMapMarketItem);
    return arrAllItems;
  } catch (oError) {
    throw new Error(`❌ 아이템 정보 조회 실패: ${oError.message}`);
  }
};

// 티어 재료 아이템 데이터를 가져오는 함수
const objMarketTierForceProductFromApi = async () => {
  const arrTier4Items = await fnFetchEnTierForceProductFromApi(4, 1);
  const arrTier4ItemList = fnMapMarketForceItem(arrTier4Items);
  const arrTier3Items = await fnFetchEnTierForceProductFromApi(3, 1);
  const arrTier3ItemList = fnMapMarketForceItem(arrTier3Items);
  for (let nPage = 2; nPage <= 3; nPage++) {
    const arrItems = await fnFetchEnTierForceProductFromApi(3, nPage);
    arrTier3ItemList.push(...fnMapMarketForceItem(arrItems));
  }

  return { arrTier4ItemList, arrTier3ItemList };
};

// 보석(젬) 아이템 데이터를 가져오는 함수
const arrMarketGemItemFromApi = async () => {
  let arrGemItems = [];
  for (const gemstone of gemstones) {
    const { tier, name } = gemstone;
    // 각 보석에 대해 API에서 데이터 가져오기
    const gemItems = await fnFetchEnGemstoneFromApi(tier, name);
    if (Array.isArray(gemItems)) {
      arrGemItems.push(...gemItems);
    }
  }
  return arrGemItems;
}