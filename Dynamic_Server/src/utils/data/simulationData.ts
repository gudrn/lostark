/**
 * 시뮬레이션 데이터 타입 정의
 */
export interface SimulationParameters {
  normalK: number;
  bonusK: number;
  enhancedBonusK: number;
}

export interface SimulationResult {
  freeNormalTry: number;
  paidNormalTry: number;
  bonusTry: number;
  enhancedBonusTry: number;
}

export interface SimulationData {
  parameters: SimulationParameters;
  result: SimulationResult;
}

/**
 * T3 시뮬레이션 데이터
 */
export const t3_01: SimulationData[] = [
  {
    parameters: {
      normalK: 0,
      bonusK: 0,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 3.2012505,
      paidNormalTry: 47.178451,
      bonusTry: 9.3681693,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 1,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 3.0719503,
      paidNormalTry: 45.371876,
      bonusTry: 9.0077547,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 2,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 2.9531594,
      paidNormalTry: 43.7008322,
      bonusTry: 8.6729892,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 3,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 2.8408745,
      paidNormalTry: 42.1462658,
      bonusTry: 8.3616587,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 4,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 2.6865285,
      paidNormalTry: 39.9978541,
      bonusTry: 7.9320651,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 5,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 2.5924739,
      paidNormalTry: 38.6914676,
      bonusTry: 7.6706645,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 6,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 2.5052656,
      paidNormalTry: 37.4727071,
      bonusTry: 7.4257144,
      enhancedBonusTry: 0,
    },
  },
  {
    parameters: {
      normalK: 0,
      bonusK: 7,
      enhancedBonusK: 0,
    },
    result: {
      freeNormalTry: 2.42305,
      paidNormalTry: 36.325,
      bonusTry: 7.195,
      enhancedBonusTry: 0,
    },
  },
];

// 추가 시뮬레이션 데이터는 필요에 따라 여기에 추가
