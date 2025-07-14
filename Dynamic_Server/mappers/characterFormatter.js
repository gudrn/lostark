// 각 파트별로 분리된 매핑 함수들
// 캐릭터 정보 매핑
export const mapStats = (stats) =>
  stats?.map((stat) => ({
    type: stat.Type,
    value: stat.Value,
  })) ?? [];

// 장비 정보 매핑
export const mapEquipmentSimple = (equipments) =>
  equipments?.map((equipment) => ({
    equipmentName: equipment.Name,
    equipmentLevel: equipment.Level,
  })) ?? [];

export const mapEquipmentDetail = (equipments) =>
  equipments?.map((equipment) => ({
    type: equipment.Type,
    name: equipment.Name,
    icon: equipment.Icon,
    grade: equipment.Grade,
  })) ?? [];

// 아바타 정보 매핑
export const mapAvatars = (avatars) =>
  avatars?.map((avatar) => ({
    type: avatar.Type,
    name: avatar.Name,
    icon: avatar.Icon,
    grade: avatar.Grade,
  })) ?? [];

// 스킬 정보 매핑
export const mapSkills = (skills) =>
  skills?.map((skill) => ({
    name: skill.Name,
    icon: skill.Icon,
    level: skill.Level,
    type: skill.Type,
    skillType: skill.SkillType,
    tripods: skill.Tripods,
    rune: skill.Rune,
    tooltip: skill.Tooltip,
  })) ?? [];

// 문장 정보 매핑
export const mapEngraving = (engraving) =>
  engraving && engraving.ArkPassiveEffects
    ? engraving.ArkPassiveEffects.map((effect) => ({
        name: effect.Name,
        grade: effect.Grade,
        level: effect.Level,
        description: effect.Description,
        abilityStoneLevel: effect.AbilityStoneLevel,
      }))
    : [];

// 카드 정보 매핑
export const mapCardSimple = (card) =>
  card?.map((card) => ({
    type: card.Type,
    name: card.Name,
    icon: card.Icon,
    grade: card.Grade,
  })) ?? [];

// 카드 상세 정보 매핑
export const mapCardDetail = (card) =>
  card && card.Cards
    ? card.Cards.map((card) => ({
        slot: card.Slot,
        name: card.Name,
        icon: card.Icon,
        awakeCount: card.AwakeCount,
        awakeTotal: card.AwakeTotal,
        grade: card.Grade,
        tooltip: card.Tooltip,
      }))
    : [];

// 카드 효과 정보 매핑
export const mapCardEffects = (card) =>
  card && card.Effects
    ? card.Effects.map((effect) => ({
        index: effect.Index,
        cardSlots: effect.CardSlots,
        items: effect.Items,
      }))
    : [];

// 보석 정보 매핑
export const mapGems = (gem) =>
  gem && gem.Gems
    ? gem.Gems.map((gem) => ({
        type: gem.Type,
        name: gem.Name.replace(/<[^>]*>/g, '').trim(),
        icon: gem.Icon,
        grade: gem.Grade,
      }))
    : [];

// 패시브 정보 매핑
export const mapPassive = (passive) =>
  passive && passive.Points
    ? {
        points: passive.Points.map((point) => ({
          name: point.Name,
          value: point.Value,
        })),
      }
    : { points: [] };

// 캐릭터 데이터를 포맷팅하는 함수
export function formatCharacterData(result) {
  return {
    charaterimage: result.ArmoryProfile.CharacterImage,
    expeditionLevel: result.ArmoryProfile.ExpeditionLevel,
    pvpGradeName: result.ArmoryProfile.PvpGradeName,
    townLevel: result.ArmoryProfile.TownLevel,
    townName: result.ArmoryProfile.TownName,
    title: result.ArmoryProfile.Title,
    guildName: result.ArmoryProfile.GuildName,
    usingSkillPoint: result.ArmoryProfile.UsingSkillPoint,
    totalSkillPoint: result.ArmoryProfile.TotalSkillPoint,
    stats: mapStats(result.ArmoryProfile.Stats),
    serverName: result.ArmoryProfile.Server,
    characterName: result.ArmoryProfile.Name,
    characterLevel: result.ArmoryProfile.Level,
    characterClassName: result.ArmoryProfile.ClassName,
    itemMaxLevel: result.ArmoryProfile.ItemMaxLevel,
    armoryEquipment: mapEquipmentDetail(result.ArmoryEquipment),
    armoryAvatars: mapAvatars(result.ArmoryAvatars),
    armorySkills: mapSkills(result.ArmorySkills),
    armoryEngraving: mapEngraving(result.ArmoryEngraving),
    armoryCard: mapCardDetail(result.ArmoryCard),
    armoryCardEffects: mapCardEffects(result.ArmoryCard),
    armoryGem: mapGems(result.ArmoryGem),
    ArkPassive: mapPassive(result.ArkPassive),
  };
}
