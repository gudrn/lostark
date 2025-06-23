import { createClient } from 'redis';
import { redisConfig } from '../config/config.js';

export const redisClient = createClient({
  url: `redis://${redisConfig.redisHost}:${redisConfig.redisPort}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  await redisClient.connect();
};

export async function getCache(key) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key, value, ttl) {
  await redisClient.set(key, JSON.stringify(value), { EX: ttl });
}

// 캐릭터 정보 전용 캐시에서 데이터를 가져오는 함수
// 'character:' 접두어를 붙여 key를 구성하여 Redis에서 검색
export async function characterGetCache(key) {
  const data = await redisClient.get(`character:${key}`);
  return data ? JSON.parse(data) : null;
}

// 캐릭터 정보를 캐시에 저장하는 함수
// 'character:' 접두어를 붙여 key를 구성하여 Redis에 JSON 형태로 저장
// TTL 설정으로 일정 시간 후 자동 만료 처리 (5분)
export async function characterSetCache(key, value, ttl) {
  await redisClient.set(`character:${key}`, JSON.stringify(value), { EX: ttl });
}
