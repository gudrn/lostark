// 타입 정의

// 캐릭터의 스탯 정보 인터페이스
export interface Stat {
  Type: string;
  Value: number;
}

// 장비 정보 인터페이스
export interface Equipment {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  Level?: number;
  Tooltip?: string | object;
}

// 아바타 정보 인터페이스
export interface Avatar {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  IsInner?: boolean;
}

// 각인 효과 정보 인터페이스
export interface EngravingEffect {
  Name: string;
  Grade: string;
  Level: number;
}

// 각인 정보 인터페이스
export interface Engraving {
  ArkPassiveEffects: EngravingEffect[];
}

// 카드 정보 인터페이스
export interface Card {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
}

// 카드 상세 정보 인터페이스
export interface CardDetail {
  Slot: number;
  Name: string;
  Icon: string;
  AwakeCount: number;
  AwakeTotal: number;
  Grade: string;
}

// 카드 세트 정보 인터페이스
export interface CardSet {
  Cards: CardDetail[];
}

// 보석 아이템 정보 인터페이스
export interface GemItem {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
}

// 보석 세트 정보 인터페이스
export interface GemSet {
  Gems: GemItem[];
}

// 패시브 포인트 정보 인터페이스
export interface PassivePoint {
  Name: string;
  Value: number;
  Description: string;
}

// 패시브 정보 인터페이스
export interface Passive {
  Points: PassivePoint[];
}

// 캐릭터의 아머리 프로필 정보 인터페이스
export interface ArmoryProfile {
  CharacterImage: string;
  ExpeditionLevel: number;
  TownLevel: number;
  TownName: string;
  Title: string;
  GuildName: string;
  TotalSkillPoint: number;
  Stats: Stat[];
  Server: string;
  Name: string;
  Level: number;
  ClassName: string;
  ItemMaxLevel: string;
}

// 캐릭터 전체 결과 정보 인터페이스
export interface CharacterResult {
  ArmoryProfile: ArmoryProfile;
  ArmoryEquipment?: Equipment[];
  ArmoryAvatars?: Avatar[];
  ArmoryEngraving?: Engraving;
  ArmoryCard?: CardSet;
  ArmoryGem?: GemSet;
  ArkPassive?: Passive;
}
