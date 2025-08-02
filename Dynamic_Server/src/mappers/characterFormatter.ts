// 각 파트별로 분리된 매핑 함수들
import {
  Equipment,
  Stat,
  Avatar,
  Engraving,
  Card,
  CardSet,
  GemSet,
  Passive,
  CharacterResult,
} from './types/characterTypes';
import { IFormattedCharacter } from '../service/types/characterServiceType';

// 캐릭터 정보 매핑
export const fnMapStats = (stats?: Stat[]): { type: string; value: number }[] =>
  stats?.map((stat) => ({
    type: stat.Type,
    value: stat.Value,
  })) ?? [];

// 장비 정보 매핑
export const fnMapEquipmentSimple = (
  equipments?: Equipment[],
): { equipmentName: string; equipmentLevel?: number }[] =>
  equipments?.map((equipment) => ({
    equipmentName: equipment.Name,
    equipmentLevel: equipment.Level,
  })) ?? [];

// HTML 태그 제거 함수
const removeHtmlTags = (value: any): any => {
  if (typeof value === 'string') {
    // </FONT>을 \n으로 바꾸고, 나머지 HTML 태그 제거
    return value.replace(/<\/FONT>/gi, ' ').replace(/<[^>]*>/g, '');
  }
  if (Array.isArray(value)) {
    return value.map(removeHtmlTags);
  }
  if (typeof value === 'object' && value !== null) {
    // 객체라면 모든 key에 대해 재귀적으로 처리
    const result: any = {};
    for (const key in value) {
      result[key] = removeHtmlTags(value[key]);
    }
    return result;
  }
  return value;
};

// Tooltip 파싱 함수 수정
const parseTooltip = (tooltip: string | object): any => {
  try {
    // tooltip이 문자열이면 JSON 파싱, 아니면 그대로 사용
    const tooltipObj = typeof tooltip === 'string' ? JSON.parse(tooltip) : tooltip;
    // HTML 태그 제거 함수 적용
    return removeHtmlTags(tooltipObj);
  } catch (e) {
    // 파싱 실패 시 문자열이면 HTML 태그만 제거, 아니면 원본 반환
    if (typeof tooltip === 'string') {
      return removeHtmlTags(tooltip);
    }
    return tooltip;
  }
};

export const fnMapEquipmentDetail = (
  equipments?: Equipment[],
): {
  type: string;
  name: string;
  icon: string;
  grade: string;
  tooltip: any;
}[] =>
  equipments?.map((equipment) => ({
    type: equipment.Type,
    name: equipment.Name,
    icon: equipment.Icon,
    grade: equipment.Grade,
    tooltip: equipment.Tooltip ? parseTooltip(equipment.Tooltip) : undefined,
  })) ?? [];

// 아바타 정보 매핑
export const fnMapAvatars = (
  avatars?: Avatar[],
): {
  type: string;
  name: string;
  icon: string;
  grade: string;
  IsInner?: boolean;
}[] =>
  avatars?.map((avatar) => ({
    type: avatar.Type,
    name: avatar.Name,
    icon: avatar.Icon,
    grade: avatar.Grade,
    IsInner: avatar.IsInner,
  })) ?? [];

// 각인 정보 매핑
export const fnMapEngraving = (
  engraving?: Engraving,
): {
  name: string;
  grade: string;
  level: number;
}[] =>
  engraving && engraving.ArkPassiveEffects
    ? engraving.ArkPassiveEffects.map((effect) => ({
        name: effect.Name,
        grade: effect.Grade,
        level: effect.Level,
      }))
    : [];

// 카드 정보 매핑
export const fnMapCardSimple = (
  card?: Card[],
): {
  type: string;
  name: string;
  icon: string;
  grade: string;
}[] =>
  card?.map((card) => ({
    type: card.Type,
    name: card.Name,
    icon: card.Icon,
    grade: card.Grade,
  })) ?? [];

// 카드 상세 정보 매핑
export const fnMapCardDetail = (
  card?: CardSet,
): {
  slot: number;
  name: string;
  icon: string;
  awakeCount: number;
  awakeTotal: number;
  grade: string;
}[] =>
  card && card.Cards
    ? card.Cards.map((card) => ({
        slot: card.Slot,
        name: card.Name,
        icon: card.Icon,
        awakeCount: card.AwakeCount,
        awakeTotal: card.AwakeTotal,
        grade: card.Grade,
      }))
    : [];

// 보석 정보 매핑
export const fnMapGems = (
  gem?: GemSet,
): {
  type: string;
  name: string;
  icon: string;
  grade: string;
}[] =>
  gem && gem.Gems
    ? gem.Gems.map((gem) => ({
        type: gem.Type,
        name: gem.Name.replace(/<[^>]*>/g, ''),
        icon: gem.Icon,
        grade: gem.Grade,
      }))
    : [];

// 패시브 정보 매핑
export const fnMapPassive = (
  passive?: Passive,
): {
  points: {
    name: string;
    value: number;
    description: string;
  }[];
} =>
  passive && passive.Points
    ? {
        points: passive.Points.map((point) => ({
          name: point.Name,
          value: point.Value,
          description: point.Description,
        })),
      }
    : { points: [] };

// 캐릭터 데이터를 포맷팅하는 함수
export const fnFormatCharacterData = (result: CharacterResult): IFormattedCharacter => ({
  characterImage: result.ArmoryProfile.CharacterImage,
  expeditionLevel: result.ArmoryProfile.ExpeditionLevel,
  townLevel: result.ArmoryProfile.TownLevel,
  townName: result.ArmoryProfile.TownName,
  title: result.ArmoryProfile.Title,
  guildName: result.ArmoryProfile.GuildName,
  totalSkillPoint: result.ArmoryProfile.TotalSkillPoint,
  stats: fnMapStats(result.ArmoryProfile.Stats),
  serverName: result.ArmoryProfile.Server,
  characterName: result.ArmoryProfile.Name,
  characterLevel: result.ArmoryProfile.Level,
  characterClassName: result.ArmoryProfile.ClassName,
  itemMaxLevel: result.ArmoryProfile.ItemMaxLevel,
  armoryEquipment: fnMapEquipmentDetail(result.ArmoryEquipment),
  armoryAvatars: fnMapAvatars(result.ArmoryAvatars),
  armoryEngraving: fnMapEngraving(result.ArmoryEngraving),
  armoryCard: fnMapCardDetail(result.ArmoryCard),
  armoryGem: fnMapGems(result.ArmoryGem),
  ArkPassive: fnMapPassive(result.ArkPassive),
});
