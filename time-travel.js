const scenes = document.querySelectorAll('.scene');
const nextBtn = document.getElementById('nextScene');
const prevBtn = document.getElementById('prevScene');
let current = 0;

const gemsEl = document.getElementById('gems');
const missionsEl = document.getElementById('missions');
let gems = 0;
let missions = 0;


function showScene(index){
  scenes.forEach((scene,i)=>{
    scene.classList.toggle('hidden', i !== index);
  });
}
showScene(current);


nextBtn.addEventListener('click', ()=>{
  current = (current + 1) % scenes.length;
  showScene(current);
});
prevBtn.addEventListener('click', ()=>{
  current = (current - 1 + scenes.length) % scenes.length;
  showScene(current);
});


const symbols = document.querySelectorAll('.symbol');
const targets = document.querySelectorAll('.target');

symbols.forEach(sym=>{
  sym.draggable = true;
  sym.addEventListener('dragstart', e=>{
    e.dataTransfer.setData('match', sym.dataset.match);
  });
});

targets.forEach(target=>{
  target.addEventListener('dragover', e=> e.preventDefault());
  target.addEventListener('drop', e=>{
    const data = e.dataTransfer.getData('match');
    if(data === target.dataset.match && !target.classList.contains('filled')){
      target.classList.add('filled');
      gems++;
      missions++;
      gemsEl.textContent = gems;
      missionsEl.textContent = missions;
      showReward(target.parentElement.parentElement.querySelector('.rewardMsg'), "Correct! +1 Gem");
    }
  });
});


function showReward(el, text){
  el.textContent = text;
  el.classList.remove('hidden');
  setTimeout(()=> el.classList.add('hidden'), 2000);
}
function goToLobby() {
  window.location.href = "index.html";
}
