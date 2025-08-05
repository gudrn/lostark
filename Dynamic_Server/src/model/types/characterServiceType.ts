import { ArmoryEngraving, ArmoryEquipment, ArmoryGem } from '../../types/armory';

/**
 * 캐릭터 프로필 타입 정의
 */
export interface ICharacterProfile {
  ArmoryProfile?: {
    CharacterName?: string;
    CharacterLevel?: number;
    CharacterClassName?: string;
    ItemMaxLevel?: string;
    ServerName?: string;
    CharacterImage?: string;
    ExpeditionLevel?: number;
    PvpGradeName?: string;
    TownLevel?: number;
    TownName?: string;
    Title?: string;
    GuildMemberGrade?: string;
    GuildName?: string;
    UsingSkillPoint?: number;
    TotalSkillPoint?: number;
    Stats?: Array<{
      Type?: string;
      Value?: number;
      Tooltip?: string[];
    }>;
    Tendencies?: Array<{
      Type?: string;
      Point?: number;
      MaxPoint?: number;
    }>;
    ServerMove?: string;
  };
  [key: string]: any;
}

/**
 * 포맷된 캐릭터 정보 타입 정의
 */
export interface IFormattedCharacter {
  armoryEquipment?: ArmoryEquipment[];
  armoryEngraving?: ArmoryEngraving[];
  armoryGem?: ArmoryGem[];
  characterName?: string;
  characterLevel?: number;
  characterClassName?: string;
  itemMaxLevel?: string;
  serverName?: string;
  characterImage?: string;
  expeditionLevel?: number;
  pvpGradeName?: string;
  townLevel?: number;
  townName?: string;
  title?: string;
  guildMemberGrade?: string;
  guildName?: string;
  usingSkillPoint?: number;
  totalSkillPoint?: number;
  stats?: Array<{
    type?: string;
    value?: number;
    tooltip?: string[];
  }>;
  tendencies?: Array<{
    type?: string;
    point?: number;
    maxPoint?: number;
  }>;
  // 추가 필드들
  armoryAvatars?: Array<{
    type: string;
    name: string;
    icon: string;
    grade: string;
    IsInner?: boolean;
  }>;
  armoryCard?: Array<{
    slot: number;
    name: string;
    icon: string;
    awakeCount: number;
    awakeTotal: number;
    grade: string;
  }>;
  ArkPassive?: {
    points: Array<{
      name: string;
      value: number;
      description: string;
    }>;
  };
  [key: string]: any;
}

/**
 * 캐릭터 조회 결과 타입 정의
 */
export interface IGetCharacterResult {
  characterName?: string;
  data?: IFormattedCharacter;
  error?: string;
  success?: boolean;
}
