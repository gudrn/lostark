import { lostarkConfig, marketCode } from '../config/config';

// 유물 각인서 아이템 페이지를 가져오는 함수
export const fetchRelicMarketPage = async (page) => {
  const response = await fetch(`${lostarkConfig.lostarkapiurl}/markets/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
    },
    body: JSON.stringify({
      Sort: 'CURRENT_MIN_PRICE',
      CategoryCode: marketCode.relic,
      ItemGrade: '유물',
      PageNo: page,
      SortCondition: 'DESC',
    }),
  });
  const data = await response.json();
  return data.Items;
};

//강화 재료 아이템 페이지를 가져오는 함수
export const fetchenforceproductfromapi = async () => {
  const response = await fetch(`${lostarkConfig.lostarkapiurl}/markets/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
    },
  });
};
