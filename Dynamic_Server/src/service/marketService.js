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

// 티어 재료 아이템 데이터를 2페이지까지 가져오는 함수
export const objMarketTierForceProductFromApi = async () => {
  let arrAllResults = [];
  for (let nPage = 1; nPage <= 2; nPage++) {
    const arrItems = await fnFetchEnTierForceProductFromApi(4, nPage);
    arrAllResults.push(...arrItems);
  }
  const arrAllItems = arrAllResults.map(fnMapMarketforceItem);
  return arrAllItems;
};

// 4티어어보석 아이템 데이터를 가져오는 함수
export const arrMarketGemItemFromApi = async () => {
  let arrGemItems = [];
  for (const gemstone of gemstones) {
    const { name, levels, grade } = gemstone;
    for (const level of levels) {
      const gemName = `${level}레벨 ${name}`;
      const gemItems = await fnFetchEnGemstoneFromApi(gemName, grade);
      if (Array.isArray(gemItems)) {
        arrGemItems.push({
          name: gemItems[0].Name,
          buyPrice: gemItems[0].AuctionInfo.BuyPrice,
        });
      }
    }
  }

  return arrGemItems;
};
