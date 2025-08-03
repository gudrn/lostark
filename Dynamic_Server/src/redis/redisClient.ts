import { createClient, RedisClientType } from 'redis';
import { redisConfig } from '../config/config';
import { CacheError } from '../utils/customError';

/**
 * Redis 클라이언트 생성 및 연결 함수
 */
export const redisClient: RedisClientType = createClient({
  url: `redis://${redisConfig.redisHost}:${redisConfig.redisPort}`,
});

/**
 * Redis 연결 함수
 */
export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

/**
 * Redis 에러 핸들링
 * 에러 발생 시 errorMiddleware에서 일관 처리할 수 있도록 next로 전달
 */
redisClient.on('error', (err: Error) => {
  console.error(`❌ Redis 클라이언트 에러: ${err.message}`);
});

/**
 * Redis 캐시 래퍼 클래스
 * 프리픽스 기반으로 키 관리 및 get/set 메서드 제공
 */
export class redisCache {
  private m_client: RedisClientType;
  private m_prefix: string;

  constructor(client: RedisClientType, prefix: string = '') {
    this.m_client = client;
    this.m_prefix = prefix;
  }

  /**
   * 프리픽스가 있으면 키에 붙여서 반환
   */
  private getKey(key: string): string {
    return this.m_prefix ? `${this.m_prefix}:${key}` : key;
  }

  /**
   * 캐시에서 값 조회
   * - ttl이 10초 이하이거나 키가 없으면 null 반환
   */
  public async get<T = any>(key: string): Promise<T | null> {
    const fullKey = this.getKey(key);
    const [raw, ttl] = await Promise.all([this.m_client.get(fullKey), this.m_client.ttl(fullKey)]);
    if (!raw) return null;
    // ttl이 10초 이하이거나 -2(키 없음)면 만료로 간주
    if (ttl <= 10 || ttl === -2) {
      return null;
    }
    return JSON.parse(raw) as T;
  }

  /**
   * 캐시에 값 저장 (ttl 초 단위)
   * - 에러 발생 시 errorMiddleware에서 일관 처리할 수 있도록 CacheError로 throw
   */
  public async set(key: string, value: any, ttl: number): Promise<void> {
    await this.m_client.set(this.getKey(key), JSON.stringify(value), { EX: ttl });
  }
}
