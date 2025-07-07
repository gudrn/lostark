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
    this.client = client;
    this.prefix = prefix;
  }

  getKey(key) {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  async get(key) {
    try {
      const raw = await this.client.get(this.getKey(key));
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error(`[RedisCache:get] Error with key "${key}":`, error);
      return null;
    }
  }

  async set(key, value, ttl) {
    try {
      await this.client.set(this.getKey(key), JSON.stringify(value), { EX: ttl });
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
