import { redisClient, redisCache } from './redisClient.js';

// RedisCache 인스턴스는 애플리케이션 전역에서 한 번만 생성
const characterCache = new redisCache(redisClient, 'character');
const marketCache = new redisCache(redisClient, 'market');

export {
  characterCache,
  marketCache
};