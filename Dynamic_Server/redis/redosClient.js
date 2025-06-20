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

export async function characterGetCache(key) {
  const data = await redisClient.get(`character:${key}`);
  return data ? JSON.parse(data) : null;
}

export async function characterSetCache(key, value, ttl) {
  await redisClient.set(`character:${key}`, JSON.stringify(value), { EX: ttl });
}
