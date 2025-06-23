import { lostarkConfig } from '../config/config.js';
import {
  mapStats,
  mapEquipmentDetail,
  mapAvatars,
  mapSkills,
  mapEngraving,
  mapCardDetail,
  mapCardEffects,
  mapGems,
  mapPassive,
} from '../mappers/characterFormatter.js';

export const fetchCharacterFromAPI = async (characterName) => {
  try {
    const response = await fetch(
      `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      }
    );

    if (!response.ok) {
      // 응답 코드가 4xx 또는 5xx인 경우
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`[fetchCharacterFromAPI] ${error.message}`);
    throw error; // 컨트롤러 단에서 처리하게 던져줌
  }
};

export const formatCharacterData = (result) => ({
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
});
