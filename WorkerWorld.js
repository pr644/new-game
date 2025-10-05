let score = 0;
const tools = document.querySelectorAll(".tool");
const workers = document.querySelectorAll(".worker");
const messageEl = document.getElementById("message");
const scoreEl = document.getElementById("score");
const confettiEl = document.getElementById("confetti");
const progressBar = document.getElementById("progressBar");

const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");
const actionSound = document.getElementById("actionSound");

const correctTool = {
  chef: "pan",
  gardener: "watering_can",
  builder: "hammer",
  firefighter: "hose"
};

let draggedTool = null;
let completedTasks = 0;
const totalTasks = 4;


tools.forEach(tool => tool.addEventListener("dragstart", dragStart));
workers.forEach(worker => {
  worker.addEventListener("dragover", dragOver);
  worker.addEventListener("drop", drop);
});

function dragStart(e) { draggedTool = e.target.dataset.tool; }
function dragOver(e) { e.preventDefault(); }

function drop(e) {
  const workerType = e.currentTarget.dataset.worker;
  if (correctTool[workerType] === draggedTool) {
    score++;
    completedTasks++;
    scoreEl.textContent = `Score: ${score}`;
    messageEl.textContent = `✅ ${workerType} task completed!`;
    successSound.play();
    actionSound.src = "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";
    actionSound.play();
    showConfetti();
    updateProgressBar();
    checkLevelComplete();
  } else {
    messageEl.textContent = "❌ Try Again!";
    errorSound.play();
  }
}

function updateProgressBar() {
  progressBar.style.width = `${(completedTasks / totalTasks) * 100}%`;
}


function showConfetti() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
    particle.style.width = particle.style.height = `${Math.random()*10+5}px`;
    particle.style.left = `${Math.random()*window.innerWidth}px`;
    particle.style.top = `0px`;
    particle.style.opacity = Math.random();
    confettiEl.appendChild(particle);

    let fall = 0;
    const interval = setInterval(() => {
      fall += 5 + Math.random()*5;
      particle.style.top = fall + "px";
      if (fall > window.innerHeight) { 
        particle.remove(); clearInterval(interval); 
      }
    }, 30);
  }
}


function checkLevelComplete() {
  if (completedTasks === totalTasks) {
    messageEl.textContent = "🏆 Level Complete! You helped all workers!";
    successSound.play();
    
    showConfetti();
    setTimeout(() => alert("🎉 Congratulations! Level Complete! 🎉"), 500);
  }
}

function goToLobby() {
  window.location.href = "index.html";
}