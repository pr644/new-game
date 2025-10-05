const startBtn = document.getElementById("startBtn");
const instruction = document.getElementById("instruction");
const sportsZone = document.getElementById("sportsZone");
const roundEl = document.getElementById("round");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

let score = 0;
let currentRound = 0;
let currentGame = null;
let timer = 10;
let countdown;


const rounds = [
  { emoji: "⚽", correct: "goal", sound: "https://actions.google.com/sounds/v1/sports/soccer_kick.ogg" },
  { emoji: "🏀", correct: "hoop", sound: "https://actions.google.com/sounds/v1/sports/basketball_bounce.ogg" },
  { emoji: "🎾", correct: "smash", sound: "https://actions.google.com/sounds/v1/sports/tennis_hit.ogg" },
  { emoji: "🏏", correct: "bat", sound: "https://actions.google.com/sounds/v1/sports/baseball_hit.ogg" },
  { emoji: "🥊", correct: "punch", sound: "https://actions.google.com/sounds/v1/sports/boxing_punch.ogg" },
  { emoji: "🏐", correct: "spike", sound: "https://actions.google.com/sounds/v1/sports/volleyball_hit.ogg" },
  { emoji: "🏓", correct: "hit", sound: "https://actions.google.com/sounds/v1/sports/ping_pong_hit.ogg" },
  { emoji: "🏹", correct: "bullseye", sound: "https://actions.google.com/sounds/v1/sports/arrow_hit.ogg" },
  { emoji: "🏒", correct: "stick", sound: "https://actions.google.com/sounds/v1/sports/hockey_hit.ogg" },
  { emoji: "🏇", correct: "ride", sound: "https://actions.google.com/sounds/v1/animals/horse_gallop.ogg" }
];


function playStadium() {
  document.getElementById("crowd").play();
  document.getElementById("whistle").play();
}

function stopStadium() {
  document.getElementById("crowd").pause();
  document.getElementById("crowd").currentTime = 0;
  document.getElementById("whistle").pause();
  document.getElementById("whistle").currentTime = 0;
}

function startGame() {
  score = 0;
  currentRound = 0;
  startBtn.style.display = "none";
  timer = 10;
  timerEl.textContent = `⏱️ ${timer}`;
  scoreEl.textContent = `Score: ${score}`;
  roundEl.textContent = `Round: 0 / ${rounds.length}`;
  
  
  const stadiumAmbience = document.createElement("audio");
  stadiumAmbience.src = "https://actions.google.com/sounds/v1/crowds/stadium_cheer.ogg";
  stadiumAmbience.autoplay = true;
  stadiumAmbience.loop = true;
  stadiumAmbience.volume = 0.3;
  stadiumAmbience.id = "stadiumAmbience";
  document.body.appendChild(stadiumAmbience);

  nextRound();

  countdown = setInterval(() => {
    timer--;
    timerEl.textContent = `⏱️ ${timer}`;
    if (timer <= 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}


function nextRound() {
  if (currentRound >= rounds.length) {
    endGame();
    return;
  }

  currentGame = rounds[currentRound];
  currentRound++;
  roundEl.textContent = `Round: ${currentRound} / ${rounds.length}`;
  instruction.textContent = `Find the correct move for ${currentGame.emoji}`;

  const wrong = "❌ Wrong Move";
  sportsZone.innerHTML = `
    <div class="sportCard" data-answer="${currentGame.correct}">${currentGame.emoji} ✅ ${currentGame.correct}</div>
    <div class="sportCard" data-answer="wrong">${currentGame.emoji} ${wrong}</div>
  `;

  
  document.querySelectorAll(".sportCard").forEach(card => {
    card.addEventListener("click", () => checkAnswer(card));
  });
}


function checkAnswer(card) {
  if (card.dataset.answer === currentGame.correct) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
    instruction.textContent = "✅ Correct!";
    // playSound(currentGame.sound); 
    setTimeout(() => playSound("https://actions.google.com/sounds/v1/crowds/stadium_cheer.ogg"), 200); // cheer
  } else {
    instruction.textContent = "❌ Wrong!";
    // playSound("https://actions.google.com/sounds/v1/sports/whistle.ogg"); // wrong sound
  }

  setTimeout(nextRound, 800);
}


function endGame() {
  instruction.textContent = `🏆 Game Over! Final Score: ${score} / ${rounds.length}`;
  sportsZone.innerHTML = "";
  startBtn.style.display = "block";
  clearInterval(countdown);
  const ambience = document.getElementById("stadiumAmbience");
  if (ambience) ambience.remove();
}

startBtn.addEventListener("click", startGame);

