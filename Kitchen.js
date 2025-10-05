const items = document.querySelectorAll(".item");
const zones = document.querySelectorAll(".zone");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const celebration = document.getElementById("celebration");

const successSound = document.getElementById("successSound");
const failSound = document.getElementById("failSound");
const coinSound = document.getElementById("coinSound");



let score = 0;
let matched = 0;


const startScreen = document.getElementById("startScreen");
const startGameBtn = document.getElementById("startGameBtn");
const gameContainer = document.getElementById("gameContainer");

startGameBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
});


const correctMatches = {
  pot: "stove",
  pan: "counter",
  knife: "drawer",
  spoon: "sink",
  plate: "cabinet"
};


items.forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", e.target.dataset.item);
    e.target.classList.add("dragging");
  });

  item.addEventListener("dragend", e => {
    e.target.classList.remove("dragging");
  });
});


zones.forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.style.transform = "scale(1.05)";
  });

  zone.addEventListener("dragleave", () => {
    zone.style.transform = "scale(1)";
  });

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");
    zone.style.transform = "scale(1)";

    if (correctMatches[draggedItem] === zone.dataset.place) {
      
      zone.classList.add("correct");
      message.textContent = `Great! ${draggedItem} placed correctly!`;
      message.style.color = "#22c55e";

      successSound.play();
      coinSound.play();
      spawnCoin(zone);
      addScore(10);

      
      const itemEl = document.querySelector(`[data-item="${draggedItem}"]`);
      itemEl.setAttribute("draggable", "false");
      itemEl.style.opacity = "0.6";
      itemEl.style.pointerEvents = "none";

      matched++;
      if (matched === Object.keys(correctMatches).length) {
        showCelebration();
      }
    } else {
      
      message.textContent = `Oops! That doesn't go there.`;
      message.style.color = "#e11d48";
      failSound.play();
      shake(zone);
      addScore(-2);
    }
  });
});


function addScore(points) {
  score += points;
  if (score < 0) score = 0;
  scoreDisplay.textContent = `Score: ${score}`;

  scoreDisplay.style.transform = "scale(1.2)";
  setTimeout(() => {
    scoreDisplay.style.transform = "scale(1)";
  }, 200);
}


function shake(el) {
  el.animate(
    [
      { 
        transform: "translateX(0)" 

      },
      { 
        transform: "translateX(-10px)" 
      },
      { 
        transform: "translateX(10px)" 
      },
      { 
        transform: "translateX(0)" 
      }
    ],
    { 
      duration: 300, 
      iterations: 1 
    }
  );
}


function spawnCoin(zone) {
  const coin = document.createElement("div");
  coin.classList.add("coin");
  coin.textContent = "🪙";
  document.body.appendChild(coin);

  const rect = zone.getBoundingClientRect();
  coin.style.left = `${rect.left + rect.width / 2}px`;
  coin.style.top = `${rect.top}px`;

  setTimeout(() => coin.remove(), 1000);
}


function showCelebration() {
  celebration.classList.remove("hidden");
  message.textContent = "🎉 Amazing! You finished the kitchen!";
  message.style.color = "#16a34a";

  
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = randomColor();
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}


function randomColor() {
  const colors = ["#ff5f6d", "#ffb74d", "#81c784", "#4fc3f7", "#ba68c8"];
  return colors[Math.floor(Math.random() * colors.length)];
}


document.getElementById("playAgainBtn").addEventListener("click", () => {
  
  window.location.reload();
});



function goBack() {
  window.location.href = "index.html"; 
}

