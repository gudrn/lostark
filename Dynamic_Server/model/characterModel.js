import { lostarkConfig } from '../config/config.js';

// 캐릭터 정보를 API에서 가져오는 함수 (헝가리안 표기법 적용)
export async function fnFetchCharacterFromApi(strCharacterName) {
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

    const objResult = await objResponse.json();
    return objResult;
  } catch (errError) {
    throw new Error(`❌ 캐릭터 정보 조회 실패: ${errError.message}`);
  }
}
