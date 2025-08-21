// 공통적으로 아이템을 렌더링하는 함수
function renderItemList(list, container, renderFn) {
  container.innerHTML = "";
  list.forEach((item) => {
    const div = renderFn(item);
    container.appendChild(div);
  });
}

// 보석 렌더링 함수
function renderGemItem(gem) {
  const div = document.createElement("div");
  div.classList.add("gem-item");
  div.innerHTML = `
    <div>${gem.name}</div>
    <div class="price">${gem.buyPrice.toLocaleString()} G</div>
  `;
  return div;
}

// 각인서 렌더링 함수
function renderRelicItem(relic) {
  const div = document.createElement("div");
  div.classList.add("relic-item");
  div.innerHTML = `
    <img src="${relic.itemIcon}" alt="${relic.itemName}">
    <div>${relic.itemName}</div>
    <div class="price">${relic.itemCurrentMinPrice.toLocaleString()} G</div>
  `;
  return div;
}

// 재료 렌더링 함수
function renderForceItem(force) {
  const div = document.createElement("div");
  div.classList.add("force-item");
  div.innerHTML = `
    <img src="${force.icon}" alt="${force.name}">
    <div>${force.name}</div>
    <div class="price">${force.recentprice.toLocaleString()} G</div>
  `;
  return div;
}

// 보석 분류 함수
function classifyGems(gems) {
  const geobhwaList = [];
  const jakyeolList = [];
  const otherGemList = [];
  gems.forEach((gem) => {
    if (gem.name.includes("겁화")) {
      geobhwaList.push(gem);
    } else if (gem.name.includes("작열")) {
      jakyeolList.push(gem);
    } else {
      otherGemList.push(gem);
    }
  });
  return { geobhwaList, jakyeolList, otherGemList };
}

async function loadMarketItems() {
  const response = await fetch("/market/items");
  const data = await response.json();

  // DOM 요소 캐싱
  const geobhwaGemList = document.getElementById("geobhwaGemList");
  const jakyeolGemList = document.getElementById("jakyeolGemList");
  const relicList = document.getElementById("relicList");
  const forceList = document.getElementById("forceList");

  // 보석 분류 및 렌더링
  const { geobhwaList, jakyeolList } = classifyGems(data.Gem);
  renderItemList(geobhwaList, geobhwaGemList, renderGemItem);
  renderItemList(jakyeolList, jakyeolGemList, renderGemItem);

  // 각인서 렌더링
  renderItemList(data.Relic, relicList, renderRelicItem);

  // 재료 렌더링
  renderItemList(data.Force, forceList, renderForceItem);
}

loadMarketItems();
