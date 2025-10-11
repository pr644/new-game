let score = 0;
let draggedTool = null;
let completedTasks = 0;
const totalTasks = 4;

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


tools.forEach(tool => {
  tool.addEventListener("dragstart", dragStart);
});
workers.forEach(worker => {
  worker.addEventListener("dragover", dragOver);
  worker.addEventListener("drop", drop);
});


tools.forEach(tool => {
  tool.addEventListener("touchstart", touchStart);
});
workers.forEach(worker => {
  worker.addEventListener("touchmove", touchMove);
  worker.addEventListener("touchend", touchEnd);
});

function dragStart(e) {
  draggedTool = e.target.dataset.tool;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const workerType = e.currentTarget.dataset.worker;
  checkMatch(draggedTool, workerType);
}


function touchStart(e) {
  draggedTool = e.target.dataset.tool;
}

function touchMove(e) {
  e.preventDefault();
}

function touchEnd(e) {
  const touch = e.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains("worker")) {
    const workerType = target.dataset.worker;
    checkMatch(draggedTool, workerType);
  }
}


function checkMatch(tool, workerType) {
  if (correctTool[workerType] === tool) {
    score++;
    completedTasks++;
    scoreEl.textContent = `Score: ${score}`;
    messageEl.textContent = `🎉 Great job! You helped the ${workerType}!`;

    successSound.play();
    actionSound.src = "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";
    actionSound.play();

    showConfetti();
    updateProgressBar();
    checkLevelComplete();
  } else {
    
    messageEl.textContent = "🪄 Try another tool!";
    errorSound.volume = 0.2; 
    errorSound.play();

    
    const wrongWorker = document.querySelector(`[data-worker='${workerType}']`);
    wrongWorker.classList.add("shake");
    setTimeout(() => wrongWorker.classList.remove("shake"), 400);
  }
}


function updateProgressBar() {
  progressBar.style.width = `${(completedTasks / totalTasks) * 100}%`;
}


function showConfetti() {
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`;
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `0px`;
    particle.style.opacity = Math.random();
    confettiEl.appendChild(particle);

    let fall = 0;
    const interval = setInterval(() => {
      fall += 5 + Math.random() * 5;
      particle.style.top = fall + "px";
      if (fall > window.innerHeight) {
        particle.remove();
        clearInterval(interval);
      }
    }, 30);
  }
}


function checkLevelComplete() {
  if (completedTasks === totalTasks) {
    messageEl.textContent = "🏆 Level Complete! You helped all workers!";
    successSound.play();
    showConfetti();
    setTimeout(() => alert("🎉 Yay! You finished the level! 🎉"), 500);
  }
}


function goToLobby() {
  window.location.href = "index.html";
}
