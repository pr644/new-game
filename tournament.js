const startBtn = document.getElementById("start-tournament-btn");
const challengeContainer = document.getElementById("challenge-container");
const playersArena = document.getElementById("players-arena");
const roundInfo = document.getElementById("round-info");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");
const coinDisplay = document.getElementById("coin-count");
const coinAudio = document.getElementById("coin-sound");
const winAudio = document.getElementById("win-sound");


let coins = Number(localStorage.getItem("skw_coins") || 100);
let round = 1;
const totalRounds = 20;
let score = Number(localStorage.getItem("skw_score") || 0);


const players = ["You", "Alex", "Mia", "Sam", "Lily"];
const scores = { "You": 0, "Alex": 0, "Mia": 0, "Sam": 0, "Lily": 0 };


const levelThemes = [
  "ABC", "Numbers", "Shapes", "Coloring", "Shop",
  "Animals", "Birds", "Flowers", "Stadium", "Tree",
  "Kitchen", "Insects", "Workers", "Vegetables", "Fruits",
  "Animal Rescue", "Time Travel", "Space", "Mini Chef", "Treasure"
];


function tryPlay(a) {
  if (!a) return;
  try { a.currentTime = 0; a.play().catch(()=>{}); } catch(e) {}
}


function updateCoins(amount=0) {
  if (amount !== 0) coins += amount;
  coinDisplay.textContent = coins;
  localStorage.setItem("skw_coins", coins);
}


function saveScore() {
  localStorage.setItem("skw_score", scores["You"]);
}


function renderPlayers() {
  playersArena.innerHTML = "";
  players.forEach(p => {
    const d = document.createElement("div");
    d.className = "arena-player";
    d.innerHTML = `<strong>${p}</strong><div class="score">${scores[p]} pts</div>`;
    playersArena.appendChild(d);
  });
  renderLeaderboard();
}

function renderLeaderboard() {
  leaderboardList.innerHTML = "";
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  sorted.forEach(([name, pts]) => {
    const li = document.createElement("li");
    li.textContent = `${name}: ${pts} pts`;
    leaderboardList.appendChild(li);
  });
}


startBtn.onclick = () => {
  startBtn.disabled = true;
  startBtn.style.display = "none";
  leaderboard.classList.add("hidden");
  for (let p of players) 0[p] = (p === "You") ? Number(localStorage.getItem("skw_score") || 0) : 0;
  round = 1;
  renderPlayers();
  nextRound();
};


function nextRound() {
  if (round > totalRounds) return finishTournament();

  const theme = levelThemes[(round - 1) % levelThemes.length];
  roundInfo.textContent = `Round ${round} / ${totalRounds} — ${theme}`;
  renderPlayers();

  
  const mapping = {
    "ABC": memoryPeek,
    "Numbers": mathSprint,
    "Shapes": memoryPeek,
    "Coloring": matchPick,
    "Shop": sequenceBuilder,
    "Animals": memoryPeek,
    "Birds": memoryPeek,
    "Flowers": matchPick,
    "Stadium": clickRace,
    "Tree": sequenceBuilder,
    "Kitchen": mathSprint,
    "Insects": memoryPeek,
    "Workers": sequenceBuilder,
    "Vegetables": matchPick,
    "Fruits": memoryPeek,
    "Animal Rescue": clickRace,
    "Time Travel": sequenceBuilder,
    "Space": mathSprint,
    "Mini Chef": mathSprint,
    "Treasure": clickRace
  };

  const gameFn = mapping[theme] || clickRace;
  
  setTimeout(() => gameFn(theme), 300);
}

function clickRace(theme) {
  const goal = 12;
  let clicks = 0;
  let done = false;
  const timeLimit = 6;
  const card = document.createElement("div");
  card.className = "challenge-card";
  card.innerHTML = `<h3>🏁 ${theme} — Click Race</h3>
    <p>Tap the big button ${goal} times in ${timeLimit}s!</p>
    <div class="timer">Time: <span id="t">${timeLimit}</span>s</div>
    <div class="count-display">Clicks: <span id="c">0</span></div>`;

  const btn = document.createElement("button");
  btn.className = "challenge-btn";
  btn.textContent = "🔥 TAP!";
  btn.onclick = () => {
    if (done) return;
    clicks++;
    card.querySelector("#c").textContent = clicks;
    tryPlay(coinAudio);
    if (clicks >= goal) {
      done = true;
      finishRound(60 + goal*3);
    }
  };

  setChallenge(card);
  card.appendChild(btn);

  let timeLeft = timeLimit;
  const timer = setInterval(() => {
    timeLeft--;
    const tEl = card.querySelector("#t");
    if (tEl) tEl.textContent = timeLeft;
    if (done) { clearInterval(timer); return; }
    if (timeLeft <= 0) {
      clearInterval(timer);
      done = true;
      
      const pts = Math.max(5, clicks * 3);
      finishRound(pts);
    }
  }, 1000);
}


function mathSprint(theme) {
  const questions = 4;
  let index = 0;
  let correct = 0;

  const card = document.createElement("div");
  card.className = "challenge-card";
  card.innerHTML = `<h3>✏️ ${theme} — Math Sprint</h3><p>Answer ${questions} quick questions!</p><div id="math-area"></div>`;
  setChallenge(card);

  function nextQ() {
    if (index >= questions) {
      const pts = 30 + correct * 12;
      finishRound(pts);
      return;
    }
    index++;
    
    const a = Math.floor(Math.random()*10) + index;
    const b = Math.floor(Math.random()*10);
    const op = ["+","-","*"][Math.floor(Math.random()*3)];
    let ans;
    if (op === "+") ans = a + b;
    if (op === "-") ans = a - b;
    if (op === "*") ans = a * b;

    const area = card.querySelector("#math-area");
    area.innerHTML = `<div style="font-size:1.3rem">Q ${index}: ${a} ${op} ${b} = ?</div>`;
    const opts = new Set([ans]);
    while (opts.size < 4) opts.add(ans + (Math.floor(Math.random()*11)-5));
    const arr = shuffle(Array.from(opts));
    const grid = document.createElement("div");
    grid.className = "small-grid";
    arr.forEach(v => {
      const b = document.createElement("button");
      b.className = "small-btn";
      b.textContent = v;
      b.onclick = () => {
        if (v === ans) { correct++; tryPlay(coinAudio); alert("✅ Correct!"); }
        else alert("❌ Not quite!");
        nextQ();
      };
      grid.appendChild(b);
    });
    area.appendChild(grid);
  }

  nextQ();
}


function memoryPeek(theme) {
  const pool = ["🐶","🐱","🐭","🐵","🦊","🐼","🐨","🦁","🐸","🐷"];
  const len = 4;
  const seq = [];
  for (let i=0;i<len;i++) seq.push(pool[Math.floor(Math.random()*pool.length)]);

  const card = document.createElement("div");
  card.className = "challenge-card";
  card.innerHTML = `<h3>🧠 ${theme} — Memory Peek</h3>
    <p>Watch the sequence, then tap the same order</p>
    <div class="count-display" id="mem-display">${seq.join(" ")}</div>
    <div id="mem-grid" class="small-grid" style="margin-top:12px"></div>`;
  setChallenge(card);

  setTimeout(() => {
    const disp = card.querySelector("#mem-display");
    if (disp) disp.textContent = "❓ ❓ ❓ ❓";
   
    const choices = shuffle([...new Set(seq.concat(pickRandom(6, pool)))]);
    const grid = card.querySelector("#mem-grid");
    let input = [];
    choices.forEach(ch => {
      const b = document.createElement("button");
      b.className = "small-btn";
      b.textContent = ch;
      b.onclick = () => {
        tryPlay(coinAudio);
        input.push(ch);
        b.disabled = true;
        if (input.length === seq.length) {
          if (input.join(",") === seq.join(",")) finishRound(70);
          else {
            
            let pref = 0;
            for (let i=0;i<seq.length;i++) if (input[i]===seq[i]) pref++; else break;
            finishRound(pref * 10);
          }
        }
      };
      grid.appendChild(b);
    });
  }, 1600);
}


function sequenceBuilder(theme) {
  const nums = [1,2,3,4,5];
  const arr = shuffle(nums.slice());
  const card = document.createElement("div");
  card.className = "challenge-card";
  card.innerHTML = `<h3>🔢 ${theme} — Sequence Builder</h3><p>Tap numbers in ascending order</p>
    <div id="seq-grid" class="small-grid"></div>
    <div class="count-display">Picked: <span id="picked">0</span></div>`;
  setChallenge(card);

  let next = 1;
  const grid = card.querySelector("#seq-grid");
  arr.forEach(n => {
    const b = document.createElement("button");
    b.className = "small-btn";
    b.textContent = n;
    b.onclick = () => {
      if (n === next) {
        b.disabled = true;
        next++;
        card.querySelector("#picked").textContent = next-1;
        tryPlay(coinAudio);
        if (next > 5) finishRound(45);
      } else {
        
        for (const p of players) if (p!=="You") scores[p] += Math.floor(Math.random()*5);
        scores["You"] += Math.max(0,(next-1)*3);
        renderPlayers();
        setTimeout(()=> { alert("Oops! Wrong order — next round."); round++; nextRound(); }, 300);
      }
    };
    grid.appendChild(b);
  });
}


function matchPick(theme) {
  const outfits = [
    { outfit:"🌸 Dress", choices:["🎀 Bow","👜 Bag","🧢 Cap"], correct:0 },
    { outfit:"🏖️ Swimsuit", choices:["🕶️ Glasses","🧤 Gloves","🧣 Scarf"], correct:0 },
    { outfit:"🧑‍🍳 Chef", choices:["🍳 Pan","🧢 Cap","👞 Shoe"], correct:0 },
    { outfit:"🦸 Super", choices:["🛡️ Shield","📚 Book","🧢 Cap"], correct:0 }
  ];
  const pick = outfits[Math.floor(Math.random()*outfits.length)];
  const card = document.createElement("div");
  card.className = "challenge-card";
  card.innerHTML = `<h3>👗 ${theme} — Pick the Best Match</h3>
    <p>Choose accessory that suits: <strong>${pick.outfit}</strong></p>
    <div id="match-grid" class="small-grid"></div>`;
  setChallenge(card);
  const grid = card.querySelector("#match-grid");
  pick.choices.forEach((ch,i) => {
    const b = document.createElement("button");
    b.className = "small-btn";
    b.textContent = ch;
    b.onclick = () => {
      const pts = (i === pick.correct) ? 50 : 12;
      finishRound(pts);
    };
    grid.appendChild(b);
  });
}



function setChallenge(node) {
  challengeContainer.innerHTML = "";
  challengeContainer.appendChild(node);
}

function finishRound(pts) {
  
  scores["You"] += pts;
  
  players.forEach(p => { if (p !== "You") scores[p] += Math.floor(Math.random() * (pts/1.2 + 8)); });
  renderPlayers();

  
  const coinGain = Math.max(8, Math.floor(pts/3));
  updateCoins(coinGain);
  tryPlay(coinAudio);

  
  const res = document.createElement("div");
  res.className = "challenge-card";
  res.innerHTML = `<h3>Round Result</h3><p>+${pts} pts • +${coinGain} coins</p>`;
  clearChallengeAndShow(res);

 
  saveScore();
  setTimeout(() => {
    round++;
    nextRound();
  }, 900);
}

function clearChallengeAndShow(node){
  challengeContainer.innerHTML = "";
  challengeContainer.appendChild(node);
  
  showConfetti();
}

function finishTournament() {
  
  tryPlay(winAudio);
  
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const winner = sorted[0][0];

  
  const idx = sorted.findIndex(s=>s[0]==="You");
  if (idx === 0) updateCoins(500);
  else if (idx === 1) updateCoins(250);
  else if (idx === 2) updateCoins(125);

  
  const node = document.createElement("div");
  node.className = "challenge-card";
  node.innerHTML = `<h2>🏆 Tournament Finished</h2><p>Winner: <strong>${winner}</strong></p>
    <p>Your score: <strong>${scores["You"]}</strong></p>
    <button class="challenge-btn" onclick="restartTournament()">Play Again</button>`;
  setChallenge(node);

 
  leaderboard.classList.remove("hidden");
  renderLeaderboard();
  
  localStorage.setItem("skw_coins", coins);
  saveScore();
  startBtn.disabled = false;
  startBtn.style.display = "inline-block";
}


function restartTournament() {
  coins = Number(localStorage.getItem("skw_coins") || 100);
  round = 1;
  for (let p of players) scores[p] = 0;
  scores["You"] = Number(localStorage.getItem("skw_score") || 0);
  renderPlayers();
  leaderboard.classList.add("hidden");
  nextRound();
}


function shuffle(a){ for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a; }
function pickRandom(n, pool){ const out=[]; for(let i=0;i<n;i++) out.push(pool[Math.floor(Math.random()*pool.length)]); return out; }


function showConfetti() {
  const root = document.createElement("div");
  root.className = "confetti-root";
  const emojis = ["🎉","✨","🌟","🎈","💫","💖","🍬"];
  for (let i=0;i<22;i++){
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = (Math.random()*100) + "%";
    p.style.fontSize = `${12 + Math.floor(Math.random()*26)}px`;
    p.style.animationDelay = `${Math.random()*0.6}s`;
    p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    root.appendChild(p);
  }
  document.body.appendChild(root);
  setTimeout(()=> root.remove(), 2600);
}


(function init(){
  coinDisplay.textContent = coins;
  renderPlayers();
})();


