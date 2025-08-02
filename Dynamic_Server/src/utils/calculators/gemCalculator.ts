import { ArmoryGem, GemItem, ItemResult } from '../type';

/**
 * 보석 계산 함수
 * @param userGem 사용자가 보유한 보석 정보
 * @param gemItems 마켓의 보석 정보
 * @returns 계산된 보석 결과 배열 또는 null
 */
export const fnCalculatingGem = (
  userGem: ArmoryGem[],
  gemItems: GemItem[],
): ItemResult[] | null => {
  if (!userGem || !gemItems) return null;

  // 결과를 효과별로 분리하여 저장
  let result: ItemResult[] = [];
  // 중복 체크를 위한 Set
  const resultSet = new Set<string>();

  for (let gem of userGem) {
    // "7레벨 작열의 보석"에서 레벨과 효과명 추출
    const gemNameRegex = /^(\d+)레벨 (.+)의 보석$/;
    const match = gem.name.match(gemNameRegex);

    let level = 0;
    let effect = '';
    if (match) {
      level = Number(match[1]);
      effect = match[2];
    } else {
      // 형식이 다르면 기본값 사용
      level = 0;
      effect = '';
    }

    // 한 단계 높은 레벨로 검색
    const nextLevel = level + 1;

    // 효과명에 따라 겁화/작열 구분
    let effectType = '';
    if (effect.includes('겁화')) {
      effectType = '겁화';
    } else if (effect.includes('작열')) {
      effectType = '작열';
    } else {
      // 둘 다 아니면 해당 보석은 무시
      continue;
    }

    // 중복 체크: 이미 같은 레벨, 효과의 보석이 result에 있으면 건너뜀
    const resultKey = `${level}|${effectType}`;
    if (resultSet.has(resultKey)) {
      continue;
    }

    // gemItems에서 한 단계 높은 레벨의 동일 효과 보석 찾기
    const nextGemName = `${nextLevel}레벨 ${effect}의 보석`;
    const matchedGem = gemItems.find((item) => {
      const itemMatch = item.name.match(gemNameRegex);
      if (!itemMatch) return false;
      const itemLevel = Number(itemMatch[1]);
      const itemEffect = itemMatch[2];
      // 효과명에 "겁화" 또는 "작열"이 포함되어 있는지로만 비교
      if (effectType === '겁화' && !itemEffect.includes('겁화')) return false;
      if (effectType === '작열' && !itemEffect.includes('작열')) return false;
      return itemLevel === nextLevel;
    });

    result.push({
      name: nextGemName,
      price: matchedGem ? matchedGem.buyPrice : 0,
    });

    // 중복 방지용 키 추가
    resultSet.add(resultKey);
  }

  return result;
};
