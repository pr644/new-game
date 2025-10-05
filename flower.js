const FLOWERS = [
  { id: 'rose', name: 'ROSE', emoji: '🌹', color: 'red', petals: 5, height: 3 },
  { id: 'sun',  name: 'SUNFLOWER', emoji: '🌻', color: 'yellow', petals: 8, height: 4 },
  { id: 'tulip',name: 'TULIP', emoji: '🌷', color: 'pink', petals: 6, height: 2 },
  { id: 'lily', name: 'LILY', emoji: '🌸', color: 'white', petals: 7, height: 3 },
  { id: 'lotus',name: 'LOTUS', emoji: '🏵️', color: 'purple', petals: 9, height: 2 },
  { id: 'daisy',name: 'DAISY', emoji: '🌼', color: 'orange', petals: 6, height: 1 },
];


const ROUNDS_TOTAL = 5;
const ROUND_TIME = 12;    
const COIN_CORRECT = 10;
const COIN_WRONG = -2;
const TRAP_CHANCE_HARD = 0.25; 


const gardenEl = document.getElementById('garden');
const clueEl = document.getElementById('clue');
const roundNowEl = document.getElementById('roundNow');
const roundTotalEl = document.getElementById('roundTotal');
const timeLeftEl = document.getElementById('timeLeft');
const revealEl = document.getElementById('reveal');
const revealEmoji = document.getElementById('revealEmoji');
const revealName = document.getElementById('revealName');
const revealMsg = document.getElementById('revealMsg');
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const skipBtn = document.getElementById('skipBtn');
const coinsEl = document.getElementById('coins');
const hardModeCheckbox = document.getElementById('hardMode');
const scoreEl = document.querySelector('#score span');
const roundNowDisplay = document.getElementById('roundNow');
const roundTotalDisplay = document.getElementById('roundTotal');
const summaryEl = document.getElementById('summary');
const finalScoreEl = document.getElementById('finalScore');
const finalTotalEl = document.getElementById('finalTotal');
const gainedCoinsEl = document.getElementById('gainedCoins');
const playAgainBtn = document.getElementById('playAgain');

roundTotalEl.textContent = ROUNDS_TOTAL;

let coins = parseInt(localStorage.getItem('coins')) || 0;
let roundNow = 1;
let score = 0;
let timeLeft = ROUND_TIME;
let timerId = null;
let targetFlower = null;
let activeFlowers = []; 
let inRound = false;

coinsEl.textContent = coins;
scoreEl.textContent = score;
roundNowDisplay.textContent = roundNow;


function randPick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a; }

function startRound(){
  inRound = true;
  revealEl.classList.remove('show');
  revealEl.style.display = 'none';
  summaryEl.classList.add('hidden');

  roundNowEl.textContent = roundNow;
  scoreEl.textContent = score;
  timeLeft = ROUND_TIME;
  timeLeftEl.textContent = timeLeft.toFixed(0);

  
  const pool = shuffle(FLOWERS);
  activeFlowers = pool.slice(0, 5).map(f => ({ flower:f, surprise:'none', trap:false }));

  
  const surpriseTypes = ['butterfly','bee','gem'];
  const shuffledIndices = shuffle([0,1,2,3,4]);
  for(let i=0;i<surpriseTypes.length;i++){
    activeFlowers[shuffledIndices[i]].surprise = surpriseTypes[i];
  }

  
  if(hardModeCheckbox.checked){
    for(let i=0;i<activeFlowers.length;i++){
      if(Math.random() < TRAP_CHANCE_HARD && activeFlowers[i].surprise !== 'gem'){
        activeFlowers[i].trap = true; // trap (spider)
      }
    }
  }

  
  const clueTypes = ['surprise','brightestColor','tallest','petalCount'];
  const clue = randPick(clueTypes);

  
  if(clue === 'surprise'){
    
    const gemIdx = activeFlowers.findIndex(a => a.surprise === 'gem');
    if(gemIdx >= 0){ targetFlower = activeFlowers[gemIdx]; clueEl.textContent = 'Clue: Find the flower with the hidden 💎 (gem)!'; }
    else { const bf = activeFlowers.find(a => a.surprise === 'butterfly'); targetFlower = bf; clueEl.textContent = 'Clue: Find the flower hiding the 🦋 (butterfly)!'; }
  } else if(clue === 'brightestColor'){
    
    let brightIdx = activeFlowers.findIndex(a => ['yellow','orange'].includes(a.flower.color));
    if(brightIdx < 0) brightIdx = 0;
    targetFlower = activeFlowers[brightIdx];
    clueEl.textContent = 'Clue: Look for the flower with the brightest color!';
  } else if(clue === 'tallest'){
    const sorted = activeFlowers.slice().sort((a,b)=>b.flower.height - a.flower.height);
    targetFlower = sorted[0];
    clueEl.textContent = 'Clue: Look for the tallest flower!';
  } else { 
    const sorted = activeFlowers.slice().sort((a,b)=>b.flower.petals - a.flower.petals);
    targetFlower = sorted[0];
    clueEl.textContent = `Clue: Find the flower with the most petals (${targetFlower.flower.petals})`;
  }

  
  renderGarden();
  
  if(timerId) clearInterval(timerId);
  timerId = setInterval(tick, 1000);
}


function renderGarden(){
  gardenEl.innerHTML = '';
  activeFlowers.forEach((box, idx) => {
    const el = document.createElement('button');
    el.className = 'flower';
    el.dataset.index = idx;
    el.innerHTML = `<div class="emoji">${box.flower.emoji}</div><div class="label">${box.flower.name}</div>`;
    el.addEventListener('click', ()=>onFlowerClick(idx, el));
    gardenEl.appendChild(el);
  });
}


function onFlowerClick(idx, el){
  if(!inRound) return;
  const box = activeFlowers[idx];
  
  showReveal(box.flower.emoji, box.flower.name, '');

  
  if(box.trap){
    
    spawnSurprise('🕷️','trap', el);
    applyWrong('Oh no — a trap! -2 coins', true);
    return;
  }

  
  const isTarget = (box === targetFlower);

  if(isTarget){
    
    const msg = box.surprise === 'gem' ? 'You found the hidden GEM!' : 'Correct! You found it!';
    revealMsg.textContent = msg;
    
    if(box.surprise === 'butterfly') spawnSurprise('🦋','butterfly', el);
    if(box.surprise === 'bee') spawnSurprise('🐝','bee', el);
    if(box.surprise === 'gem') spawnSurprise('💎','gem', el);

    applyCorrect();
  } else {
    
    applyWrong('Not this one. Try again!');
    
    if(box.surprise === 'butterfly') spawnSurprise('🦋','butterfly', el);
    if(box.surprise === 'bee') spawnSurprise('🐝','bee', el);
    if(box.surprise === 'gem') spawnSurprise('💎','gem', el);
  }
}


function applyCorrect(){
  inRound = false;
  clearInterval(timerId);
  score++;
  scoreEl.textContent = score;
  roundNow++;
  updateCoins(COIN_CORRECT);
  
  revealEl.classList.add('show');
  revealEl.style.display = 'block';
  revealMsg.textContent = `+${COIN_CORRECT} coins!`;
  
  setTimeout(()=> {
    if(roundNow <= ROUNDS_TOTAL) startRound();
    else finishSafari();
  }, 1200);
}


function applyWrong(msg, isTrap=false){
  
  updateCoins(COIN_WRONG);
  
  timeLeft = Math.max(1, timeLeft - 2);
  timeLeftEl.textContent = timeLeft;
  
  revealMsg.textContent = msg;
  revealEl.classList.add('show');
  revealEl.style.display = 'block';
  
  setTimeout(()=> {
    revealEl.classList.remove('show');
    revealEl.style.display = 'none';
  }, 900);
  
}


function spawnSurprise(symbol, type, flowerEl){
  
  const el = document.createElement('div');
  el.className = type;
  el.textContent = symbol;
  
  if(flowerEl){
    const r = flowerEl.getBoundingClientRect();
    el.style.left = (r.left + r.width/2) + 'px';
    el.style.top = (r.top + r.height/2) + 'px';
    
    document.body.appendChild(el);
  } else {
    document.body.appendChild(el);
  }

  
  if(type === 'butterfly') playFlutter();
  if(type === 'bee') playBuzz();
  if(type === 'gem') playSparkle();
  if(type === 'trap') playTrap();

  setTimeout(()=> el.remove(), 2500);
}


function tick(){
  if(!inRound) return;
  timeLeft--;
  timeLeftEl.textContent = timeLeft;
  if(timeLeft <= 0){
    
    clearInterval(timerId);
    inRound = false;
    applyWrong('Time up! No reward.');
    roundNow++;
    if(roundNow <= ROUNDS_TOTAL) setTimeout(()=> startRound(), 900);
    else finishSafari();
  }
}


function finishSafari(){
  inRound = false;
  summaryEl.classList.remove('hidden');
  finalScoreEl.textContent = score;
  finalTotalEl.textContent = ROUNDS_TOTAL;
  gainedCoinsEl.textContent = coins; 
  document.getElementById('finalScore').textContent = score;
}


function updateCoins(delta){
  coins += delta;
  if(coins < 0) coins = 0;
  localStorage.setItem('coins', String(coins));
  coinsEl.textContent = coins;
  
  coinsEl.parentElement.classList.add('bump');
  setTimeout(()=> coinsEl.parentElement.classList.remove('bump'), 350);
}


function playFlutter(){
  
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const g = ctx.createGain(); g.gain.value = 0.12; g.connect(ctx.destination);
  const now = ctx.currentTime;
  [880, 1047, 987].forEach((f,i)=>{
    const o = ctx.createOscillator(); o.type='sine'; o.frequency.value = f;
    const gg = ctx.createGain(); gg.gain.setValueAtTime(0.0001, now + i*0.06);
    gg.gain.exponentialRampToValueAtTime(0.2, now + i*0.06 + 0.01);
    gg.gain.exponentialRampToValueAtTime(0.0001, now + i*0.06 + 0.12);
    o.connect(gg); gg.connect(g); o.start(now + i*0.06); o.stop(now + i*0.06 + 0.14);
  });
  setTimeout(()=>ctx.close(), 800);
}
function playBuzz(){
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = 'square'; o.frequency.value = 200; g.gain.value = 0.04;
  o.connect(g); g.connect(ctx.destination);
  o.start();
  setTimeout(()=>{ o.frequency.value = 280; }, 200);
  setTimeout(()=>{ o.stop(); ctx.close(); }, 900);
}
function playSparkle(){
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime; const g = ctx.createGain(); g.gain.value = 0.12; g.connect(ctx.destination);
  [1760, 2093, 2349].forEach((f,i)=>{
    const o = ctx.createOscillator(); o.type='triangle'; o.frequency.value = f;
    const gg = ctx.createGain(); gg.gain.setValueAtTime(0.0001, now + i*0.05);
    gg.gain.exponentialRampToValueAtTime(0.25, now + i*0.05 + 0.01);
    gg.gain.exponentialRampToValueAtTime(0.0001, now + i*0.05 + 0.10);
    o.connect(gg); gg.connect(g); o.start(now + i*0.05); o.stop(now + i*0.05 + 0.12);
  });
  setTimeout(()=>ctx.close(), 700);
}
function playTrap(){
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime; const g = ctx.createGain(); g.gain.value = 0.08; g.connect(ctx.destination);
  const o = ctx.createOscillator(); o.type='sawtooth'; o.frequency.value = 120;
  o.connect(g); o.start(now); o.frequency.exponentialRampToValueAtTime(80, now + 0.35);
  setTimeout(()=>{ o.stop(); ctx.close(); }, 500);
}
function showReveal(emoji, name, msg) {
  revealEmoji.textContent = emoji;
  revealName.textContent = name;
  revealMsg.textContent = msg || "";
  revealEl.classList.add('show');
  revealEl.style.display = 'block';
}



startBtn.addEventListener('click', ()=> {
  roundNow = 1; score = 0; updateCoins(0); startRound();
});
shuffleBtn.addEventListener('click', ()=> {
  
  if(inRound){
    
    const picks = shuffle([0,1,2,3,4]);
    
    const surv = ['butterfly','bee','gem'];
    activeFlowers.forEach(a=>{ a.surprise='none'; a.trap=false; });
    for(let i=0;i<surv.length;i++){
      activeFlowers[picks[i]].surprise = surv[i];
    }
    renderGarden();
  }
});
skipBtn.addEventListener('click', ()=> {
  
  inRound = false; clearInterval(timerId);
  roundNow++;
  if(roundNow <= ROUNDS_TOTAL) startRound();
  else finishSafari();
});


nextBtn.addEventListener('click', ()=> {
  revealEl.classList.remove('show');
  if(roundNow <= ROUNDS_TOTAL) startRound(); else finishSafari();
});
playAgainBtn.addEventListener('click', ()=> {
  roundNow = 1; score = 0; updateCoins(0); startRound();
});


coinsEl.textContent = coins;
timeLeftEl.textContent = ROUND_TIME;

