import { lostarkConfig } from '../config/config';
import { marketCode } from '../constants/data';

// 마켓 아이템 타입 정의 (간단 예시, 필요시 확장)
export interface MarketItem {
  [key: string]: any;
}

// 유물 각인서 아이템 페이지를 가져오는 함수
export const fnFetchRelicMarketPage = async (nPage: number): Promise<MarketItem[] | null> => {
  try {
    const oResponse = await fetch(`${lostarkConfig.lostarkapiurl}/markets/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        Sort: 'CURRENT_MIN_PRICE',
        CategoryCode: marketCode.relicAll,
        ItemGrade: '유물',
        PageNo: nPage,
        SortCondition: 'DESC',
      }),
    });
    const oData = await oResponse.json();
    return oData.Items;
  } catch (error) {
    console.error('fnFetchRelicMarketPage 에러:', error);
    //나중에 추가할 부분
    return null;
  }
};

// 강화 재료 아이템 페이지를 가져오는 함수
export const fnFetchEnTierForceProductFromApi = async (
  nTier: number,
  nPage: number
): Promise<MarketItem[] | null> => {
  try {
    const oResponse = await fetch(`${lostarkConfig.lostarkapiurl}/markets/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        Sort: 'GRADE',
        CategoryCode: marketCode.reinforce,
        ItemTier: nTier,
        PageNo: nPage,
        SortCondition: 'DESC',
      }),
    });
    const oData = await oResponse.json();
    return oData.Items;
  } catch (error) {
    console.error('fnFetchEnTierForceProductFromApi 에러:', error);
    return null;
  }
};

// 보석 아이템 페이지를 가져오는 함수
export const fnFetchEnGemstoneFromApi = async (
  sName: string,
  grade: string
): Promise<MarketItem[] | null> => {
  try {
    const oResponse = await fetch(`${lostarkConfig.lostarkapiurl}/auctions/items`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        ItemLevelMin: 0,
        ItemLevelMax: 0,
        ItemGradeQuality: null,
        ItemUpgradeLevel: null,
        ItemTradeAllowCount: null,
        Sort: 'BUY_PRICE',
        CategoryCode: marketCode.gem,
        ItemTier: 4,
        ItemGrade: `${grade}`,
        ItemName: sName,
        PageNo: 0,
        SortCondition: 'ASC',
      }),
    });
    const oData = await oResponse.json();

    return oData.Items;
  } catch (error) {
    console.error('fnFetchEnGemstoneFromApi 에러:', error);
    return null;
  }
};
