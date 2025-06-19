import { lostarkConfig } from '../config/config.js';

export const getMarket = async () => {
  const response = await fetch(`${lostarkConfig.lostarkapiurl}/market/items`, {
    headers: {
      Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
    },
  });

  const data = await response.json();
  return data;
};
