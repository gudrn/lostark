import { createClient, RedisClientType } from 'redis';
import { redisConfig } from '../config/config';
import { CustomError } from '../utils/customError';

export const redisClient: RedisClientType = createClient({
  url: `redis://${redisConfig.redisHost}:${redisConfig.redisPort}`,
});

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

redisClient.on('error', (err: Error) => {
  throw new CustomError(`❌ Redis 클라이언트 에러`, 500);
});

export class redisCache {
  private m_client: RedisClientType;
  private m_prefix: string;

  constructor(client: RedisClientType, prefix: string = '') {
    this.m_client = client;
    this.m_prefix = prefix;
  }

  private getKey(key: string): string {
    return this.m_prefix ? `${this.m_prefix}:${key}` : key;
  }

  public async get<T = any>(key: string): Promise<T | null> {
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
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error(`[RedisCache:get] Error with key "${key}":`, error);
      return null;
    }
  }

  public async set(key: string, value: any, ttl: number): Promise<void> {
    try {
      await this.m_client.set(this.getKey(key), JSON.stringify(value), { EX: ttl });
    } catch (error) {
      console.error(`[RedisCache:set] Error with key "${key}":`, error);
    }
  }
}
