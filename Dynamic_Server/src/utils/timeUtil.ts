// 오늘 날짜(한국 시간) 문자열 반환 함수 (타입스크립트 버전)
export function getTodayStringKST(): string {
  const now = new Date();

  // 한국 시간으로 변환
  const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const year = kstNow.getFullYear();
  const month = String(kstNow.getMonth() + 1).padStart(2, '0');
  const day = String(kstNow.getDate()).padStart(2, '0');
  const hour = String(kstNow.getHours()).padStart(2, '0');
  const minute = String(kstNow.getMinutes()).padStart(2, '0');
  const second = String(kstNow.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
