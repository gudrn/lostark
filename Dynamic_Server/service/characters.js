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
} from './mappers/characterMappers.js';
import { errorMiddleware } from '../middware/errormiddware.js';

export const getCharacters = async (characterName) => {
  let response;
  try {
    response = await fetch(`${lostarkConfig.lostarkapiurl}/characters/${characterName}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
      },
    });
  } catch (error) {
    errorMiddleware(error);
    return null;
  }

  // 응답이 404 또는 400 등 캐릭터가 없을 때
  if (!response.ok) {
    // 404 등 캐릭터가 없는 경우 null 반환
    if (response.status === 404) {
      return null;
    }
    // 기타 에러는 콘솔에 출력 후 null 반환
    console.error(`캐릭터 정보를 불러오는 중 오류 발생: ${response.status}`);
    return null;
  }

  let result = await response.json();

  // ArmoryProfile이 없으면 캐릭터가 없는 것으로 간주
  if (!result.ArmoryProfile) {
    return null;
  }

  let character = {
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
    armoryPassive: mapPassive(result.ArmoryPassive),
  };

  return character;
};
