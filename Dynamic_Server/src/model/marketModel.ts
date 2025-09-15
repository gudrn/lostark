/**
 * @fileoverview 로스트아크 마켓 데이터 모델
 * 
 * 이 파일은 로스트아크 게임의 마켓 데이터를 관리하는 모델 레이어입니다.
 * 외부 API에서 마켓 데이터를 조회하고, Redis 캐시를 활용하여 성능을 최적화합니다.
 * 
 * 주요 기능:
 * - 유물 아이템(각인서, 악세서리) 마켓 데이터 조회
 * - 강화 재료(재련석, 강화석) 마켓 데이터 조회  
 * - 보석(작열, 겁화 등) 마켓 데이터 조회
 * - Redis 캐시를 통한 성능 최적화
 * - 병렬 API 요청을 통한 응답 시간 단축
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import {
  fnFetchRelicMarketPage,
  fnFetchEnTierForceProductFromApi,
  fnFetchEnGemstoneFromApi,
} from '../service/marketService';
import { fnMapMarketItem, fnMapMarketforceItem } from '../mappers/marketFormater';
import { gemstones } from '../constants/data';
import { marketCache } from '../redis/instances';
import { RelicItem, GemItem, ForceItem, AllMarketItems } from './types/marketServiceTypes';

/**
 * 유물 아이템(각인서, 악세서리 등) 마켓 데이터를 외부 API에서 조회하는 함수
 * 
 * @description
 * - 로스트아크 마켓 API에서 유물 아이템 데이터를 1~4페이지까지 병렬로 조회
 * - 각 페이지의 데이터를 fnMapMarketItem 함수를 통해 정제된 형태로 변환
 * - Promise.all을 사용하여 모든 페이지를 동시에 요청하여 성능 최적화
 * 
 * @returns {Promise<RelicItem[]>} 정제된 유물 아이템 배열
 * 
 * @example
 * const relics = await arrMarketRelicsItemFromApi();
 * console.log(relics); // [{ name: "각인서", price: 1000, ... }, ...]
 */
const arrMarketRelicsItemFromApi = async (): Promise<RelicItem[]> => {
  // 1~4페이지까지 병렬로 API 요청을 수행하여 성능 최적화
  const arrAllItems = (
    await Promise.all(Array.from({ length: 4 }, (_, i) => fnFetchRelicMarketPage(i + 1)))
  ).flatMap((arrItems: any[] | null) => (arrItems ? arrItems.map(fnMapMarketItem) : []));
  
  return arrAllItems;
};

/**
 * 티어별 강화 재료(재련 재료) 마켓 데이터를 외부 API에서 조회하는 함수
 * 
 * @description
 * - 로스트아크 마켓 API에서 티어 4 강화 재료 데이터를 1, 2페이지 조회
 * - 재련석, 강화석 등의 강화 재료 아이템들의 가격 정보를 수집
 * - fnMapMarketforceItem 함수를 통해 API 응답을 정제된 형태로 변환
 * - Promise.all을 사용하여 두 페이지를 동시에 요청하여 성능 최적화
 * 
 * @returns {Promise<ForceItem[]>} 정제된 강화 재료 아이템 배열
 * 
 * @example
 * const forceItems = await objMarketTierForceProductFromApi();
 * console.log(forceItems); // [{ name: "재련석", price: 500, ... }, ...]
 */
const objMarketTierForceProductFromApi = async (): Promise<ForceItem[]> => {
  // 티어 4 강화재료의 1, 2페이지를 병렬로 조회
  const arrAllItems = (
    await Promise.all([
      fnFetchEnTierForceProductFromApi(4, 1),
      fnFetchEnTierForceProductFromApi(4, 2),
    ])
  ).flatMap((arrItems: any[] | null) => (arrItems ? arrItems.map(fnMapMarketforceItem) : []));
  
  return arrAllItems;
};

/**
 * 보석(작열/겁화 등) 마켓 데이터를 외부 API에서 조회하는 함수
 * 
 * @description
 * - gemstones 상수 배열에 정의된 보석 조합들을 기반으로 API 요청 생성
 * - 각 보석의 레벨과 등급에 따라 API 파라미터를 동적으로 생성
 * - 모든 보석 조합에 대해 병렬로 API 요청을 수행하여 성능 최적화
 * - API 응답에서 보석 이름과 구매 가격만 추출하여 정제된 형태로 반환
 * - null 값이나 잘못된 데이터는 필터링하여 안정성 확보
 * 
 * @returns {Promise<GemItem[]>} 정제된 보석 아이템 배열 (이름, 구매가격 포함)
 * 
 * @example
 * const gems = await arrMarketGemItemFromApi();
 * console.log(gems); // [{ name: "1레벨 작열 보석", buyPrice: 10000 }, ...]
 */
const arrMarketGemItemFromApi = async (): Promise<GemItem[]> => {
  // gemstones 상수에서 보석 이름, 레벨, 등급을 조합하여 API 파라미터 생성
  const gemParams = gemstones.flatMap(({ name, levels, grade }) =>
    levels.map((level: number) => ({
      gemName: `${level}레벨 ${name}`,
      grade,
    })),
  );

  // 모든 보석 조합에 대해 병렬로 API 요청 수행
  const gemResults = await Promise.all(
    gemParams.map(({ gemName, grade }) => fnFetchEnGemstoneFromApi(gemName, grade)),
  );

  // API 응답에서 보석 이름과 구매 가격만 추출하여 정제
  const arrGemItems: GemItem[] = gemResults
    .map((gemItems: any) => {
      // 유효한 배열이고 첫 번째 아이템이 존재하는 경우만 처리
      if (Array.isArray(gemItems) && gemItems[0]) {
        return {
          name: gemItems[0].Name,
          buyPrice: gemItems[0].AuctionInfo.BuyPrice,
        };
      }
      return null;
    })
    .filter(Boolean) as GemItem[]; // null 값 제거

  return arrGemItems;
};

/**
 * 마켓 전체 아이템을 캐시 및 조회하는 메인 함수
 * 
 * @description
 * - Redis 캐시를 활용하여 마켓 데이터의 성능을 최적화
 * - 캐시가 존재하는 경우 즉시 반환하여 API 호출 횟수 감소
 * - 캐시가 없는 경우 보석, 유물, 강화재료 데이터를 병렬로 조회
 * - 조회된 데이터를 AllMarketItems 형태로 구성하여 반환
 * - 캐시 TTL을 1시간(3600초)으로 설정하여 데이터 신선도 유지
 * 
 * @returns {Promise<AllMarketItems>} 모든 마켓 아이템이 포함된 객체
 * @returns {AllMarketItems.Gem} 보석 아이템 배열
 * @returns {AllMarketItems.Relic} 유물 아이템 배열  
 * @returns {AllMarketItems.Force} 강화 재료 아이템 배열
 * 
 * @example
 * const marketData = await getAllMarketItems();
 * console.log(marketData.Gem); // 보석 데이터
 * console.log(marketData.Relic); // 유물 데이터
 * console.log(marketData.Force); // 강화재료 데이터
 */
export const getAllMarketItems = async (): Promise<AllMarketItems> => {
  // Redis 캐시 키 설정
  const cacheKey = 'allArrMarketItems';
  const cachedData = await marketCache.get<AllMarketItems>(cacheKey);

  // 캐시된 데이터가 존재하는 경우 즉시 반환 (성능 최적화)
  if (cachedData) {
    return cachedData;
  }

  // 캐시가 없는 경우 모든 마켓 데이터를 병렬로 조회
  const [gem, relic, force] = await Promise.all([
    arrMarketGemItemFromApi(),      // 보석 데이터 조회
    arrMarketRelicsItemFromApi(),   // 유물 데이터 조회
    objMarketTierForceProductFromApi(), // 강화재료 데이터 조회
  ]);

  // 조회된 데이터를 AllMarketItems 형태로 구성
  const result: AllMarketItems = { Gem: gem, Relic: relic, Force: force };

  // 1시간(3600초) 동안 Redis 캐시에 저장하여 다음 요청 시 성능 향상
  await marketCache.set(cacheKey, result, 3600);

  return result;
};
