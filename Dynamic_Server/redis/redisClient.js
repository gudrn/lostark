import { createClient } from 'redis';
import { redisConfig } from '../config/config.js';

export const redisClient = createClient({
  url: `redis://${redisConfig.redisHost}:${redisConfig.redisPort}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  await redisClient.connect();
};

export class redisCache {
  constructor(client, prefix = '') {
    this.m_client = client;
    this.m_prefix = prefix;
  }

  getKey(key) {
    return this.m_prefix ? `${this.m_prefix}:${key}` : key;
  }

  async get(key) {
    try {
      const fullKey = this.getKey(key);
      const [raw, ttl] = await Promise.all([
        this.m_client.get(fullKey),
        this.m_client.ttl(fullKey),
      ]);
      if (!raw) return null;
      // ttl이 10초 이하이면 만료된 것으로 간주 (Redis에서 -2는 키 없음, -1은 만료 없음)
      if (ttl <= 10 || ttl === -2) {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error(`[RedisCache:get] Error with key "${key}":`, error);
      return null;
    }
  }

  async set(key, value, ttl) {
    try {
      await this.m_client.set(this.getKey(key), JSON.stringify(value), { EX: ttl });
    } catch (error) {
      console.error(`[RedisCache:set] Error with key "${key}":`, error);
    }
  }
}

//test용용
export async function getCache(key) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

//test용
export async function setCache(key, value, ttl) {
  await redisClient.set(key, JSON.stringify(value), { EX: ttl });
}
