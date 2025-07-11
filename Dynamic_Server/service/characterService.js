// 아이템 배열에서 id, name, recentprice만 추출하는 함수
export function pickItemsIdNamePrice(data) {
  if (!data || !Array.isArray(data.Items)) return [];
  return data.Items.map((item) => ({
    id: item.Id,
    name: item.Name,
    recentprice: item.RecentPrice,
  }));
}
