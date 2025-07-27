import { lostarkConfig } from '../config/config';

// 캐릭터 정보 타입 정의 (필요에 따라 수정)
export interface CharacterInfo {
  // 예시 필드, 실제 API 응답에 맞게 수정 필요
  [key: string]: any;
}

// 캐릭터 정보를 API에서 가져오는 함수 (헝가리안 표기법 적용)
export const fnFetchCharacterFromApi = async (strCharacterName: string): Promise<CharacterInfo> => {
  try {
    const objResponse = await fetch(
      `${lostarkConfig.lostarkapiurl}/armories/characters/${encodeURIComponent(strCharacterName)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${lostarkConfig.lostarkapikey}`,
        },
      },
    );

    if (!objResponse.ok) {
      throw new Error(`API 요청 실패: ${objResponse.status} ${objResponse.statusText}`);
    }

    const objResult: CharacterInfo = await objResponse.json();
    return objResult;
  } catch (errError: any) {
    throw new Error(`❌ 캐릭터 정보 조회 실패: ${errError.message}`);
  }
};
