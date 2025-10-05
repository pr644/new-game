const ANIMALS = [
  { key:"lion",    emoji:"🦁", name:"LION" },
  { key:"tiger",   emoji:"🐯", name:"TIGER" },
  { key:"elephant",emoji:"🐘", name:"ELEPHANT" },
  { key:"monkey",  emoji:"🐒", name:"MONKEY" },
  { key:"cow",     emoji:"🐄", name:"COW" },
  { key:"cat",     emoji:"🐱", name:"CAT" },
  { key:"dog",     emoji:"🐶", name:"DOG" },
  { key:"sheep",   emoji:"🐑", name:"SHEEP" },
  { key:"horse",   emoji:"🐴", name:"HORSE" },
  { key:"pig",     emoji:"🐷", name:"PIG" },
];

const AUDIO_URLS = {
  lion:     "https://cdn.pixabay.com/download/audio/2022/03/15/audio_61c7a9d27b.mp3?filename=lion-roar-1.mp3",
  tiger:    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_62194f54a7.mp3?filename=tiger-growl-1.mp3",
  elephant: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3f6c2191ac.mp3?filename=elephant-trumpet-1.mp3",
  monkey:   "https://cdn.pixabay.com/download/audio/2022/03/15/audio_f53e3d36cf.mp3?filename=monkey-1.mp3",
  cow:      "https://cdn.pixabay.com/download/audio/2021/08/04/audio_f5120ff6c1.mp3?filename=cow-moo-6066.mp3",
  cat:      "https://cdn.pixabay.com/download/audio/2021/08/04/audio_8a0e7d43b2.mp3?filename=cat-meow-6075.mp3",
  dog:      "https://cdn.pixabay.com/download/audio/2021/08/04/audio_09cb8fcb86.mp3?filename=dog-barking-6077.mp3",
  sheep:    "https://cdn.pixabay.com/download/audio/2021/08/04/audio_8dbe3fb89d.mp3?filename=sheep-bleating-6069.mp3",
  horse:    "https://cdn.pixabay.com/download/audio/2021/08/04/audio_3e35c2c1f7.mp3?filename=horse-neigh-6065.mp3",
  pig:      "https://cdn.pixabay.com/download/audio/2021/08/04/audio_9b414d3ef7.mp3?filename=pig-oinking-6064.mp3",
};

const ROUNDS_TOTAL = 5;   
const BUSHES_PER_ROW = 5; 
const COINS_PER_FIND = 5;
const BONUS_ON_FINISH = 10;

let coins = parseInt(localStorage.getItem("coins")) || 0;
let roundNow = 1;
let target = null;          
let hidingIndex = -1;        
let busy = false;            

const coinCountEl = document.getElementById("coinCount");
const roundNowEl  = document.getElementById("roundNow");
const roundTotalEl= document.getElementById("roundTotal");
const targetNameEl= document.getElementById("targetName");
const bushRow     = document.getElementById("bushRow");
const revealCard  = document.getElementById("revealCard");
const revealEmoji = document.getElementById("revealEmoji");
const revealLabel = document.getElementById("revealLabel");
const nextBtn     = document.getElementById("nextBtn");
const hintBtn     = document.getElementById("hintBtn");
const shuffleBtn  = document.getElementById("shuffleBtn");
const restartBtn  = document.getElementById("restartBtn");
const sfxCoin     = document.getElementById("sfxCoin");


// Init
roundTotalEl.textContent = ROUNDS_TOTAL.toString();
updateCoins(0);
startRound();

function startRound(){
  busy = false;
  revealCard.classList.remove("show");
  roundNowEl.textContent = roundNow.toString();

  target = randomPick(ANIMALS);
  targetNameEl.textContent = target.name;

  buildBushRow();
  hidingIndex = Math.floor(Math.random() * BUSHES_PER_ROW);
}

function buildBushRow(){
  bushRow.innerHTML = "";
  for(let i=0;i<BUSHES_PER_ROW;i++){
    const btn = document.createElement("button");
    btn.className = "bush";
    const peek = document.createElement("div");
    peek.className = "peek";
    
    const decoy = randomPick(ANIMALS.filter(a => a.key !== target.key));
    peek.textContent = i === hidingIndex ? target.emoji : decoy.emoji;
    btn.appendChild(peek);

    btn.addEventListener("click", () => onBushClick(btn, i));
    bushRow.appendChild(btn);
  }
}

function onBushClick(button, index){
  if (busy) return;
  button.classList.add("peeked");

  if (index === hidingIndex){
    busy = true;
    playAnimalSound(target.key);
    showReveal(target.emoji, target.name);
    gainCoins(COINS_PER_FIND);
  } else {
    button.classList.add("shake");
    setTimeout(() => button.classList.remove("shake"), 350);
  }
}

function showReveal(emoji, name){
  revealEmoji.textContent = emoji;
  revealLabel.textContent = name;
  revealCard.classList.add("show");
}

nextBtn.addEventListener("click", () => {
  if (roundNow < ROUNDS_TOTAL){
    roundNow++;
    startRound();
  } else {
    gainCoins(BONUS_ON_FINISH);
    revealLabel.textContent = `Safari Complete! +${BONUS_ON_FINISH} bonus`;
    nextBtn.textContent = "Play Again";
    nextBtn.onclick = () => {
      roundNow = 1;
      nextBtn.textContent = "Next ▶";
      nextBtn.onclick = null; 
      startRound();
    };
  }
});

hintBtn.addEventListener("click", () => {
  const correct = bushRow.children[hidingIndex];
  if (!correct) return;
  correct.style.transform = "translateY(-6px) scale(1.03)";
  setTimeout(() => { correct.style.transform = ""; }, 450);
});

shuffleBtn.addEventListener("click", () => {
  hidingIndex = Math.floor(Math.random() * BUSHES_PER_ROW);
  buildBushRow();
});

restartBtn.addEventListener("click", () => {
  roundNow = 1;
  nextBtn.textContent = "Next ▶";
  startRound();
});

function gainCoins(x){
  updateCoins(x);
  playCoinBlip();
}

function updateCoins(delta){
  coins += delta;
  coinCountEl.textContent = coins;
  localStorage.setItem("coins", String(coins));
  const coinsWrap = coinCountEl.parentElement;
  coinsWrap.classList.add("bump");
  setTimeout(() => coinsWrap.classList.remove("bump"), 350);
}

function randomPick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function playAnimalSound(key){
  const url = AUDIO_URLS[key];
  if (url){
    const audio = new Audio(url);
    audio.play();
    return; 
  }

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const g = ctx.createGain();
  g.gain.value = 0.15; 
  g.connect(ctx.destination);

  const now = ctx.currentTime;
  const seq = motifFor(key);

  seq.forEach((step) => {
    const o = ctx.createOscillator();
    o.type = step.wave || "sine";
    o.frequency.value = step.freq;
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now + step.t);
    noteGain.gain.exponentialRampToValueAtTime(0.25, now + step.t + 0.01);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + step.t + step.len);
    o.connect(noteGain); 
    noteGain.connect(g);
    o.start(now + step.t); 
    o.stop(now + step.t + step.len + 0.02);
  });

  setTimeout(() => ctx.close(), 1200);
}

function motifFor(key){
  switch(key){
    case "lion":     return toneSeq([220, 196, 174, 220], 0.12, "sawtooth");
    case "tiger":    return toneSeq([262, 196, 262], 0.12, "square");
    case "elephant": return toneSeq([130, 98, 82], 0.22, "sine");
    case "monkey":   return toneSeq([880, 988, 880, 988], 0.08, "triangle");
    case "cow":      return toneSeq([196, 196, 174], 0.18, "sine");
    case "cat":      return toneSeq([880, 932, 988], 0.08, "sine");
    case "dog":      return toneSeq([196, 262, 196], 0.12, "square");
    case "sheep":    return toneSeq([330, 294, 330], 0.12, "triangle");
    case "horse":    return toneSeq([220, 247, 220], 0.12, "square");
    case "pig":      return toneSeq([196, 174, 164], 0.12, "triangle");
    default:         return toneSeq([440, 660, 440], 0.1, "sine");
  }
}

function toneSeq(freqs, len, wave){
  const out = [];
  let t = 0;
  for (const f of freqs){
    out.push({ freq: f, t, len, wave });
    t += len * 1.1; 
  }
  return out;
}

// test
document.getElementById("playAnimalSound").addEventListener("click", () => {
  if (target) {
    playAnimalSound(target.key);  
  } else {
    playAnimalSound("tiger");     
  }
});
playAnimalSound("tiger");
