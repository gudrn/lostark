import { MarketCode } from './types/types';

export const marketCode: MarketCode = {
  all: '', // 전체 카테고리 (기본값)

  // 장비 상자
  equipmentBoxAll: 10100, // 장비 상자 전체

  // 아바타 관련
  avatarWeapon: 20005, // 아바타 무기
  avatarHead: 20010, // 아바타 머리
  avatarFace1: 20020, // 아바타 얼굴1
  avatarFace2: 20030, // 아바타 얼굴2
  avatarTop: 20050, // 아바타 상의
  avatarBottom: 20060, // 아바타 하의
  avatarSet: 20070, // 아바타 세트
  avatarInstrument: 21400, // 아바타 악기
  avatarBox: 21500, // 아바타 상자
  avatarMoveEffect: 21600, // 아바타 이동 효과
  avatarAll: 20000, // 아바타 전체

  // 유물 관련
  relicAll: 40000, // 유물 전체 (주로 각인서)

  // 강화 재료
  reinforce: 50010, // 강화 재료 > 재련 재료
  reinforceAdd: 50020, // 강화 재료 > 재련 추가 재료
  reinforceEtc: 51000, // 강화 재료 > 기타 재료
  reinforceWeaponEvo: 51100, // 강화 재료 > 무기 진화 재료
  reinforceAll: 50000, // 강화 재료 전체

  // 배틀 아이템
  battleItemHeal: 60200, // 배틀 아이템 > 회복형
  battleItemAttack: 60300, // 배틀 아이템 > 공격형
  battleItemFunction: 60400, // 배틀 아이템 > 기능성
  battleItemBuff: 60500, // 배틀 아이템 > 버프형
  battleItemAll: 60000, // 배틀 아이템 전체

  // 음식
  foodAll: 70000, // 음식 전체

  // 생활 재료
  lifePlant: 90200, // 생활 재료 > 채집
  lifeLumber: 90300, // 생활 재료 > 벌목
  lifeMine: 90400, // 생활 재료 > 채광
  lifeHunt: 90500, // 생활 재료 > 수렵
  lifeFish: 90600, // 생활 재료 > 낚시
  lifeArchaeology: 90700, // 생활 재료 > 고고학
  lifeEtc: 90800, // 생활 재료 > 기타
  lifeAll: 90000, // 생활 재료 전체

  // 모험의 서
  adventureBook: 100000, // 모험의 서 아이템

  // 항해
  sailingMaterial: 110100, // 항해 재료
  sailingSkin: 110110, // 항해 스킨
  sailingMaterialBox: 111900, // 항해 재료 상자
  sailingAll: 110000, // 항해 전체

  // 펫
  pet: 140100, // 펫
  petBox: 140200, // 펫 상자
  petAll: 140000, // 펫 전체

  // 탈것
  mount: 160100, // 탈것
  mountBox: 160200, // 탈것 상자
  mountAll: 160000, // 탈것 전체

  // 기타
  etc: 170000, // 기타

  // 보석
  gem: 210000, // 보석
  gemBox: 220000, // 보석 상자
};
