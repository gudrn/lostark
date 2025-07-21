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
 
  return { arrTier4ItemList };
};

// 4티어어보석 아이템 데이터를 가져오는 함수
const arrMarketGemItemFromApi = async () => {
  let arrGemItems = [];
  for (const gemstone of gemstones) {
    const { name , levels } = gemstone;
    for(const level of levels){
      const gemName = `${level}레벨 ${name}`;
      const gemItems = await fnFetchEnGemstoneFromApi(gemName);
      if (Array.isArray(gemItems) && gemItems.Items && gemItems.Items.length > 0) {
        arrGemItems.push({
          name: gemItems.Items[0].Name,
          buyPrice: gemItems.Items[0].AuctionInfo.BuyPrice
        });
      }
    
  }
  return arrGemItems;
}