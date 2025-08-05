import { lostarkConfig } from '../config/config';
import { ExternalApiError } from '../utils/customError';

/**
 * 캐릭터 정보 타입 정의 (API 응답에 맞게 확장 가능)
 */
export interface CharacterInfo {
  [key: string]: any;
}

/**
 * 캐릭터 정보를 API에서 가져오는 함수
 * 에러 처리는 catch 블록에서만 수행
 *
 * 만약 응답이 JSON이 아니거나 파싱에 실패하면 ExternalApiError를 발생시킴
 */
export const fnFetchCharacterFromApi = async (strCharacterName: string): Promise<CharacterInfo> => {
  let response;
  try {
    response = await fetch(
      `${lostarkConfig.lostarkapiurl}/armories/characters/${encodeURIComponent(strCharacterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      },
    );
  } catch (err) {
    throw new ExternalApiError('캐릭터 정보 조회 중 알 수 없는 에러 발생', 500);
  }

  if (!response.ok) throw new ExternalApiError('캐릭터 정보 조회 실패', response.status);

  try {
    const data: CharacterInfo = await response.json();
    return data;
  } catch (err) {
    throw new ExternalApiError('캐릭터 정보 응답 파싱 실패 (유효하지 않은 JSON)', response.status);
  }
};
