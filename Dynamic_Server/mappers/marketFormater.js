export const mapMarketItem = (item) => ({
  itemName: item.Name,
  itemIcon: item.Icon,
  itemCurrentMinPrice: item.CurrentMinPrice,
});

// 아이템 배열에서 id, name, recentprice만 추출하는 함수
export function mapMarketforceItem(data) {
  if (!data || !Array.isArray(data.Items)) return [];
  return data.Items.map((item) => ({
    id: item.Id,
    name: item.Name,
    recentprice: item.RecentPrice,
  }));
}

// 보석 아이템 배열에서 Name, BuyPrice만 추출하는 함수
export function mapMarketgem(data){
  return {
    Name : data.Items[0].Name,
    BuyPrice : data.Items[0].AuctionInfo.BuyPrice,
  }
}