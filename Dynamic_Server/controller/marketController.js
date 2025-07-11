import { marketCache } from '../redis/instances';
import { Marketrelicsitemfromapi, MarketTierforceproductfromapi } from '../service/marketService';

//유물 아이템 정제된 상태인 데이터를 가져오는 함수
export const getRelicItems = async (res) => {
  const cacheData = await marketCache.get('relicitems');
  if (cacheData) {
    return res.status(200).json(cacheData);
  }
  const marketItem = await Marketrelicsitemfromapi();
  await marketCache.set('relicitems', marketItem, 3600);
  res.status(200).json(marketItem);
};
