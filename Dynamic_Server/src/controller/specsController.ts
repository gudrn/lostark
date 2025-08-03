import { fnSpecCalculate } from '../utils/specsCalculate';
import { ItemResult } from '../utils/type';

export async function fnSpecCalanderFuntion(
  str_characterName: string,
): Promise<{ error?: string; name?: string; data?: ItemResult[] | null }> {
  if (!str_characterName) return { error: '캐릭터 이름이 제공되지 않았습니다.' };
  const result = await fnSpecCalculate(str_characterName);
  if (!result) throw new Error('캐릭터 정보를 찾을 수 없습니다.');
  return { name: str_characterName, data: result };
}

//아직 구현 안되어서 주석처리리
