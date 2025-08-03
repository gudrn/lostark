/**
 * 로스트아크 API 설정 타입 정의
 */
export interface ILostarkConfig {
  lostarkapikey: string;
  lostarkapiurl: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

/**
 * Redis 설정 타입 정의
 */
export interface IRedisConfig {
  redisHost: string;
  redisPort: string;
  redisPassword?: string;
  redisDb?: number;
  redisKeyPrefix?: string;
  cacheExpiration?: number;
}

/**
 * 서버 설정 타입 정의
 */
export interface IServerConfig {
  port: number;
}

/**
 * 전체 애플리케이션 설정 타입 정의
 */
export interface IAppConfig {
  lostark: ILostarkConfig;
  redis: IRedisConfig;
  server: IServerConfig;
}
