import { redisClient, redisCache } from './redisClient';

// RedisCache 인스턴스는 애플리케이션 전역에서 한 번만 생성
const characterCache: redisCache = new redisCache(redisClient, 'character');
const marketCache: redisCache = new redisCache(redisClient, 'market');

export { characterCache, marketCache };
