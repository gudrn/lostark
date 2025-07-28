// 보석(작열/겁화 등) 마켓 아이템의 타입 정의
export interface GemItem {
  name: string;
  buyPrice: number;
}

// 유물(각인서 등) 마켓 아이템의 타입 정의
export interface RelicItem {
  itemName: string;
  itemCurrentMinPrice: number;
  // 필요한 필드 추가
  [key: string]: any;
}

// 강화 재료(재련 재료) 마켓 아이템의 타입 정의
export interface ForceItem {
  // 필요한 필드 정의
  [key: string]: any;
}

// 마켓 전체 아이템(보석, 유물, 강화재료) 배열 타입 정의
export interface AllMarketItems {
  Gem: GemItem[];
  Relic: RelicItem[];
  Force: ForceItem[];
}

// 마켓 전체 아이템 조회 결과 타입 정의 (캐시 여부 포함)
export interface GetAllMarketItemsResult {
  fromCache?: boolean;
  data?: AllMarketItems;
}
