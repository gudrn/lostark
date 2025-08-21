import { MarketForceItem, MarketGemItem, MarketItem } from './types/marketTypes';

/**
 * 유물(각인서 등) 마켓 아이템을 매핑합니다.
 * @param {MarketItem} item - 마켓 아이템 객체
 * @returns {Object} { itemName, itemIcon, itemCurrentMinPrice }
 */
export const fnMapMarketItem = (item: MarketItem) => ({
  itemName: item.Name,
  itemIcon: item.Icon,
  itemCurrentMinPrice: item.CurrentMinPrice,
});

/**
 * 강화 재료(재련 재료) 마켓 아이템을 매핑합니다.
 * @param {MarketForceItem} item - 강화 재료 아이템 객체
 * @returns {Object} { name, icon, recentprice }
 */
export const fnMapMarketforceItem = (item: MarketForceItem) => ({
  name: item.Name,
  icon: item.Icon,
  recentprice: item.RecentPrice,
});

/**
 * 보석 아이템을 매핑합니다.
 * @param {{ Items: MarketGemItem[] }} data - 보석 아이템 데이터
 * @returns {Object} { Name, BuyPrice }
 */
export const fnMapMarketgem = (data: { Items: MarketGemItem[] }) => ({
  Name: data.Items[0].Name,
  BuyPrice: (data.Items[0] as any).AuctionInfo?.BuyPrice ?? 0,
});
