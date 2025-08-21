const TAX_RATE = 5; // 세율 상수

let relicData = [];

// 유물 각인서 데이터 불러오기
async function loadRelicData() {
  try {
    const response = await fetch("/market/items");
    const data = await response.json();
    relicData = Array.isArray(data.Relic) ? data.Relic : [];
  } catch (error) {
    console.error("유물 각인서 데이터 로드 실패:", error);
    relicData = [];
  }
}

// 문자열 공백 제거 후 부분 일치 여부 반환
function isPartialMatch(str, keyword) {
  return str.replace(/\s/g, "").includes(keyword.replace(/\s/g, ""));
}

// 각인서 이름으로 유물 각인서 찾기
function findRelicByName(name) {
  return relicData.find((item) => isPartialMatch(item.itemName, name));
}

// 가격, 파티원 수 유효성 검사
function validateInputs(itemPrice, partySize) {
  return !(isNaN(itemPrice) || isNaN(partySize));
}

// 세금 계산
function calculateTax(price, taxRate = TAX_RATE) {
  return Math.ceil((price * taxRate) / 100);
}

// 분배금 계산
function calculateShare(afterTax, partySize) {
  return Math.ceil(afterTax / partySize);
}

// 직접 사용 입찰가 계산
function calculateDirectBid(afterTax, taxAmount, partySize) {
  return Math.ceil(((afterTax + taxAmount) * (partySize - 1)) / partySize);
}

// 손익분기점 입찰가 계산
function calculateBreakEvenBid(directBid) {
  return Math.ceil(directBid * 0.95);
}

// 판매차익 목표 계산 (분배금 × 2)
function calculateSellProfitTarget(share) {
  return share * 2;
}

// 판매 입찰가 및 분배금 계산
function calculateSellBidAndShare(afterTax, sellProfitTarget, partySize) {
  const sellBid = afterTax - sellProfitTarget;
  const sellShare = Math.ceil(sellBid / (partySize - 1));
  return { sellBid, sellShare };
}

// 결과 HTML 생성
function renderResult({
  directBid,
  share,
  sellBid,
  sellShare,
  taxAmount,
  sellProfitTarget,
}) {
  return `
    <h3>직접 사용</h3>
    <p>입찰 적정가: ${directBid.toLocaleString()} G</p>
    <p>분배금: ${share.toLocaleString()} G</p>

    <h3>판매</h3>
    <p>입찰 적정가: ${sellBid.toLocaleString()} G</p>
    <p>분배금: ${sellShare.toLocaleString()} G</p>
    <p>판매 수수료: ${taxAmount.toLocaleString()} G</p>
    <p>판매 차익: ${sellProfitTarget.toLocaleString()} G</p>
  `;
}

// 각인서 검색 버튼 이벤트
document.getElementById("searchEngraving").addEventListener("click", () => {
  const name = document.getElementById("engravingName").value.trim();

  if (!name) {
    alert("검색할 각인서 이름을 입력하세요.");
    return;
  }

  const engraving = findRelicByName(name);

  if (engraving) {
    document.getElementById("itemPrice").value = engraving.itemCurrentMinPrice;
  } else {
    alert("해당 이름의 유물 각인서를 찾을 수 없습니다.");
  }
});

// 계산 버튼 이벤트
document.getElementById("calculateButton").addEventListener("click", () => {
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);
  const partySize = parseInt(
    document.querySelector('input[name="partySize"]:checked').value,
    10
  );
  const resultBox = document.getElementById("result");

  if (!validateInputs(itemPrice, partySize)) {
    resultBox.innerHTML = `<p style="color:red;">모든 값을 올바르게 입력하세요.</p>`;
    return;
  }

  const taxAmount = calculateTax(itemPrice);
  const afterTax = itemPrice - taxAmount;
  const share = calculateShare(afterTax, partySize);
  const directBid = calculateDirectBid(afterTax, taxAmount, partySize);
  const sellProfitTarget = calculateSellProfitTarget(share);
  const { sellBid, sellShare } = calculateSellBidAndShare(
    afterTax,
    sellProfitTarget,
    partySize
  );

  resultBox.innerHTML = renderResult({
    directBid,
    share,
    sellBid,
    sellShare,
    taxAmount,
    sellProfitTarget,
  });
});

// 데이터 로드
loadRelicData();
