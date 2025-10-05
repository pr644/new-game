const animalsArea = document.getElementById('animalsArea');
const homesArea = document.getElementById('homesArea');
const rewardMsg = document.getElementById('rewardMsg');
const coinsEl = document.querySelector('#coins span');
const badgesEl = document.querySelector('#badgeCount');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hintBtn = document.getElementById('hintBtn');
const resetBtn = document.getElementById('resetBtn');
const frameTitle = document.getElementById('frameTitle');

let coins = 0;
let badges = 0;
let currentFrame = 0;


const frames = [
  {
    name: "Farm",
    animals: ["🐶", "🐱", "🐰", "🐮"],
    homes: ["Dog House", "Cat House", "Rabbit Hutch", "Cow Barn"]
  },
  {
    name: "Forest",
    animals: ["🦊", "🦝", "🦉", "🐻"],
    homes: ["Fox Den", "Raccoon Home", "Owl Nest", "Bear Cave"]
  },
  {
    name: "Ocean",
    animals: ["🐠", "🐙", "🐬", "🦀"],
    homes: ["Fish Tank", "Octopus Reef", "Dolphin Cove", "Crab Hole"]
  }
];


function loadFrame(frameIndex){
  animalsArea.innerHTML = "";
  homesArea.innerHTML = "";
  const frame = frames[frameIndex];
  frameTitle.textContent = frame.name;

  
  frame.animals.forEach((emoji, i)=>{
    const animal = document.createElement('div');
    animal.classList.add('animal');
    animal.textContent = emoji;
    animal.setAttribute('draggable', true);
    animal.dataset.index = i;

    animal.addEventListener('dragstart', dragStart);
    animalsArea.appendChild(animal);
  });

  
  frame.homes.forEach((homeName, i)=>{
    const home = document.createElement('div');
    home.classList.add('home');
    home.textContent = homeName;
    home.dataset.index = i;

    home.addEventListener('dragover', dragOver);
    home.addEventListener('drop', dropAnimal);
    homesArea.appendChild(home);
  });

  
  prevBtn.disabled = frameIndex === 0;
  nextBtn.disabled = frameIndex === frames.length - 1;
}


let draggedAnimal = null;
function dragStart(e){
  draggedAnimal = e.target;
}

function dragOver(e){
  e.preventDefault();
  e.target.classList.add('accepting');
}

function dropAnimal(e){
  e.preventDefault();
  e.target.classList.remove('accepting');
  if(draggedAnimal.dataset.index === e.target.dataset.index){
    e.target.appendChild(draggedAnimal);
    showReward("Animal Rescued!");
  } else {
    showReward("Try Again!");
  }
  draggedAnimal = null;
}


function showReward(msg){
  rewardMsg.textContent = `🎉 ${msg} 🎉`;
  rewardMsg.classList.remove('hidden');
  setTimeout(()=> rewardMsg.classList.add('hidden'), 2000);

  if(msg === "Animal Rescued!"){
    coins++;
    badges++;
    coinsEl.textContent = coins;
    badgesEl.textContent = badges;
  }
}


prevBtn.addEventListener('click', ()=>{ currentFrame--; loadFrame(currentFrame); });
nextBtn.addEventListener('click', ()=>{ currentFrame++; loadFrame(currentFrame); });


hintBtn.addEventListener('click', ()=> alert("Drag the animals into their correct homes!"));
resetBtn.addEventListener('click', () => {
  rewardMsg.classList.add('hidden');
  draggedAnimal = null;
  loadFrame(currentFrame);
});


loadFrame(currentFrame);
function goToLobby() {
  window.location.href = "index.html";
}
