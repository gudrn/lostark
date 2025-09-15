/**
 * @fileoverview Redis 캐시 인스턴스 관리
 * 
 * 이 파일은 애플리케이션에서 사용할 Redis 캐시 인스턴스들을 생성하고 관리합니다.
 * 각 도메인별로 프리픽스를 분리하여 캐시 키 충돌을 방지하고 관리 효율성을 높입니다.
 * 
 * 주요 기능:
 * - 캐릭터 데이터용 캐시 인스턴스 생성
 * - 마켓 데이터용 캐시 인스턴스 생성
 * - 프리픽스 기반 네임스페이스 분리
 * - 싱글톤 패턴으로 인스턴스 재사용
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { redisClient, redisCache } from './redisClient';

/**
 * 캐릭터 데이터용 Redis 캐시 인스턴스
 * 
 * @description
 * 캐릭터 관련 데이터(아이템, 스펙 등)를 캐싱하기 위한 전용 인스턴스입니다.
 * 'character' 프리픽스를 사용하여 캐시 키를 구분합니다.
 * 
 * @example
 * // 캐릭터 아이템 정보 캐싱
 * await characterCache.set('items:홍길동', characterItems, 3600);
 * 
 * // 캐릭터 아이템 정보 조회
 * const items = await characterCache.get('items:홍길동');
 */
const characterCache: redisCache = new redisCache(redisClient, 'character');

/**
 * 마켓 데이터용 Redis 캐시 인스턴스
 * 
 * @description
 * 마켓 관련 데이터(아이템 가격, 재료 정보 등)를 캐싱하기 위한 전용 인스턴스입니다.
 * 'market' 프리픽스를 사용하여 캐시 키를 구분합니다.
 * 
 * @example
 * // 마켓 아이템 정보 캐싱
 * await marketCache.set('allArrMarketItems', marketData, 3600);
 * 
 * // 마켓 아이템 정보 조회
 * const marketData = await marketCache.get('allArrMarketItems');
 */
const marketCache: redisCache = new redisCache(redisClient, 'market');

// 다른 모듈에서 사용할 수 있도록 export
export { characterCache, marketCache };
