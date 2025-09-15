/**
 * @fileoverview 애플리케이션 설정 관리
 * 
 * 이 파일은 로스트아크 마켓 서비스의 모든 설정값을 관리합니다.
 * 환경 변수에서 설정값을 읽어와 타입 안전한 설정 객체로 제공합니다.
 * 
 * 주요 설정:
 * - 서버 포트 설정
 * - 로스트아크 API 키 및 URL 설정
 * - Redis 캐시 서버 연결 정보 설정
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import dotenv from 'dotenv';
import { ILostarkConfig, IRedisConfig, IServerConfig } from './types/types';

// .env 파일에서 환경 변수 로드
dotenv.config();

/**
 * 서버 관련 설정
 * 
 * @description
 * Express 서버의 포트 번호를 환경 변수에서 읽어와 설정합니다.
 * SERVER_PORT 환경 변수가 없으면 기본값 3000을 사용합니다.
 */
export const serverConfig: IServerConfig = {
  port: Number(process.env.SERVER_PORT) || 3000,
};

/**
 * 로스트아크 API 관련 설정
 * 
 * @description
 * 로스트아크 공식 API에 접근하기 위한 API 키와 기본 URL을 설정합니다.
 * 환경 변수에서 읽어오며, 값이 없으면 빈 문자열을 기본값으로 사용합니다.
 * 
 * @property {string} lostarkapikey - 로스트아크 API 인증 키
 * @property {string} lostarkapiurl - 로스트아크 API 기본 URL
 */
export const lostarkConfig: ILostarkConfig = {
  lostarkapikey: process.env.LOSTARK_API_KEY || '',
  lostarkapiurl: process.env.LOSTARK_API_URL || '',
};

/**
 * Redis 캐시 서버 관련 설정
 * 
 * @description
 * Redis 캐시 서버에 연결하기 위한 호스트와 포트 정보를 설정합니다.
 * 마켓 데이터 캐싱을 위해 사용됩니다.
 * 
 * @property {string} redisHost - Redis 서버 호스트 주소
 * @property {string} redisPort - Redis 서버 포트 번호
 */
export const redisConfig: IRedisConfig = {
  redisHost: process.env.REDIS_HOST || '',
  redisPort: process.env.REDIS_PORT || '',
};
