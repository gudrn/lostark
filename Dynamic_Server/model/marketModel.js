import { lostarkConfig } from '../config/config';
import { marketCode } from '../constants/data';

// 유물 각인서 아이템 페이지를 가져오는 함수 (헝가리식)
export const fnFetchRelicMarketPage = async (nPage) => {
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
};

// 강화 재료 아이템 페이지를 가져오는 함수 (헝가리식)
export const fnFetchEnTierForceProductFromApi = async (nTier, nPage) => {
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
};

// 보석 아이템 페이지를 가져오는 함수 (헝가리식)
export const fnFetchEnGemstoneFromApi = async (tier,name) => {
  const oResponse = await fetch(`${lostarkConfig.lostarkapiurl}/actions/items`, {
    method: 'POST',
    headers: {
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
      ItemTier: tier,
      ItemGrade: '',
      ItemName: name,
      PageNo: 0,
      SortCondition: 'ASC',
    }),
  });
  const oData = await oResponse.json();
  return oData.Items;
}
