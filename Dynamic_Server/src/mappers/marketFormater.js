export const fnMapMarketItem = (item) => ({
  itemName: item.Name,
  itemIcon: item.Icon,
  itemCurrentMinPrice: item.CurrentMinPrice,
});

// 아이템 배열에서 id, name, recentprice만 추출하는 함수
// id, name, recentprice만 추출
export const fnMapMarketforceItem = (item) => ({
  id: item.Id,
  name: item.Name,
  icon: item.Icon,
  recentprice: item.RecentPrice,
});

// 보석 아이템 배열에서 Name, BuyPrice만 추출하는 함수
export const fnMapMarketgem = (data) => ({
  Name: data.Items[0].Name,
  BuyPrice: data.Items[0].AuctionInfo.BuyPrice,
});
