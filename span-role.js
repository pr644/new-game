let coins = 100;
const coinDisplay = document.getElementById("coin-count");
const avatarDisplay = document.getElementById("avatar");
const costumesContainer = document.getElementById("costumes-container");


const roles = [
  { name: "Pirate", icon: "🏴‍☠️", description: "Sail the seas!", progress: 20 },
  { name: "Scientist", icon: "🔬", description: "Discover inventions!", progress: 50 },
  { name: "Explorer", icon: "🧭", description: "Travel the world!", progress: 0 },
  { name: "Superhero", icon: "🦸", description: "Save the day!", progress: 75 }
];

const missions = {
  Pirate: ["Find treasure", "Fight ship", "Collect coins"],
  Scientist: ["Build robot", "Mix potions", "Experiment safely"],
  Explorer: ["Map new land", "Climb mountains", "Discover ruins"],
  Superhero: ["Save citizens", "Stop villains", "Protect city"]
};


const roleCostumes = {
  Pirate: ["🏴‍☠️", "🦜", "⚓️"],
  Scientist: ["🔬", "🧪", "👓"],
  Explorer: ["🧭", "🎒", "👢"],
  Superhero: ["🦸", "🦹", "🛡️"]
};


const unlockedItems = {
  Pirate: ["Pirate Hat", "Eye Patch", "Golden Sword"],
  Scientist: ["Lab Coat", "Glasses", "Potion"],
  Explorer: ["Backpack", "Compass", "Boots"],
  Superhero: ["Cape", "Mask", "Shield"]
};

function updateCoins() {
  coinDisplay.textContent = coins;
}


function renderRoles() {
  const container = document.getElementById("roles-container");
  container.innerHTML = "";
  roles.forEach(role => {
    const card = document.createElement("div");
    card.className = "role-card";
    card.innerHTML = `
      <div class="role-icon">${role.icon}</div>
      <h3>${role.name}</h3>
      <p>${role.description}</p>
      <div class="progress-bar"><div style="width:${role.progress}%"></div></div>
    `;
    card.onclick = () => selectRole(role.name);
    container.appendChild(card);
  });
}


function selectRole(roleName) {
  renderMissions(roleName);
  renderItems(roleName);
  renderCostumes(roleName);
  avatarDisplay.textContent = roleCostumes[roleName][0]; 
  alert(`🎉 You selected ${roleName}!`);
}


function renderMissions(roleName) {
  const container = document.getElementById("missions-container");
  container.innerHTML = "";
  missions[roleName].forEach((mission, i) => {
    const card = document.createElement("div");
    card.className = "mission-card";
    card.innerHTML = `<p>📝 ${mission}</p><button onclick="completeMission('${roleName}', ${i})">Complete</button>`;
    container.appendChild(card);
  });
}


function completeMission(roleName, index) {
  alert(`✅ Mission "${missions[roleName][index]}" completed! You earned 10 coins.`);
  coins += 10;
  updateCoins();
}


function renderItems(roleName) {
  const container = document.getElementById("items-container");
  container.innerHTML = "";
  unlockedItems[roleName].forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `<p>🎁 ${item}</p>`;
    container.appendChild(card);
  });
}


function renderCostumes(roleName) {
  costumesContainer.innerHTML = "";
  roleCostumes[roleName].forEach(costume => {
    const card = document.createElement("div");
    card.className = "costume-card";
    card.innerHTML = `<span>${costume}</span>`;
    card.onclick = () => avatarDisplay.textContent = costume;
    costumesContainer.appendChild(card);
  });
}


updateCoins();
renderRoles();
