/*import { refineData } from './data/data';
import { ForceItem, RefineTableData } from './type';

// -----------------------------
// 파편 주머니별 개수 정의
// -----------------------------
const shardPouchUnitCount: Record<string, number> = {
  '운명의 파편 주머니(대)': 3000,
  '운명의 파편 주머니(중)': 2000,
  '운명의 파편 주머니(소)': 1000,
};

// -----------------------------
// amount 키 매핑
// -----------------------------
const materialMap: Record<string, string> = {
  운돌: '운명의 돌파석',
  운명의파괴석: '운명의 파괴석',
  아비도스: '아비도스 융화 재료',
  운명파편: '운명의 파편',
  골드: '골드',
};

// -----------------------------
// 가격 변환 함수
// -----------------------------
export function convertPriceMap(prices: ForceItem[]): Record<string, number> {
  const priceMap: Record<string, number> = {};

  for (const item of prices) {
    if (item.name.includes('운명의 파편 주머니')) {
      const count = shardPouchUnitCount[item.name] ?? 1;
      const unitPrice = item.recentprice / count;
      priceMap['운명의 파편'] = Math.min(priceMap['운명의 파편'] ?? Infinity, unitPrice);
    } else {
      priceMap[item.name] = item.recentprice;
    }
  }

  return priceMap;
}

// -----------------------------
// 특정 단계 데이터 가져오기
// -----------------------------
export function getRefineLevel(
  type: 'armor' | 'weapon',
  tier: string,
  level: number,
): RefineTableData {
  return refineData[type][tier][level];
}

// -----------------------------
// 강화 보고서 타입 정의
// -----------------------------
export interface AdvancedRefineReport {
  hasEnhancedBonus: boolean;
  normalBreathNames: string[];
  bonusBreathNames: string[];
  enhancedBonusBreathNames: string[];
  paidNormalTry: number;
  freeNormalTry: number;
  bonusTry: number;
  enhancedBonusTry: number;
  paidNormalPrice: number;
  freeNormalPrice: number;
  bonusPrice: number;
  enhancedBonusPrice: number;
  expectedTryCount: number;
  expectedPrice: number;
  expectedMaterials: { name: string; amount: number }[];
}

// -----------------------------
// getReport 구현
// -----------------------------
function getBasePrice(refineTable: RefineTableData, priceTable: Record<string, number>) {
  return Object.entries(refineTable.amount)
    .map(([name, amount]) => priceTable[materialMap[name] || name] * amount)
    .reduce((sum, x) => sum + x, 0);
}

function getSortedBreathByPrice(refineTable: RefineTableData, priceTable: Record<string, number>) {
  return Object.entries(refineTable.breath)
    .map(([name, amount]) => ({
      name,
      amount,
      price: priceTable[name] * amount,
    }))
    .sort((a, b) => a.price - b.price);
}

function getBookWithPrice(refineTable: RefineTableData, priceTable: Record<string, number>) {
  return refineTable.book
    ? { name: refineTable.book, amount: 1, price: priceTable[refineTable.book] }
    : undefined;
}

function getAdditionalPrice(
  refineTable: RefineTableData,
  priceTable: Record<string, number>,
  breathCount: number,
  bookCount: 0 | 1,
) {
  const sortedBreath = getSortedBreathByPrice(refineTable, priceTable);
  const book = getBookWithPrice(refineTable, priceTable);

  return (
    sortedBreath.slice(0, breathCount).reduce((sum, x) => sum + x.price, 0) +
    (book ? bookCount * book.price : 0)
  );
}

export function getReport(
  refineTable: RefineTableData,
  priceTable: Record<string, number>,
): AdvancedRefineReport[] {
  const result: AdvancedRefineReport[] = [];
  const basePrice = getBasePrice(refineTable, priceTable);
  const sortedBreath = getSortedBreathByPrice(refineTable, priceTable);
  const book = getBookWithPrice(refineTable, priceTable);
  const maxBreathCount = Object.keys(refineTable.breath).length as 3 | 1;

  for (let normalBreath = 0; normalBreath <= maxBreathCount; normalBreath++) {
    for (let bonusBreath = 0; bonusBreath <= maxBreathCount; bonusBreath++) {
      for (
        let enhancedBonusBreath = 0;
        enhancedBonusBreath <= (refineTable.hasEnhancedBonus ? maxBreathCount : 0);
        enhancedBonusBreath++
      ) {
        for (let normalBook = 0 as 0 | 1; normalBook <= (book ? 1 : 0); normalBook++) {
          for (let bonusBook = 0 as 0 | 1; bonusBook <= (book ? 1 : 0); bonusBook++) {
            const normalK = normalBreath + normalBook * (maxBreathCount === 1 ? 2 : 4);
            const bonusK = bonusBreath + bonusBook * (maxBreathCount === 1 ? 2 : 4);
            const enhancedBonusK = enhancedBonusBreath;

            const paidNormalPrice =
              basePrice + getAdditionalPrice(refineTable, priceTable, normalBreath, normalBook);
            const freeNormalPrice = getAdditionalPrice(
              refineTable,
              priceTable,
              normalBreath,
              normalBook,
            );
            const bonusPrice =
              basePrice + getAdditionalPrice(refineTable, priceTable, bonusBreath, bonusBook);
            const enhancedBonusPrice =
              basePrice + getAdditionalPrice(refineTable, priceTable, enhancedBonusBreath, 0);

            const data = refineTable.data.find(
              (x) =>
                x.parameters.normalK === normalK &&
                x.parameters.bonusK === bonusK &&
                x.parameters.enhancedBonusK === enhancedBonusK,
            )?.result;

            if (!data) {
              continue;
            }

            const expectedTryCount =
              data.paidNormalTry + data.freeNormalTry + data.bonusTry + data.enhancedBonusTry;

            const expectedMaterials = [
              ...Object.entries(refineTable.amount).map(([name, amount]) => ({
                name: materialMap[name] || name,
                amount: amount * expectedTryCount,
              })),
              ...sortedBreath.map((x, index) => {
                const normalAmount = index < normalBreath ? x.amount : 0;
                const bonusAmount = index < bonusBreath ? x.amount : 0;
                const enhancedBonusAmount = index < enhancedBonusBreath ? x.amount : 0;

                return {
                  name: x.name,
                  amount:
                    normalAmount * (data.freeNormalTry + data.paidNormalTry) +
                    bonusAmount * data.bonusTry +
                    enhancedBonusAmount * data.enhancedBonusTry,
                };
              }),
            ];

            const expectedPrice =
              paidNormalPrice * data.paidNormalTry +
              freeNormalPrice * data.freeNormalTry +
              bonusPrice * data.bonusTry +
              enhancedBonusPrice * data.enhancedBonusTry;

            result.push({
              hasEnhancedBonus: refineTable.hasEnhancedBonus,
              normalBreathNames: [
                ...sortedBreath.slice(0, normalBreath).map((x) => x.name),
                ...(normalBook ? [book!.name] : []),
              ],
              bonusBreathNames: [
                ...sortedBreath.slice(0, bonusBreath).map((x) => x.name),
                ...(bonusBook ? [book!.name] : []),
              ],
              enhancedBonusBreathNames: sortedBreath
                .slice(0, enhancedBonusBreath)
                .map((x) => x.name),
              ...data,
              paidNormalPrice,
              freeNormalPrice,
              bonusPrice,
              enhancedBonusPrice,
              expectedTryCount,
              expectedPrice,
              expectedMaterials,
            });
          }
        }
      }
    }
  }

  return result.sort((a, b) => a.expectedPrice - b.expectedPrice);
}

// -----------------------------
// 시뮬레이션 기반 강화 비용 계산
// -----------------------------
export function calculateLevelCostWithSimulation(
  type: 'armor' | 'weapon',
  tier: string,
  level: number,
  prices: ForceItem[],
) {
  const priceMap = convertPriceMap(prices);
  const refineTable = getRefineLevel(type, tier, level);
  const reports = getReport(refineTable, priceMap);

  return reports[0]; // 가장 저렴한 강화 시뮬레이션 결과 반환
}

export function calculateTotalCost(
  type: 'armor' | 'weapon',
  tier: string,
  startLevel: number,
  endLevel: number,
  prices: ForceItem[],
) {
  let totalPrice = 0;
  const totalMaterials: Record<string, number> = {};
  const details = [];

  for (let lvl = startLevel; lvl <= endLevel; lvl++) {
    const result = calculateLevelCostWithSimulation(type, tier, lvl, prices);

    totalPrice += result.expectedPrice;

    for (const mat of result.expectedMaterials) {
      totalMaterials[mat.name] = (totalMaterials[mat.name] ?? 0) + mat.amount;
    }

    details.push({ level: lvl, ...result });
  }

  return {
    totalPrice,
    totalMaterials,
    details,
  };
}
*/
