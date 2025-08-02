/**
 * 아머리 관련 타입 정의
 */

export interface ArmoryEngraving {
  name: string;
  grade: string;
  level: number;
}

export interface ArmoryEquipment {
  type: string;
  name: string;
  icon: string;
  grade: string;
  tooltip?: any;
}

export interface ArmoryGem {
  type: string;
  name: string;
  icon: string;
  grade: string;
}

export interface ArmoryCost {
  type: string;
  cost: number;
}
