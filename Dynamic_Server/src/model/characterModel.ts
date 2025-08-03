import { lostarkConfig } from '../config/config';
import { ExternalApiError, ValidationError } from '../utils/customError';

/**
 * 캐릭터 정보 타입 정의 (API 응답에 맞게 확장 가능)
 */
export interface CharacterInfo {
  [key: string]: any;
}

/**
 * 캐릭터 정보를 API에서 가져오는 함수
 * 에러 처리는 catch 블록에서만 수행
 */
export const fnFetchCharacterFromApi = async (strCharacterName: string): Promise<CharacterInfo> => {
  try {
    const response = await fetch(
      `${lostarkConfig.lostarkapiurl}/armories/characters/${encodeURIComponent(strCharacterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      },
    );

    const data: CharacterInfo = await response.json();

    return data;
  } catch (error: any) {
    // 모든 에러를 ValidationError로 래핑해서 throw
    throw new ExternalApiError(`API 요청 중 에러 발생: ${error.message}`);
  }
};
