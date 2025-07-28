// 유물(각인서 등) 마켓 아이템 타입
export interface MarketItem {
  Name: string;
  Icon: string;
  CurrentMinPrice: number;
  [key: string]: any;
}

// 강화 재료(재련 재료) 마켓 아이템 타입
export interface MarketForceItem {
  Id: number;
  Name: string;
  Icon: string;
  RecentPrice: number;
  [key: string]: any;
}

// 보석 마켓 데이터 타입
export interface MarketGemAuctionInfo {
  BuyPrice: number;
  [key: string]: any;
}
export interface MarketGemItem {
  Name: string;
  [key: string]: any;
}
export interface MarketGemData {
  Items: MarketGemItem[];
  AuctionInfo: MarketGemAuctionInfo;
  [key: string]: any;
}
