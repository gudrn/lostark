// 필요한 타입 정의 (실제 데이터 구조에 맞게 수정 필요)
export interface ICharacterProfile {
  // 예시 필드, 실제 구조에 맞게 추가/수정
  ArmoryProfile?: any;
  [key: string]: any;
}

export interface IFormattedCharacter {
  // 예시 필드, 실제 구조에 맞게 추가/수정
  armoryEquipment?: any[];
  [key: string]: any;
}

export interface IGetCharacterResult {
  characterName?: string;
  data?: IFormattedCharacter;
  error?: string;
}
