/**
 * 마켓 코드 타입 정의
 */
export interface MarketCode {
  // 전체 카테고리
  all: string;

  // 장비 상자
  equipmentBoxAll: number;

  // 아바타 관련
  avatarWeapon: number;
  avatarHead: number;
  avatarFace1: number;
  avatarFace2: number;
  avatarTop: number;
  avatarBottom: number;
  avatarSet: number;
  avatarInstrument: number;
  avatarBox: number;
  avatarMoveEffect: number;
  avatarAll: number;

  // 유물 관련
  relicAll: number;

  // 강화 재료
  reinforce: number;
  reinforceAdd: number;
  reinforceEtc: number;
  reinforceWeaponEvo: number;
  reinforceAll: number;

  // 배틀 아이템
  battleItemHeal: number;
  battleItemAttack: number;
  battleItemFunction: number;
  battleItemBuff: number;
  battleItemAll: number;

  // 음식
  foodAll: number;

  // 생활 재료
  lifePlant: number;
  lifeLumber: number;
  lifeMine: number;
  lifeHunt: number;
  lifeFish: number;
  lifeArchaeology: number;
  lifeEtc: number;
  lifeAll: number;

  // 모험의 서
  adventureBook: number;

  // 항해
  sailingMaterial: number;
  sailingSkin: number;
  sailingMaterialBox: number;
  sailingAll: number;

  // 펫
  pet: number;
  petBox: number;
  petAll: number;

  // 탈것
  mount: number;
  mountBox: number;
  mountAll: number;

  // 기타
  etc: number;

  // 보석
  gem: number;
  gemBox: number;
}

/**
 * 보석 타입 정의
 */
export interface Gemstone {
  grade: string;
  name: string;
  levels: number[];
}

/**
 * 제외할 각인서 타입 정의
 */
export interface ExceptedRelic {
  itemName: string;
  itemIcon: string;
  itemCurrentMinPrice: number;
}
