/**
 * 마켓 관련 타입 정의
 */

export interface MarketRelicItem {
  itemName: string;
  itemCurrentMinPrice: number;
}

export interface ForceItem {
  name: string;
  icon: string;
  recentprice: number;
}

export interface GemItem {
  name: string;
  buyPrice: number;
}

export interface ItemResult {
  name: string;
  price: number;
} 