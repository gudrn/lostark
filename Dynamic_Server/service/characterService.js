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
} from './mappers/characterMappers.js';
import { errorMiddleware } from '../middware/errormiddware.js';

export const getCharacters = async (characterName) => {
  let response;
  try {
    response = await fetch(
      `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      },
    );
  } catch (error) {
    errorMiddleware(new Error('캐릭터 정보를 불러오는 중 오류 발생'));
  }

  let result = await response.json();
  if (!result) {
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
    ArkPassive: mapPassive(result.ArkPassive),
  };

  return character;
};
