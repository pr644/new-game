let coins = 0;
let currentColor = "black";
let currentSceneIndex = 0;
const scenes = document.querySelectorAll(".scene");
const coinCount = document.getElementById("coin-count");
const coinSound = document.getElementById("coin-sound");


function updateCoins(amount = 0) {
  coins += amount;
  coinCount.textContent = coins;
  if (amount > 0) {
    coinSound.play();
    animateCoin();
  }

  
  if (coins >= 20) {
    document.getElementById("flower").classList.remove("locked");
  }
}


function animateCoin() {
  coinCount.style.transform = "scale(1.5)";
  setTimeout(() => coinCount.style.transform = "scale(1)", 300);
}


document.querySelectorAll("svg").forEach(svg => {
  svg.addEventListener("click", e => {
    if (e.target.tagName !== "circle" && e.target.tagName !== "rect" && e.target.tagName !== "polygon") return;
    if (currentColor === "eraser") {
      e.target.setAttribute("fill", "white");
    } else {
      e.target.setAttribute("fill", currentColor);
      updateCoins(5);
    }
  });
});


document.querySelectorAll(".color-swatch").forEach(btn => {
  btn.addEventListener("click", () => {
    currentColor = btn.dataset.color;
  });
});

document.getElementById("random-btn").addEventListener("click", () => {
  const colors = ["red","blue","green","yellow","purple","orange","pink"];
  currentColor = colors[Math.floor(Math.random()*colors.length)];
});

document.getElementById("eraser-btn").addEventListener("click", () => {
  currentColor = "eraser";
});


document.getElementById("reset-btn").addEventListener("click", () => {
  const active = scenes[currentSceneIndex];
  active.querySelectorAll("*").forEach(shape => {
    if (shape.tagName !== "svg") shape.setAttribute("fill", "white");
  });
});


function showScene(index) {
  scenes.forEach(s => s.classList.remove("active"));
  scenes[index].classList.add("active");
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
  showScene(currentSceneIndex);
});

document.getElementById("prev-btn").addEventListener("click", () => {
  currentSceneIndex = (currentSceneIndex - 1 + scenes.length) % scenes.length;
  showScene(currentSceneIndex);
});


showScene(currentSceneIndex);



function goToLobby() {
  window.location.href = "index.html";
}
