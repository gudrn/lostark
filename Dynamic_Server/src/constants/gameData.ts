import {
  Gemstone,
  ExceptedRelic,
  AccessoryTypeMapping,
  ClassTypeMapping,
  GradeTypeMapping,
  OptionValues,
  AccessoryOptions,
  OptionCombinationTypes,
  GradeMapping,
} from './types/types';

export const gemstones: Gemstone[] = [
  {
    grade: '전설',
    name: '작열의 보석',
    levels: [5, 6, 7],
  },
  {
    grade: '유물',
    name: '작열의 보석',
    levels: [8, 9],
  },
  {
    grade: '고대',
    name: '작열의 보석',
    levels: [10],
  },
  {
    grade: '전설',
    name: '겁화의 보석',
    levels: [5, 6, 7],
  },
  {
    grade: '유물',
    name: '겁화의 보석',
    levels: [8, 9],
  },
  {
    grade: '고대',
    name: '겁화의 보석',
    levels: [10],
  },
];

export const equipmentTypes: string[] = [
  '무기',
  '투구',
  '상의',
  '하의',
  '장갑',
  '어깨',
  '목걸이',
  '귀걸이',
  '반지',
];

export const exceptedRelics: ExceptedRelic[] = [
  {
    itemName: '긴급구조 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 177,
  },
  {
    itemName: '약자 무시 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 110,
  },
  {
    itemName: '불굴 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 97,
  },
  {
    itemName: '번개의 분노 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 88,
  },
  {
    itemName: '부러진 뼈 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 87,
  },
  {
    itemName: '위기 모면 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 80,
  },
  {
    itemName: '강령술 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 80,
  },
  {
    itemName: '굳은 의지 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 79,
  },
  {
    itemName: '탈출의 명수 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 50,
  },
  {
    itemName: '승부사 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 630,
  },
  {
    itemName: '폭발물 전문가 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 420,
  },
  {
    itemName: '추진력 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 294,
  },
  {
    itemName: '분쇄의 주먹 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 221,
  },
  {
    itemName: '시선 집중 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 899,
  },
  {
    itemName: '선수필승 각인서',
    itemIcon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png',
    itemCurrentMinPrice: 749,
  },
];

export const GRADE_MAPPING: GradeMapping = {
  상상: ['상', '상'],
  상중: ['상', '중'],
  중상: ['중', '상'],
  상하: ['상', '하'],
  하상: ['하', '상'],
  상무: ['상', '무'],
  무상: ['무', '상'],
  중중: ['중', '중'],
  중하: ['중', '하'],
  하중: ['하', '중'],
  중무: ['중', '무'],
  무중: ['무', '중'],
  하하: ['하', '하'],
  하무: ['하', '무'],
  무하: ['무', '하'],
  무무: ['무', '무'],
};

export const OPTION_COMBINATION_TYPES: OptionCombinationTypes = {
  SANG_SANG: '상상', // 상상
  SANG_JUNG: '상중', // 상중
  JUNG_SANG: '중상', // 중상
  SANG_HA: '상하', // 상하
  HA_SANG: '하상', // 하상
  SANG_MU: '상무', // 상무
  MU_SANG: '무상', // 무상
  JUNG_JUNG: '중중', // 중중
  JUNG_HA: '중하', // 중하
  HA_JUNG: '하중', // 하중
  JUNG_MU: '중무', // 중무
  MU_JUNG: '무중', // 무중
  HA_HA: '하하', // 하하
  HA_MU: '하무', // 하무
  MU_HA: '무하', // 무하
  MU_MU: '무무', // 무무
};

/**
 * 장신구 옵션 상수 (FirstOption, SecondOption)
 * 딜러와 서포터에 대한 기본 옵션 세트 정의
 */
export const ACCESSORY_OPTIONS: AccessoryOptions = {
  // 딜러 옵션
  DEALER: {
    // 목걸이: 추가피해, 적에게 주는 피해
    NECKLACE: [
      { FirstOption: 7, SecondOption: 41, Description: '추가 피해' }, // 추가 피해
      { FirstOption: 7, SecondOption: 42, Description: '적에게 주는 피해 증가' }, // 적에게 주는 피해 증가
    ],
    // 귀걸이: 공격력 %, 무기 공격력 %
    EARRING: [
      { FirstOption: 7, SecondOption: 45, Description: '공격력 %' }, // 공격력 %
      { FirstOption: 7, SecondOption: 46, Description: '무기 공격력 %' }, // 무기 공격력 %
    ],
    // 반지: 치명타 피해, 치명타 적중률
    RING: [
      { FirstOption: 7, SecondOption: 50, Description: '치명타 피해' }, // 치명타 피해
      { FirstOption: 7, SecondOption: 49, Description: '치명타 적중률' }, // 치명타 적중률
    ],
  },

  // 서포터 옵션
  SUPPORTER: {
    // 목걸이: 낙인력, 세레나데/신성/조화 게이지 획득량 증가
    NECKLACE: [
      { FirstOption: 7, SecondOption: 44, Description: '낙인력' }, // 낙인력
      { FirstOption: 7, SecondOption: 43, Description: '세레나데/신성/조화 게이지 획득량 증가' }, // 세레나데/신성/조화 게이지 획득량 증가
    ],
    // 귀걸이: 무기공격력%, 무기공격력+
    EARRING: [
      { FirstOption: 7, SecondOption: 46, Description: '무기 공격력 %' }, // 무기 공격력 %
      { FirstOption: 7, SecondOption: 54, Description: '무기 공격력 +' }, // 무기 공격력 +
    ],
    // 반지: 아군 공격력 강화 효과, 아군 피해량 강화 효과
    RING: [
      { FirstOption: 7, SecondOption: 51, Description: '아군 공격력 강화 효과' }, // 아군 공격력 강화 효과
      { FirstOption: 7, SecondOption: 52, Description: '아군 피해량 강화 효과' }, // 아군 피해량 강화 효과
    ],
  },
};

// 옵션 등급별 값 정의
export const OPTION_VALUES: OptionValues = {
  // 목걸이 옵션
  NECKLACE: {
    // 적에게 주는 피해 증가
    42: {
      HIGH: { MinValue: 200, MaxValue: 200 }, // 상
      MEDIUM: { MinValue: 120, MaxValue: 120 }, // 중
      LOW: { MinValue: 55, MaxValue: 55 }, // 하
    },
    // 추가 피해
    41: {
      HIGH: { MinValue: 260, MaxValue: 260 }, // 상
      MEDIUM: { MinValue: 160, MaxValue: 160 }, // 중
      LOW: { MinValue: 60, MaxValue: 60 }, // 하
    },
    // 낙인력
    44: {
      HIGH: { MinValue: 800, MaxValue: 800 }, // 상
      MEDIUM: { MinValue: 480, MaxValue: 480 }, // 중
      LOW: { MinValue: 215, MaxValue: 215 }, // 하
    },
    // 세레나데/신성/조화 게이지 획득량 증가
    43: {
      HIGH: { MinValue: 600, MaxValue: 600 }, // 상
      MEDIUM: { MinValue: 360, MaxValue: 360 }, // 중
      LOW: { MinValue: 160, MaxValue: 160 }, // 하
    },
  },

  // 귀걸이 옵션
  EARRING: {
    // 공격력 %
    45: {
      HIGH: { MinValue: 155, MaxValue: 155 }, // 상
      MEDIUM: { MinValue: 95, MaxValue: 95 }, // 중
      LOW: { MinValue: 40, MaxValue: 40 }, // 하
    },
    // 무기 공격력 %
    46: {
      HIGH: { MinValue: 300, MaxValue: 300 }, // 상
      MEDIUM: { MinValue: 180, MaxValue: 180 }, // 중
      LOW: { MinValue: 80, MaxValue: 80 }, // 하
    },
    // 무기 공격력 +
    54: {
      HIGH: { MinValue: 960, MaxValue: 960 }, // 상
      MEDIUM: { MinValue: 480, MaxValue: 480 }, // 중
      LOW: { MinValue: 195, MaxValue: 195 }, // 하
    },
  },

  // 반지 옵션
  RING: {
    // 치명타 피해
    50: {
      HIGH: { MinValue: 400, MaxValue: 400 }, // 상
      MEDIUM: { MinValue: 240, MaxValue: 240 }, // 중
      LOW: { MinValue: 110, MaxValue: 110 }, // 하
    },
    // 치명타 적중률 %
    49: {
      HIGH: { MinValue: 155, MaxValue: 155 }, // 상
      MEDIUM: { MinValue: 95, MaxValue: 95 }, // 중
      LOW: { MinValue: 40, MaxValue: 40 }, // 하
    },
    // 아군 공격력 강화 효과
    51: {
      HIGH: { MinValue: 500, MaxValue: 500 }, // 상
      MEDIUM: { MinValue: 300, MaxValue: 300 }, // 중
      LOW: { MinValue: 135, MaxValue: 135 }, // 하
    },
    // 아군 피해량 강화 효과
    52: {
      HIGH: { MinValue: 750, MaxValue: 750 }, // 상
      MEDIUM: { MinValue: 450, MaxValue: 450 }, // 중
      LOW: { MinValue: 200, MaxValue: 200 }, // 하
    },
  },
};

export const GRADE_TYPE_MAPPING: GradeTypeMapping = {
  상: 'HIGH',
  중: 'MEDIUM',
  하: 'LOW',
  무: 'NONE',
};

export const CLASS_TYPE_MAPPING: ClassTypeMapping = {
  딜러: 'DEALER',
  서포터: 'SUPPORTER',
};

export const ACCESSORY_TYPE_MAPPING: AccessoryTypeMapping = {
  목걸이: 'NECKLACE',
  귀걸이: 'EARRING',
  반지: 'RING',
};
