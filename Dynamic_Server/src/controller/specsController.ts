export async function fnSpecCalanderFuntion(
  str_characterName: string,
): Promise<{ error?: string }> {
  try {
    if (!str_characterName) return { error: '캐릭터 이름이 제공되지 않았습니다.' };
    // 추가 로직은 여기에 작성
    return {};
  } catch (e) {
    return { error: '알 수 없는 오류가 발생했습니다.' };
  }
}
