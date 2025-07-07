import { fetchRelicMarketPage } from '../model/marketModel';
import { mapMarketItem } from '../mappers/marketFormater';

//유물 아이템 데이터를 가져오는 함수
const fetchMarketrelicsitemfromapi = async () => {
  try {
    // 1페이지부터 4페이지까지의 결과를 모두 가져옵니다.
    const allResults = [];
    for (let page = 1; page <= 4; page++) {
      const items = await fetchRelicMarketPage(page);
      allResults.push(...items);
    }
    // 아이템 변환
    const allItems = allResults.map(mapMarketItem);
    return allItems;
  } catch (error) {
    throw new Error(`❌ 아이템 정보 조회 실패: ${error.message}`);
  }
};
