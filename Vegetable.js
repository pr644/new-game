const vegetables = [
  { 
    id:'carrot'  , 
    emoji:'🥕', 
    name:'Carrot', 
    fact:'Helps you see in the dark (Vitamin A).',       
    action:'Grows orange with sparkle pop.'
},
  { 
    id:'tomato'  , 
    emoji:'🍅', 
    name:'Tomato', 
    fact:'It’s a fruit, but we eat it as a veggie!',     
    action:'Pops red & shiny.'
},
  { 
    id:'potato'  , 
    emoji:'🥔', 
    name:'Potato', 
    fact:'Grows underground like hidden treasure.',      
    action:'Pops out of soil with Ta-da!.'
},
  { 
    id:'corn',     
    emoji:'🌽', 
    name:'Corn',   
    fact:'Each corn cob has hundreds of golden kernels.',
    action:'Shakes when ready, glitter comes out.'
  },
  { 
    id:'broccoli', 
    emoji:'🥦',  
    name:'Broccoli',
    fact:'Looks like a tiny green tree.',               
    action:'Bounces & waves like a tree.'
},
  { 
    id:'onion',    
    emoji:'🧅',  
    name:'Onion',   
    fact:'Can make you cry while cooking.',              
   action:'Pops with little sparkle tears.'
},
  { 
   id:'cucumber', 
   emoji:'🥒',  
   name:'Cucumber', 
   fact:'Mostly water (keeps you cool).',               
   action:'Splashes water sparkle.'
},
  { 
    id:'capsicum', 
      emoji:'🫑',  
      name:'Capsicum', 
       fact:'Comes in red, green, yellow.',                 
        action:'Sparkle color change.'
},
  { 
    id:'eggplant', 
      emoji:'🍆',  
      name:'Brinjal',  
      fact:'Called King of Vegetables.',                    
       action:'Pops with crown sparkle.'
},
  { 
    id:'cabbage',  
      emoji:'🥬',  
      name:'Cabbage',  
      fact:'Layers like a surprise gift.',                  
    action:'Opens up layer by layer.'
},
  { 
    id:'garlic' ,  
      emoji:'🧄',  
      name:'Garlic',  
      fact:'Protects from colds & vampires.',                
       action:'Pops with poof smoke.'
},
  { 
    id:'spinach ', 
      emoji:'🥗',  
      name:'Spinach',  
      fact:'Makes you strong like Popeye.',                 
      action:'Sparkle muscles appear.'
}
];
const seed = document.getElementById('seed');
const soil = document.getElementById('soil');
const plant = document.getElementById('plant');
const vegEmoji = document.getElementById('vegEmoji');
const vegName = document.getElementById('vegName');
const cards = document.getElementById('cards');
const coinCountEl = document.getElementById('coinCount');
const reward = document.getElementById('reward');
const rewardCoins = document.getElementById('rewardCoins');
const dragsArea = document.getElementById('dragsArea');
const dragList = document.getElementById('dragList');
const quizArea = document.getElementById('quizArea');
const quizDrags = document.getElementById('quizDrags');
const basketsParent = document.getElementById('baskets');
const quizBtn = document.getElementById('quizBtn');

let planted = null;
let coins = 0;


function makeCards(){
  cards.innerHTML = '';
  vegetables.forEach(v=>{
    const c = document.createElement('div'); c.className = 'card-item';
    c.innerHTML = `<div class="emoji">${v.emoji}</div><div class="name"><strong>${v.name}</strong></div><div class="fact">${v.fact}</div><div class='sparkle' aria-hidden="true"></div>`;
    c.addEventListener('click', ()=> { speak(`${v.name}. ${v.fact}`); animateCard(c); });
    cards.appendChild(c);
  });
}
makeCards();


function speak(text){
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }
}


function animateCard(card){
  const sp = card.querySelector('.sparkle');
  if(!sp) return;
  sp.classList.remove('sparkle-anim');
  void sp.offsetWidth;
  sp.classList.add('sparkle-anim');
}


document.getElementById('plantBtn').addEventListener('click', ()=>{
  seed.style.display='block';
  plant.style.display='none';
  seed.style.left = (20 + Math.random()*60) + '%';
  speak('Tap the seed to plant it!');
});

seed.addEventListener('click', ()=>{
  planted = vegetables[Math.floor(Math.random()*vegetables.length)];
  seed.style.display='none';
  vegEmoji.textContent = planted.emoji;
  vegName.textContent = planted.name;
  plant.style.display='block';
  plant.classList.remove('grow');
  void plant.offsetWidth;
  plant.classList.add('grow');
  playPop();
  animateSparklesAt(plant);
  speak(`${planted.name}! ${planted.action}`);
  addCoins(5);
});


document.getElementById('waterBtn').addEventListener('click', ()=>{
  if(!planted){ 
    speak('Please plant a seed first'); 
    return; 
}
  playWater();
  animateSparklesAt(plant);
  speak('Watered! Keep going!');
  addCoins(2);
});


document.getElementById('learnBtn').addEventListener('click', ()=>{
  cards.style.display = 'flex';
  dragsArea.setAttribute('aria-hidden','true');
  quizArea.style.display = 'none';
  reward.style.display = 'none';
  speak('Tap a vegetable card to hear a fun fact');
});


quizBtn.addEventListener('click', startQuiz);

function startQuiz(){
  
  quizArea.style.display = 'flex';
  dragsArea.setAttribute('aria-hidden','false');
  cards.style.display = 'none';
  reward.style.display = 'none';
  dragList.innerHTML = '';
  quizDrags.innerHTML = '<strong>Drag these into the correct baskets</strong>';

  
  const pool = shuffleArray(vegetables).slice(0,6);
  basketsParent.innerHTML = '';
  quizDrags.innerHTML = '';

  pool.forEach(v=>{
    
    const item = document.createElement('div'); item.className='drag-item'; item.draggable=true; item.dataset.id=v.id;
    item.innerHTML = `<div class='emoji-big'>${v.emoji}</div><div>${v.name}</div>`;
    item.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', v.id); });
    quizDrags.appendChild(item);

    
    const b = document.createElement('div'); b.className='basket'; b.dataset.id = v.id;
    b.innerHTML = `<strong>${v.name} basket</strong><div class="dropzone" style="min-height:60px;margin-top:10px"></div>`;
    b.addEventListener('dragover', e => e.preventDefault());
    b.addEventListener('drop', e => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      handleDrop(id, v.id, b);
    });
    basketsParent.appendChild(b);
  });

  speak('Drag each vegetable to its matching basket');
}


function handleDrop(dragId, basketId, basketEl){
  const item = document.querySelector(`.drag-item[data-id="${dragId}"]`);
  if(!item) return;
  if(dragId === basketId){
   
    const zone = basketEl.querySelector('.dropzone');
    zone.appendChild(item);
    item.draggable = false;
    item.style.opacity = 0.95;
    playPop(); addCoins(10); speak('Correct!');
    checkQuizComplete();
  } else {
   
    playWrong(); speak('Try again!');
    item.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}], {duration:380});
  }
}


function checkQuizComplete(){
  const remaining = document.querySelectorAll('#quizDrags .drag-item');
 
  const left = Array.from(document.querySelectorAll('.drag-item')).filter(d => d.draggable === true);
  if(left.length === 0){
    reward.style.display = 'flex';
    rewardCoins.textContent = '+50';
    addCoins(50);
    runConfetti();
    speak('Well done! You are a Super Farmer');
  }
}


function addCoins(n){
  coins += n;
  coinCountEl.textContent = coins;
}


function shuffleArray(a){ 
    return a.slice().sort(()=>Math.random()-0.5); 
}


const ac = new (window.AudioContext || window.webkitAudioContext)();
function playPop(){ const o=ac.createOscillator(), g=ac.createGain(); o.type='triangle'; o.frequency.value=520; g.gain.value=0.04; o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime+0.08); }
function playWater(){ const o=ac.createOscillator(), g=ac.createGain(); o.type='sine'; o.frequency.value=240; g.gain.value=0.03; o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime+0.22); }
function playWrong(){ const o=ac.createOscillator(), g=ac.createGain(); o.type='sawtooth'; o.frequency.value=160; g.gain.value=0.05; o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime+0.14); }


function animateSparklesAt(el){
  for(let i=0;i<6;i++){
    const s = document.createElement('div');
    s.style.position = 'absolute';
    s.style.width = '12px';
    s.style.height = '12px';
    s.style.background = 'radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0))';
    s.style.left = (10 + Math.random()*60) + '%';
    s.style.top = (Math.random()*40) + '%';
    s.style.borderRadius = '50%';
    s.style.pointerEvents = 'none';
    el.appendChild(s);
    const anim = s.animate([{opacity:1, transform:'translateY(0) scale(1)'}, {opacity:0, transform:'translateY(-30px) scale(0.4)'}], {duration:900+Math.random()*400});
    anim.onfinish = ()=> s.remove();
  }
}


function runConfetti(){
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  let particles = [];
  for(let i=0;i<140;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*-canvas.height,
      vy: 2 + Math.random()*6,
      size: 4 + Math.random()*8,
      rot: Math.random()*360,
      color: ['#FFD166','#06D6A0','#4CC9F0','#EF476F'][Math.floor(Math.random()*4)]
    });
  }

  function frame(t){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += Math.sin((t + p.x) / 200) * 0.8;
      p.y += p.vy;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.restore();
    });
    particles = particles.filter(p => p.y < canvas.height + 50);
    if(particles.length) requestAnimationFrame(frame);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  requestAnimationFrame(frame);
  setTimeout(()=>{ 
    canvas.width = 0; 
    canvas.height = 0; 
}, 4200);
}


(function seedHint(){
  seed.animate([{
    transform:'scale(1)'},
    {
    transform:'scale(1.08)'
},{transform:'scale(1)'}],
{
    duration:1500,iterations:Infinity
}
);
})();


window.addEventListener('beforeunload', ()=> { 
    if(window.speechSynthesis) window.speechSynthesis.cancel(); 
});

function goToLobby() {
  window.location.href = "index.html";
}


