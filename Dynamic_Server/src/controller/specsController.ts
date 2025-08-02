import { fnSpecCalculate } from '../utils/specsCalculate';
import { ItemResult } from '../utils/type';

export async function fnSpecCalanderFuntion(
  str_characterName: string,
): Promise<{ error?: string; name?: string; data?: ItemResult[] | null }> {
  try {
    if (!str_characterName) return { error: '캐릭터 이름이 제공되지 않았습니다.' };
    const result = await fnSpecCalculate(str_characterName);
    if (!result) throw new Error('캐릭터 정보를 찾을 수 없습니다.');
    return { name: str_characterName, data: result };
  } catch (e) {
    return {
      name: str_characterName,
      error: e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}
