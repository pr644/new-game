
let highestLevelCompleted = 0;
let coins = 100;


function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("skw_progress"));
  if (saved) {
    highestLevelCompleted = saved.highestLevelCompleted;
    coins = saved.coins;
  }
}

function saveProgress() {
  localStorage.setItem(
    "skw_progress",
    JSON.stringify({ highestLevelCompleted, coins })
  );
}


function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  if (music.paused) {
    music.play();
    btn.textContent = "🔊";
  } else {
    music.pause();
    btn.textContent = "🔇";
  }
}


function login(type) {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("user-info").classList.remove("hidden");

  const userName = document.getElementById("user-name");
  const userPic = document.getElementById("user-pic");

  if (type === "google") {
    userName.textContent = "Google Kid";
    userPic.src = "https://www.svgrepo.com/show/475656/google-color.svg";
  } else if (type === "facebook") {
    userName.textContent = "Facebook Kid";
    userPic.src = "https://www.svgrepo.com/show/475647/facebook-color.svg";
  } else {
    userName.textContent = "Guest Kid";
    userPic.src = "https://img.favpng.com/8/7/18/avatar-child-computer-icons-user-profile-png-favpng-MzLAeL5t4QkeLit56jc7DdPUC.jpg";
  }
}


function startGame() {
  document.getElementById("user-info").classList.add("hidden");
  document.getElementById("lobby").classList.remove("hidden");
  document.getElementById("lobby-username").textContent =
    document.getElementById("user-name").textContent;
  document.getElementById("coin-count").textContent = coins;
}


function signOut() {
  document.getElementById("user-info").classList.add("hidden");
  document.getElementById("lobby").classList.add("hidden");
  document.getElementById("level-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}


function goToLevels() {
  document.getElementById("lobby").classList.add("hidden");
  document.getElementById("level-screen").classList.remove("hidden");
  generateLevels();
}

function backToLobby() {
  document.getElementById("level-screen").classList.add("hidden");
  document.getElementById("lobby").classList.remove("hidden");
}


function openStore() {
  window.location.href = "store.html"; 
}

function openSpanRole() {
  window.location.href = "span-role.html"; 
}

function openFashionShow() {
  window.location.href = "fashion-show.html"; 
}

function openTournament() {
  window.location.href = "tournament.html"; 
}



const levelData = [
  { name: "Learn ABC", icon: "🅰️", link: "abc.html" },
  { name: "Numbers Fun", icon: "🔢", link: "number.html" },
  { name: "Shapes & Colors", icon: "🎨", link: "quiz2.html" },
  { name: "Coloring Book", icon: "🖍️", link: "coloring.html" },
  { name: "Reward Shop", icon: "🛍️", link: "shop.html" },
  { name: "Animal Kingdom", icon: "🐾", link: "animal.html" },
  { name: "Bird Paradise", icon: "🐦", link: "bird.html" },
  { name: "Learn Flowers", icon: "🌸", link: "flower.html" },
  { name: "Stadium Legends", icon: "⚽", link: "stadium.html" },
  { name: "Magical Tree", icon: "🌲", link: "tree.html" },
  { name: "Magic Kitchen", icon: "🍳", link: "kitchen.html" },
  { name: "Insect Adventure", icon: "🐞", link: "insect.html" },
  { name: "Worker World", icon: "👷", link: "worker.html" },
  { name: "Super Vegetables", icon: "🥦", link: "vegetable.html" },
  { name: "Fruits World", icon: "🍓", link: "fruit.html" },
  { name: "Animal Rescue", icon: "🐶", link: "frames.html" },
  { name: "Time Travel", icon: "⏳", link: "time-travel.html" },
  { name: "Space Rescue", icon: "🛸", link: "space-rescue.html" },
  { name: "Mini Chef", icon: "🍕", link: "mini-chef.html" },
  { name: "Treasure Maze", icon: "🏝️", link: "treasure.html" }
];


function generateLevels() {
  const levelsContainer = document.getElementById("levels-container");
  levelsContainer.innerHTML = "";

  levelData.forEach((level, index) => {
    const btn = document.createElement("button");
    btn.classList.add("level-btn");

    if (index < highestLevelCompleted) {
     
      btn.innerHTML = `<span class="icon">${level.icon}</span>${level.name} ✅`;
      btn.style.background = "#4CAF50";
      btn.onclick = () => window.location.href = level.link;
    } else if (index > highestLevelCompleted) {
     
      btn.innerHTML = `<span class="icon">${level.icon}</span>${level.name} 🔒`;
      btn.classList.add("locked");
      btn.onclick = () =>
        alert(`Level ${index + 1} is locked! Complete previous level first.`);
    } else {
      
      btn.innerHTML = `<span class="icon">${level.icon}</span>${level.name}`;
      btn.style.background = "#FF80AB";
      btn.onclick = () => window.location.href = level.link;
    }

    levelsContainer.appendChild(btn);
  });

 
  document.getElementById("coin-count").textContent = coins;
}


function levelCompleted() {
  if (highestLevelCompleted < levelData.length) {
    highestLevelCompleted++;
    coins += 10;
    saveProgress(); 
    generateLevels();
    alert("🎉 Level completed! Next level unlocked.");
  } else {
    alert("🎉 You have completed all levels!");
  }
}


loadProgress();
generateLevels();
