const ingredientContainer = document.getElementById('ingredientContainer');
const bowl = document.getElementById('bowl');
const stirButton = document.getElementById('stirButton');
const bakeButton = document.getElementById('bakeButton');
const rewardMsg = document.querySelector('.rewardMsg');
const ingredientsUsedEl = document.getElementById('ingredientsUsed');
const stepsCompletedEl = document.getElementById('stepsCompleted');
const levelEl = document.getElementById('level');

const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

let ingredientsUsed = 0;
let stepsCompleted = 0;
let level = 1;

// Sounds
const dropSound = document.getElementById('dropSound');
const stirSound = document.getElementById('stirSound');
const bakeSound = document.getElementById('bakeSound');

// Game levels
const levels = [
  {name:"Pizza", ingredients:["tomato","cheese","dough","pepper"], reward:"🍕 Pizza Ready!"},
  {name:"Cake", ingredients:["flour","egg","sugar","chocolate"], reward:"🎂 Cake Ready!"},
  {name:"Sandwich", ingredients:["bread","lettuce","cheese","tomato"], reward:"🥪 Sandwich Ready!"}
];

// Ingredient emojis
function getEmoji(name){
  const map = {
    tomato:"🍅", cheese:"🧀", dough:"🍞", pepper:"🌶️",
    flour:"🌾", egg:"🥚", sugar:"🍬", chocolate:"🍫",
    bread:"🍞", lettuce:"🥬"
  };
  return map[name] || "🍎";
}

// Load a level
function loadLevel(lvl){
  ingredientContainer.innerHTML='';
  const current = levels[lvl-1];
  current.ingredients.forEach(item=>{
    const ing = document.createElement('div');
    ing.className='ingredient'; ing.id=item; ing.draggable=true;
    ing.innerText=getEmoji(item);
    ingredientContainer.appendChild(ing);

    ing.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text', e.target.id);
    });
  });
  ingredientsUsed=0; stepsCompleted=0;
  ingredientsUsedEl.innerText=ingredientsUsed;
  stepsCompletedEl.innerText=stepsCompleted;
  levelEl.innerText=level;
  rewardMsg.classList.add('hidden'); rewardMsg.innerText='';
  bowl.innerHTML='';
}

// Drop ingredient
bowl.addEventListener('dragover', e=>e.preventDefault());
bowl.addEventListener('drop', e=>{
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const clone = document.getElementById(id).cloneNode(true);
  clone.style.position='absolute';
  clone.style.left=`${Math.random()*100 +50}px`;
  clone.style.top=`${Math.random()*40}px`;
  clone.style.opacity="0";
  bowl.appendChild(clone);

  setTimeout(()=>{
    clone.style.transition="transform 0.6s ease, opacity 0.6s";
    clone.style.transform="scale(1) rotate("+(Math.random()*60-30)+"deg)";
    clone.style.opacity="1";
  }, 10);

  dropSound.currentTime=0; dropSound.play();
  ingredientsUsed++; ingredientsUsedEl.innerText=ingredientsUsed;
});

// Stir action
stirButton.addEventListener('click', ()=>{
  bowl.classList.add('stirring');
  stirSound.currentTime=0; stirSound.play();
  addSteam();

  setTimeout(()=>{
    bowl.classList.remove('stirring');
    stepsCompleted++; stepsCompletedEl.innerText=stepsCompleted;
  }, 1000);
});

// Bake action
bakeButton.addEventListener('click', ()=>{
  bowl.classList.add('baking');
  bakeSound.currentTime=0; bakeSound.play();
  addConfetti();
  addSparkles();

  setTimeout(()=>{
    bowl.classList.remove('baking');
    rewardMsg.innerText=levels[level-1].reward;
    rewardMsg.classList.remove('hidden');

    if(level < levels.length){
      level++;
      setTimeout(()=>{ loadLevel(level); },1500);
    } else {
      rewardMsg.innerText += " 🏆 All dishes done!";
    }
  },1500);
});

// Steam animation
function addSteam(){
  const steam = document.createElement('div');
  steam.innerText = "💨";
  steam.style.position='absolute';
  steam.style.fontSize='20px';
  steam.style.left=`${Math.random()*180 + 10}px`;
  steam.style.bottom='50px';
  bowl.appendChild(steam);

  let y=0;
  const interval=setInterval(()=>{
    y+=2; steam.style.bottom=50+y+'px'; steam.style.opacity=1-(y/100);
    if(y>100){ steam.remove(); clearInterval(interval); }
  },30);
}

// Sparkles
function addSparkles(){
  for(let i=0;i<10;i++){
    const sparkle = document.createElement('div');
    sparkle.innerText = "✨";
    sparkle.style.position="absolute";
    sparkle.style.left=(Math.random()*150+50)+"px";
    sparkle.style.bottom="60px";
    sparkle.style.fontSize="20px";
    bowl.appendChild(sparkle);

    let y=0;
    const interval=setInterval(()=>{
      y+=2; sparkle.style.bottom=(60+y)+"px"; sparkle.style.opacity=1-(y/50);
      if(y>50){ sparkle.remove(); clearInterval(interval); }
    },50);
  }
}

// Confetti
const confettiParticles=[];
function addConfetti(){
  for(let i=0;i<80;i++){
    confettiParticles.push({
      x:200, y:100, r:Math.random()*5+2,
      dx:(Math.random()-0.5)*4, dy:Math.random()*-4-2,
      color:`hsl(${Math.random()*360},100%,50%)`
    });
  }
}
function drawConfetti(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiParticles.forEach((p, i)=>{
    p.x+=p.dx; p.y+=p.dy; p.dy+=0.05;
    ctx.fillStyle=p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    if(p.y>confettiCanvas.height) confettiParticles.splice(i,1);
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

loadLevel(level);
function goToLobby() {
  window.location.href = "index.html";
}
