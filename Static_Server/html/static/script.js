// 유지보수를 위해 각 UI 업데이트를 함수로 분리하고, 상수 및 반복되는 코드를 정리했습니다.

document.getElementById("searchButton").addEventListener("click", () => {
  const name = document.getElementById("searchInput").value.trim();
  if (name) {
    loadCharacter(name);
  }
});

// 상수 정의
const EQUIPMENT_TYPES = ["무기", "투구", "상의", "하의", "장갑", "어깨"];
const ACCESSORY_TYPES = ["목걸이", "귀걸이", "반지"];

// 프로필 표시 함수 (여러 줄로 표시)
function renderProfile(result, data) {
  const charImage = document.getElementById("charImage");
  charImage.src = result.characterImage;

  const charName = document.getElementById("charName");
  charName.textContent = data.characterName;

  const charDetails = document.getElementById("charDetails");
  // 여러 줄로 표시하기 위해 <br> 태그 사용
  charDetails.innerHTML =
    "원정대 Lv." +
    result.expeditionLevel +
    "<br>" +
    "영지 Lv." +
    result.townLevel +
    " (" +
    result.townName +
    ")" +
    "<br>" +
    result.title +
    "<br>" +
    "길드: " +
    result.guildName;
}

// 능력치 표시 함수
function renderStats(stats) {
  const statsList = document.getElementById("statsList");
  statsList.innerHTML = "";
  if (Array.isArray(stats)) {
    stats.forEach((stat) => {
      const div = document.createElement("div");
      div.classList.add("stat-item");
      div.textContent = `${stat.type}: ${stat.value}`;
      statsList.appendChild(div);
    });
  }
}

// 장비 및 악세서리 표시 함수
function renderEquipmentAndAccessories(equipmentArr) {
  const equipmentList = document.getElementById("equipmentList");
  const accessoryList = document.getElementById("accessoryList");
  equipmentList.innerHTML = "";
  accessoryList.innerHTML = "";

  if (Array.isArray(equipmentArr)) {
    equipmentArr.forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${item.icon}" alt="${item.type}">
        <div>${item.type}</div>
        <div>${item.name}</div>
        <div>[${item.grade}]</div>
      `;

      if (EQUIPMENT_TYPES.includes(item.type)) {
        div.classList.add("equipment-item");
        equipmentList.appendChild(div);
      } else if (ACCESSORY_TYPES.includes(item.type)) {
        div.classList.add("accessory-item");
        accessoryList.appendChild(div);
      }
    });
  }
}

// 아바타 표시 함수 (IsInner만)
function renderAvatars(avatars) {
  const avatarList = document.getElementById("avatarList");
  avatarList.innerHTML = "";
  if (Array.isArray(avatars)) {
    avatars
      .filter((avatar) => avatar.IsInner)
      .forEach((avatar) => {
        const div = document.createElement("div");
        div.classList.add("avatar-item");
        div.innerHTML = `
          <img src="${avatar.icon}" alt="${avatar.type}">
          <div>${avatar.type}</div>
          <div>${avatar.name}</div>
          <div>[${avatar.grade}]</div>
        `;
        avatarList.appendChild(div);
      });
  }
}

// 보석 툴팁 생성 함수
function createGemTooltip() {
  let gemTooltip = document.getElementById("gemTooltip");
  if (!gemTooltip) {
    gemTooltip = document.createElement("div");
    gemTooltip.id = "gemTooltip";
    gemTooltip.className = "gem-tooltip";
    gemTooltip.style.display = "none";
    document.body.appendChild(gemTooltip);
  }
  return gemTooltip;
}

// 보석 표시 함수
function renderGems(gemData) {
  const gemList = document.getElementById("gemList");
  gemList.innerHTML = "";
  const gemTooltip = createGemTooltip();

  if (Array.isArray(gemData)) {
    // 숫자가 높은 보석부터 앞으로 정렬
    const sortedGems = [...gemData].sort((a, b) => {
      // 숫자 기준: name에 숫자가 있으면 그걸로, 없으면 0
      // 예: "멸화의 보석 10단계"에서 10 추출
      const getGemLevel = (gem) => {
        const match = gem.name && gem.name.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getGemLevel(b) - getGemLevel(a);
    });

    sortedGems.forEach((gem) => {
      const div = document.createElement("div");
      div.classList.add("gem-item");
      div.innerHTML = `<img src="${gem.icon}" alt="Gem">`;

      // 마우스 오버 시 툴팁 표시
      div.addEventListener("mouseenter", (e) => {
        gemTooltip.innerHTML = `
          <strong>${gem.name}</strong><br>
          등급: ${gem.grade}<br>
          ${
            gem.tooltip
              ? `<div style="margin-top:6px;">${gem.tooltip}</div>`
              : ""
          }
        `;
        gemTooltip.style.display = "block";
      });

      // 마우스 이동 시 툴팁 위치 조정
      div.addEventListener("mousemove", (e) => {
        const offset = 15;
        gemTooltip.style.left = e.clientX + offset + "px";
        gemTooltip.style.top = e.clientY + offset + "px";
      });

      // 마우스 아웃 시 툴팁 숨김
      div.addEventListener("mouseleave", () => {
        gemTooltip.style.display = "none";
      });

      gemList.appendChild(div);
    });
  }
}

// 메인 캐릭터 로드 함수
async function loadCharacter(name) {
  try {
    const response = await fetch(`/character?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
      alert("캐릭터 정보를 불러오지 못했습니다.");
      return;
    }
    const data = await response.json();
    const result = data.data;
    const container = document.getElementById("characterContainer");
    container.style.display = "block";

    renderProfile(result, data);
    renderStats(result.stats);
    renderEquipmentAndAccessories(result.armoryEquipment);
    renderAvatars(result.armoryAvatars);

    // 보석 데이터는 result.armoryGem 또는 data.armoryGem에서 가져옴
    const gemData = result?.armoryGem || data.armoryGem;
    renderGems(gemData);
  } catch (error) {
    alert("캐릭터 정보를 불러오는 중 오류가 발생했습니다.");
    console.error(error);
  }
}
