const BIRDS = [
  { key:"parrot", 
     name:"PARROT",  
     emoji:"🦜" 
    },
  { key:"crow",    
    name:"CROW",    
    emoji:"🐦" 
},  
  { key:"peacock",
     name:"PEACOCK", 
     emoji:"🦚" 
},
  { key:"owl",     
    name:"OWL",     
    emoji:"🦉" 
},
  { key:"pigeon", 
     name:"PIGEON",  
     emoji:"🐦" 
},
  { key:"sparrow", 
    name:"SPARROW", 
    emoji:"🐦" 
},
  { key:"eagle",   
    name:"EAGLE",   
    emoji:"🦅" 
},
  { key:"duck",    
    name:"DUCK",    
    emoji:"🦆" },
  { key:"hen",     
    name:"HEN",     
    emoji:"🐔" 
},
  { key:"flamingo",
    name:"FLAMINGO",
    emoji:"🦩" 
}
];

const SOUND_URLS = {
  parrot:   "https://freeanimalsounds.org/wp-content/uploads/2017/07/RedParot.mp3",
  crow:     "https://freeanimalsounds.org/wp-content/uploads/2017/07/crow.mp3",
  peacock:  "https://freeanimalsounds.org/wp-content/uploads/2017/08/peacock.mp3",
  owl:      "https://freeanimalsounds.org/wp-content/uploads/2017/07/owl.mp3",
  sparrow:  "https://freeanimalsounds.org/wp-content/uploads/2017/07/spatz.mp3",
  pigeon:   "https://freeanimalsounds.org/wp-content/uploads/2017/08/pigeons.mp3",
  eagle:    "https://freeanimalsounds.org/wp-content/uploads/2017/07/leopard.mp3", 
  duck:     "https://freeanimalsounds.org/wp-content/uploads/2017/07/Ente_quackt.mp3",
  hen:      "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c4c846e37a.mp3?filename=hen-clucking-6078.mp3",
  flamingo: "https://cdn.pixabay.com/download/audio/2023/05/25/audio_0aa88f7f6d.mp3?filename=flamingo-sound-146778.mp3"
};
        



const ROUNDS_TOTAL = 10;
const BASE_TIME = 10.0;     
const WRONG_PENALTY = 2.0;  
const STREAK_BONUS = 1.5;   
const COINS_PER_CORRECT = 5;
const FINISH_BONUS = 15;

let coins = parseInt(localStorage.getItem("coins")) || 0;
let roundNow = 1;
let correctBird = null;
let options = [];
let timeLeft = BASE_TIME;
let timerId = null;
let running = false;
let score = 0;
let bestStreak = 0;
let streak = 0;
let choicesCount = 4; 


const coinCountEl = document.getElementById("coinCount");
const targetEl = document.getElementById("targetName");
const roundNowEl = document.getElementById("roundNow");
const roundTotalEl = document.getElementById("roundTotal");
const timeLeftEl = document.getElementById("timeLeft");
const gridEl = document.getElementById("grid");
const modeSelect = document.getElementById("modeSelect");
const playSoundBtn = document.getElementById("playSoundBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const restartBtn = document.getElementById("restartBtn");


const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const maxScoreEl = document.getElementById("maxScore");
const bonusCoinsEl = document.getElementById("bonusCoins");
const againBtn = document.getElementById("againBtn");


roundTotalEl.textContent = ROUNDS_TOTAL;
updateCoins(0);
setMode(modeSelect.value);
startRound();


modeSelect.addEventListener("change", () => {
  setMode(modeSelect.value);
  restart();
});
playSoundBtn.addEventListener("click", () => playBirdSound(correctBird.key));
shuffleBtn.addEventListener("click", () => buildGrid()); // reshuffle options only
restartBtn.addEventListener("click", restart);
againBtn.addEventListener("click", restart);


function startRound(){
  running = true;
  resultBox.classList.add("hidden");
  roundNowEl.textContent = roundNow;
  correctBird = pickRandom(BIRDS);
  targetEl.textContent = correctBird.name;

  
  const others = shuffle(BIRDS.filter(b => b.key !== correctBird.key));
  options = shuffle([correctBird, ...others.slice(0, choicesCount-1)]);
  buildGrid();

  
  timeLeft = BASE_TIME;
  updateTime();
  if (timerId) clearInterval(timerId);
  timerId = setInterval(tick, 100);
}

function buildGrid(){
  gridEl.innerHTML = "";
  options.forEach(b => {
    const card = document.createElement("button");
    card.className = "card";
    card.innerHTML = `<div class="emoji">${b.emoji}</div><div class="name">${b.name}</div>`;
    card.addEventListener("click", () => onPick(card, b));
    gridEl.appendChild(card);
  });
}

function onPick(card, bird){
  if (!running) return;

  if (bird.key === correctBird.key){
    
    card.classList.add("correct");
    streak++;
    bestStreak = Math.max(bestStreak, streak);
    score++;

    
    if (streak % 3 === 0) {
      timeLeft = Math.min(timeLeft + STREAK_BONUS, BASE_TIME + 3);
      updateTime();
    }

    playBirdSound(bird.key);
    gainCoins(COINS_PER_CORRECT);
    nextOrFinish();
  } else {
    
    card.classList.add("wrong");
    setTimeout(() => card.classList.remove("wrong"), 350);
    streak = 0;
    timeLeft = Math.max(0, timeLeft - WRONG_PENALTY);
    updateTime();
  }
}

function nextOrFinish(){
  running = false;
  clearInterval(timerId);
  if (roundNow < ROUNDS_TOTAL){
    setTimeout(() => { roundNow++; startRound(); }, 450);
  } else {
    
    const bonus = FINISH_BONUS + Math.floor(bestStreak/3)*5; 
    gainCoins(bonus);
    showResult(bonus);
  }
}

function tick(){
  timeLeft = Math.max(0, timeLeft - 0.1);
  updateTime();
  if (timeLeft <= 0){
    
    streak = 0;
    nextOrFinish();
  }
}

function updateTime(){
  timeLeftEl.textContent = timeLeft.toFixed(1);
}

function showResult(bonus){
  resultBox.classList.remove("hidden");
  scoreEl.textContent = String(score);
  maxScoreEl.textContent = String(ROUNDS_TOTAL);
  bonusCoinsEl.textContent = String(bonus);
}

function restart(){
  clearInterval(timerId);
  roundNow = 1;
  score = 0;
  streak = 0;
  bestStreak = 0;
  resultBox.classList.add("hidden");
  startRound();
}

function setMode(mode){
  if (mode === "easy") choicesCount = 3;
  else if (mode === "hard") choicesCount = 6;
  else choicesCount = 4; 
}


function gainCoins(x){ updateCoins(x); bumpCoins(); }
function updateCoins(delta){
  coins += delta;
  localStorage.setItem("coins", String(coins));
  coinCountEl.textContent = coins;
}
function bumpCoins(){
  const wrap = coinCountEl.parentElement;
  wrap.classList.add("bump");
  setTimeout(()=>wrap.classList.remove("bump"), 350);
}


function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function shuffle(arr){
  const a = arr.slice();
  for (let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}


function playBirdSound(key){
  const ctx = new (window.AudioContext || window.AudioContext)();
  const g = ctx.createGain(); g.gain.value = 0.18; g.connect(ctx.destination);
  const now = ctx.currentTime;
  const seq = motif(key);

  const url = SOUND_URLS[key];
  if(!url){
    console.warn("No sound for:", key);
    return;
  }
  const audio = new Audio(url);
  audio.play();

  seq.forEach(step => {
    const o = ctx.createOscillator();
    o.type = step.wave || "triangle";
    o.frequency.value = step.freq;
    const v = ctx.createGain();
    v.gain.setValueAtTime(0.0001, now + step.t);
    v.gain.exponentialRampToValueAtTime(0.25, now + step.t + 0.01);
    v.gain.exponentialRampToValueAtTime(0.0001, now + step.t + step.len);
    o.connect(v); v.connect(g);
    o.start(now + step.t); o.stop(now + step.t + step.len + 0.02);
  });

  setTimeout(()=>ctx.close(), 1200);
}   


function motif(key){
  switch(key){
    case "parrot":   
    return chirp([880,988,1046,988], 0.08, "square");
    case "crow":     
    return chirp([330,294,262], 0.12, "square");
    case "peacock":  
    return chirp([392,440,494,440,392], 0.09, "triangle");
    case "owl":      
    return chirp([220,174,220], 0.18, "sine");
    case "pigeon":   
    return chirp([392,370,392], 0.10, "triangle");
    case "sparrow":  
    return chirp([988,1046,988,1174], 0.06, "square");
    case "eagle":    
    return chirp([262,330,392], 0.12, "sawtooth");
    case "duck":     
    return chirp([262,247,233], 0.12, "square");
    case "hen":      
    return chirp([330,349,370], 0.10, "triangle");
    case "flamingo": 
    return chirp([523,587,659], 0.10, "triangle");
    default:         
    return chirp([440,660,440], 0.10, "sine");
  }
}
function chirp(freqs, len, wave){
  let t=0; const out=[];
  for(const f of freqs){ out.push({freq:f, len, t, wave}); t += len*1.15; }
  return out;
}

playBirdSound("owl");
