/**
 * @fileoverview 마켓 서비스
 * 
 * 이 파일은 로스트아크 공식 API를 통해 마켓 데이터를 조회하는 서비스입니다.
 * 다양한 아이템 카테고리별로 API 요청을 수행하고 데이터를 반환합니다.
 * 
 * 주요 기능:
 * - 유물 아이템(각인서, 악세서리) 조회
 * - 강화 재료 아이템 조회
 * - 보석 아이템 조회
 * - API 에러 처리 및 예외 상황 관리
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import { lostarkConfig } from '../config/config';
import { marketCode } from '../constants/data';
import { ExternalApiError } from '../utils/customError';

/**
 * 마켓 아이템 인터페이스 정의
 * 
 * @description
 * 로스트아크 API에서 반환하는 마켓 아이템의 기본 구조를 정의합니다.
 * 실제 사용 시에는 더 구체적인 타입으로 확장할 수 있습니다.
 */
export interface MarketItem {
  [key: string]: any;
}

/**
 * 유물 아이템 페이지 조회 함수
 * 
 * @description
 * 로스트아크 마켓 API에서 유물 등급의 아이템들을 페이지별로 조회합니다.
 * 각인서, 악세서리 등 유물 아이템들의 가격 정보를 가져옵니다.
 * 
 * @param {number} nPage - 조회할 페이지 번호 (1부터 시작)
 * @returns {Promise<MarketItem[]>} 유물 아이템 배열
 * @throws {ExternalApiError} API 요청 실패 시 에러 발생
 * 
 * @example
 * const relics = await fnFetchRelicMarketPage(1);
 * console.log(relics); // [{ Name: "각인서", CurrentMinPrice: 1000, ... }, ...]
 */
export const fnFetchRelicMarketPage = async (nPage: number): Promise<MarketItem[]> => {
  let response;
  
  try {
    // 로스트아크 마켓 API에 POST 요청
    response = await fetch(`${lostarkConfig.lostarkapiurl}/markets/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        Sort: 'CURRENT_MIN_PRICE',        // 현재 최저가 기준 정렬
        CategoryCode: marketCode.relicAll, // 유물 전체 카테고리
        ItemGrade: '유물',                // 유물 등급만 조회
        PageNo: nPage,                    // 페이지 번호
        SortCondition: 'DESC',            // 내림차순 정렬
      }),
    });
  } catch (err: any) {
    // 네트워크 오류나 기타 예외 발생 시
    throw new ExternalApiError('마켓 아이템 페이지 조회 중 네트워크 오류', 500);
  }

  // HTTP 응답이 성공적이지 않은 경우
  if (!response.ok) {
    throw new ExternalApiError('마켓 아이템 페이지 조회 실패', response.status);
  }

  // JSON 응답 파싱
  const data = await response.json();

  // Items 배열 반환
  return data.Items;
};

/**
 * 강화 재료 아이템 페이지 조회 함수
 * 
 * @description
 * 로스트아크 마켓 API에서 특정 티어의 강화 재료 아이템들을 페이지별로 조회합니다.
 * 재련석, 강화석 등 강화에 필요한 재료들의 가격 정보를 가져옵니다.
 * 
 * @param {number} nTier - 조회할 아이템 티어 (예: 4)
 * @param {number} nPage - 조회할 페이지 번호 (1부터 시작)
 * @returns {Promise<MarketItem[]>} 강화 재료 아이템 배열
 * @throws {ExternalApiError} API 요청 실패 시 에러 발생
 * 
 * @example
 * const forceItems = await fnFetchEnTierForceProductFromApi(4, 1);
 * console.log(forceItems); // [{ Name: "재련석", CurrentMinPrice: 500, ... }, ...]
 */
export const fnFetchEnTierForceProductFromApi = async (
  nTier: number,
  nPage: number,
): Promise<MarketItem[]> => {
  let response;
  
  try {
    // 로스트아크 마켓 API에 POST 요청
    response = await fetch(`${lostarkConfig.lostarkapiurl}/markets/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        Sort: 'GRADE',                    // 등급 기준 정렬
        CategoryCode: marketCode.reinforce, // 강화 재료 카테고리
        ItemTier: nTier,                  // 특정 티어만 조회
        PageNo: nPage,                    // 페이지 번호
        SortCondition: 'DESC',            // 내림차순 정렬
      }),
    });
  } catch (err: any) {
    // 네트워크 오류나 기타 예외 발생 시
    throw new ExternalApiError('마켓 아이템 페이지 조회 중 네트워크 오류', 500);
  }

  // HTTP 응답이 성공적이지 않은 경우
  if (!response.ok) {
    throw new ExternalApiError('마켓 아이템 페이지 조회 실패', response.status);
  }

  // JSON 응답 파싱
  const data = await response.json();

  // Items 배열 반환
  return data.Items;
};

/**
 * 보석 아이템 조회 함수
 * 
 * @description
 * 로스트아크 경매장 API에서 특정 이름과 등급의 보석 아이템을 조회합니다.
 * 작열, 겁화 등 보석들의 구매 가격 정보를 가져옵니다.
 * 
 * @param {string} sName - 조회할 보석 이름 (예: "1레벨 작열 보석")
 * @param {string} grade - 보석 등급 (예: "전설")
 * @returns {Promise<MarketItem[]>} 보석 아이템 배열
 * @throws {ExternalApiError} API 요청 실패 시 에러 발생
 * 
 * @example
 * const gems = await fnFetchEnGemstoneFromApi("1레벨 작열 보석", "전설");
 * console.log(gems); // [{ Name: "1레벨 작열 보석", BuyPrice: 10000, ... }, ...]
 */
export const fnFetchEnGemstoneFromApi = async (
  sName: string,
  grade: string,
): Promise<MarketItem[]> => {
  let response;
  
  try {
    // 로스트아크 경매장 API에 POST 요청
    response = await fetch(`${lostarkConfig.lostarkapiurl}/auctions/items`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        ItemLevelMin: 0,                    // 최소 아이템 레벨
        ItemLevelMax: 0,                    // 최대 아이템 레벨
        ItemGradeQuality: null,             // 아이템 등급 품질 (null = 전체)
        ItemUpgradeLevel: null,             // 강화 레벨 (null = 전체)
        ItemTradeAllowCount: null,          // 거래 가능 횟수 (null = 전체)
        Sort: 'BUY_PRICE',                  // 구매 가격 기준 정렬
        CategoryCode: marketCode.gem,       // 보석 카테고리
        ItemTier: 4,                        // 티어 4 (보석은 주로 티어 4)
        ItemGrade: `${grade}`,              // 특정 등급만 조회
        ItemName: sName,                    // 특정 이름만 조회
        PageNo: 0,                          // 첫 번째 페이지
        SortCondition: 'ASC',               // 오름차순 정렬 (저렴한 순)
      }),
    });
  } catch (err: any) {
    // 네트워크 오류나 기타 예외 발생 시
    throw new ExternalApiError('마켓 아이템 페이지 조회 중 네트워크 오류', 500);
  }

  // HTTP 응답이 성공적이지 않은 경우
  if (!response.ok) {
    throw new ExternalApiError('마켓 아이템 페이지 조회 실패', response.status);
  }

  // JSON 응답 파싱
  const data = await response.json();

  // Items 배열 반환
  return data.Items;
};
/*
// 장신구(악세서리) 아이템 페이지를 가져오는 함수
export const fnFetchEnAccessoryFromApi = async (
  sName: string,
  grade: string,
): Promise<MarketItem[]> => {
  let response;
  try {
    response = await fetch(`${lostarkConfig.lostarkapiurl}/auctions/items`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
      body: JSON.stringify({
        ItemLevelMin: 0,
        ItemLevelMax: 0,
        ItemGradeQuality: null,
        ItemUpgradeLevel: null,
        ItemTradeAllowCount: null,
        Sort: 'BUY_PRICE',
        CategoryCode: marketCode.accessory, // 장신구 카테고리 코드 사용
        ItemTier: 4,
        ItemGrade: `${grade}`,
        ItemName: sName,
        PageNo: 0,
        SortCondition: 'ASC',
      }),
    });
  } catch (err: any) {
    throw new ExternalApiError('마켓 장신구 페이지 조회 중 네트워크 오류', 500);
  }

  if (!response.ok) throw new ExternalApiError('마켓 장신구 페이지 조회 실패', response.status);

  const data = await response.json();

  return data.Items;
};
*/
