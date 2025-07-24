import { marketCache } from '../redis/instances.js';
import {
  arrMarketRelicsItemFromApi,
  objMarketTierForceProductFromApi,
  arrMarketGemItemFromApi,
} from '../service/marketService.js';

// 마켓 전체 아이템을 조회하는 함수
export const allArrMarketItems = async (res) => {
  try {
    const cacheKey = 'allArrMarketItems';
    const cachedData = await marketCache.get(cacheKey);

    if (cachedData) {
      // 캐시된 데이터가 있으면 반환
      return res.status(200).json(JSON.parse(cachedData));
    }

    // 캐시가 없으면 API에서 데이터 조회
    const [gem, relic, force] = await Promise.all([
      arrMarketGemItemFromApi(),
      arrMarketRelicsItemFromApi(),
      objMarketTierForceProductFromApi(),
    ]);

    const result = { Gem: gem, Relic: relic, Force: force };

    // 1시간 동안 캐시에 저장
    await marketCache.set(cacheKey, JSON.stringify(result), 3600);

    return res.status(200).json(result);
  } catch (error) {
    console.error('allArrMarketItems에서 오류 발생:', error);
    return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};
