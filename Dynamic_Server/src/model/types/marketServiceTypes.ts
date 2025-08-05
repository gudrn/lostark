/**
 * 보석(작열/겁화 등) 마켓 아이템의 타입 정의
 */
export interface GemItem {
  name: string;
  buyPrice: number;
  sellPrice?: number;
  icon?: string;
  grade?: string;
  level?: number;
}

/**
 * 유물(각인서 등) 마켓 아이템의 타입 정의
 */
export interface RelicItem {
  itemName: string;
  itemCurrentMinPrice: number;
  itemIcon?: string;
  itemGrade?: string;
  itemLevel?: number;
  [key: string]: any;
}

/**
 * 강화 재료(재련 재료) 마켓 아이템의 타입 정의
 */
export interface ForceItem {
  name: string;
  icon: string;
  recentprice: number;
  grade?: string;
  level?: number;
  type?: string;
}

/**
 * 마켓 전체 아이템(보석, 유물, 강화재료) 배열 타입 정의
 */
export interface AllMarketItems {
  Gem: GemItem[];
  Relic: RelicItem[];
  Force: ForceItem[];
}

/**
 * 마켓 전체 아이템 조회 결과 타입 정의 (캐시 여부 포함)
 */
export interface GetAllMarketItemsResult {
  fromCache?: boolean;
  data?: AllMarketItems;
  error?: string;
  success?: boolean;
  timestamp?: number;
}
