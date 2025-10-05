let gems = 0;
let missions = 0;

const scenes = document.querySelectorAll(".scene");
let currentScene = 0;

const gemsEl = document.getElementById("gems");
const missionsEl = document.getElementById("missions");

document.getElementById("nextScene").addEventListener("click", () => {
  scenes[currentScene].classList.add("hidden");
  currentScene = (currentScene + 1) % scenes.length;
  scenes[currentScene].classList.remove("hidden");
});

document.getElementById("prevScene").addEventListener("click", () => {
  scenes[currentScene].classList.add("hidden");
  currentScene = (currentScene - 1 + scenes.length) % scenes.length;
  scenes[currentScene].classList.remove("hidden");
});


document.querySelectorAll("#asteroidGarden .orb").forEach(orb => {
  orb.addEventListener("click", () => {
    orb.style.display = "none";
    for(let i=0; i<5; i++) createSparkle(document.getElementById("asteroidGarden"));
    gems++;
    missions++;
    gemsEl.textContent = gems;
    missionsEl.textContent = missions;
    showReward("#asteroidGarden", "⭐ Cosmic Orb Collected!");
  });
});


let lastOrder = 0;
document.querySelectorAll("#alienSettlement .symbol").forEach(symbol => {
  symbol.addEventListener("click", () => {
    if(parseInt(symbol.dataset.order) === lastOrder + 1){
      lastOrder++;
      symbol.classList.add("correct");
      createSparkle(symbol);
      if(lastOrder === 3){
        gems += 2;
        missions++;
        gemsEl.textContent = gems;
        missionsEl.textContent = missions;
        showReward("#alienSettlement", "👽 Alien Symbols Matched!");
        lastOrder = 0;
      }
    } else {
      lastOrder = 0;
    }
  });
});


function showReward(sceneId, text){
  const rewardMsg = document.querySelector(sceneId + " .rewardMsg");
  rewardMsg.textContent = text;
  rewardMsg.classList.remove("hidden");
  setTimeout(() => rewardMsg.classList.add("hidden"), 2000);
}


function createSparkle(parent){
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = Math.random()*50 + "px";
  sparkle.style.top = Math.random()*50 + "px";
  sparkle.style.setProperty('--randX', Math.random());
  parent.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);
}


const astro1 = document.getElementById("astro1");
astro1.addEventListener("mousemove", () => {
  createSparkle(astro1);
});

function goToLobby() {
  window.location.href = "index.html";
}
