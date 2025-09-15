/**
 * @fileoverview Redis 캐시 클라이언트 관리
 * 
 * 이 파일은 Redis 캐시 서버와의 연결 및 데이터 관리를 담당합니다.
 * 마켓 데이터 캐싱을 통해 API 응답 속도를 향상시키고 서버 부하를 줄입니다.
 * 
 * 주요 기능:
 * - Redis 클라이언트 생성 및 연결 관리
 * - 에러 핸들링 및 로깅
 * - 캐시 래퍼 클래스 제공 (프리픽스 기반 키 관리)
 * - TTL 기반 캐시 만료 처리
 * - JSON 직렬화/역직렬화 자동 처리
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { createClient, RedisClientType } from 'redis';
import { redisConfig } from '../config/config';

/**
 * Redis 클라이언트 인스턴스
 * 
 * @description
 * 설정된 Redis 서버에 연결하는 클라이언트를 생성합니다.
 * 환경 변수에서 읽어온 호스트와 포트 정보를 사용합니다.
 */
export const redisClient: RedisClientType = createClient({
  url: `redis://${redisConfig.redisHost}:${redisConfig.redisPort}`,
});

/**
 * Redis 서버에 연결하는 함수
 * 
 * @description
 * 애플리케이션 시작 시 Redis 서버에 연결을 시도합니다.
 * 연결 실패 시 에러가 발생하며, errorMiddleware에서 처리됩니다.
 * 
 * @returns {Promise<void>} 연결 완료 시 resolve
 * @throws {Error} 연결 실패 시 에러 발생
 */
export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

/**
 * Redis 에러 이벤트 핸들러
 * 
 * @description
 * Redis 클라이언트에서 발생하는 에러를 감지하고 로깅합니다.
 * 연결 실패, 명령 실행 실패 등의 에러를 처리합니다.
 * 
 * @param {Error} err - 발생한 에러 객체
 */
redisClient.on('error', (err: Error) => {
  console.error(`❌ Redis 클라이언트 에러: ${err.message}`);
});

/**
 * Redis 캐시 래퍼 클래스
 * 
 * @description
 * Redis 클라이언트를 래핑하여 더 편리한 캐시 관리를 제공합니다.
 * 프리픽스 기반 키 관리, TTL 처리, JSON 직렬화를 자동화합니다.
 * 
 * @class redisCache
 */
export class redisCache {
  private m_client: RedisClientType;
  private m_prefix: string;

  /**
   * redisCache 클래스 생성자
   * 
   * @param {RedisClientType} client - Redis 클라이언트 인스턴스
   * @param {string} prefix - 캐시 키에 사용할 프리픽스 (기본값: 빈 문자열)
   */
  constructor(client: RedisClientType, prefix: string = '') {
    this.m_client = client;
    this.m_prefix = prefix;
  }

  /**
   * 프리픽스를 포함한 전체 키 생성
   * 
   * @description
   * 프리픽스가 설정된 경우 키 앞에 붙여서 네임스페이스를 구분합니다.
   * 예: prefix="market", key="items" → "market:items"
   * 
   * @private
   * @param {string} key - 원본 키
   * @returns {string} 프리픽스가 포함된 전체 키
   */
  private getKey(key: string): string {
    return this.m_prefix ? `${this.m_prefix}:${key}` : key;
  }

  /**
   * 캐시에서 데이터 조회
   * 
   * @description
   * 지정된 키로 캐시에서 데이터를 조회합니다.
   * TTL이 10초 이하이거나 키가 존재하지 않으면 null을 반환합니다.
   * JSON 데이터는 자동으로 파싱되어 반환됩니다.
   * 
   * @template T - 반환할 데이터의 타입
   * @param {string} key - 조회할 캐시 키
   * @returns {Promise<T | null>} 조회된 데이터 또는 null
   */
  public async get<T = any>(key: string): Promise<T | null> {
    const fullKey = this.getKey(key);
    
    // 키 값과 TTL을 동시에 조회하여 성능 최적화
    const [raw, ttl] = await Promise.all([
      this.m_client.get(fullKey), 
      this.m_client.ttl(fullKey)
    ]);
    
    // 키가 존재하지 않으면 null 반환
    if (!raw) return null;
    
    // TTL이 10초 이하이거나 -2(키 없음)면 만료로 간주하여 null 반환
    if (ttl <= 10 || ttl === -2) {
      return null;
    }
    
    // JSON 문자열을 파싱하여 원본 데이터로 복원
    return JSON.parse(raw) as T;
  }

  /**
   * 캐시에 데이터 저장
   * 
   * @description
   * 지정된 키로 데이터를 캐시에 저장합니다.
   * 데이터는 자동으로 JSON 문자열로 직렬화됩니다.
   * TTL(Time To Live)을 설정하여 자동 만료를 관리합니다.
   * 
   * @param {string} key - 저장할 캐시 키
   * @param {any} value - 저장할 데이터 (JSON 직렬화 가능한 객체)
   * @param {number} ttl - 캐시 만료 시간 (초 단위)
   * @returns {Promise<void>} 저장 완료 시 resolve
   * @throws {Error} 저장 실패 시 에러 발생
   */
  public async set(key: string, value: any, ttl: number): Promise<void> {
    const fullKey = this.getKey(key);
    
    // 데이터를 JSON 문자열로 직렬화하고 TTL과 함께 저장
    await this.m_client.set(fullKey, JSON.stringify(value), { EX: ttl });
  }
}
