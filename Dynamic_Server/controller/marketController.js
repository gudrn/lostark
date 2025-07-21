import { marketCache } from '../redis/instances.js';
import {
  arrMarketRelicsItemFromApi,
  objMarketTierForceProductFromApi,
  arrMarketGemItemFromApi,
} from '../service/marketService.js';

export const allArrMarketItems = async (res) => {
  try {
    // 캐시에 데이터가 있는지 확인
    const cacheKey = 'allArrMarketItems';
    const cachedData = await marketCache.get(cacheKey);

    if (cachedData) {
      // 캐시된 데이터가 있으면 바로 반환
      return res.status(200).json(JSON.parse(cachedData));
    }

    // 캐시가 없으면 새로 데이터 조회
    const [gem, relic, force] = await Promise.all([
      arrMarketGemItemFromApi(),
      arrMarketRelicsItemFromApi(),
      objMarketTierForceProductFromApi(),
    ]);

    const result = { Gem: gem, Relic: relic, force: force };

    await marketCache.set(cacheKey, JSON.stringify(result), 6000);

    return res.status(200).json(result);
  } catch (error) {
    console.error('allArrMarketItems에서 오류 발생:', error);
    return res.status(500).json({ message: '서버 내부 오류' });
  }
};
