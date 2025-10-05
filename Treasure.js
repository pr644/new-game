const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 50;

let score = 0;
let currentLevel = 0;


const bgMusic = document.getElementById("bgMusic");
const collectSound = document.getElementById("collectSound");
const hitSound = document.getElementById("hitSound");
const moveSound = document.getElementById("moveSound");
bgMusic.volume = 0.3;
bgMusic.play().catch(()=>{});


const levels = [
  {
    maze:[
      [0,0,0,5,5,5,0,0,0,0],
      [0,"treasure",0,5,0,5,0,"coin",0,0],
      [0,0,0,5,0,5,0,0,"star",0],
      [0,"coin",0,0,0,0,0,0,0,0],
      [0,0,0,5,5,5,0,0,"treasure",0]
    ],
    enemies:[
      {x:8, y:1, dir:1, color:"#FF6347"},
      {x:3, y:3, dir:-1, color:"#40E0D0"}
    ]
  },
  {
    maze:[
      [0,0,5,5,5,5,0,0,0,0],
      [0,"treasure",0,0,0,5,0,"coin",0,"star"],
      [0,5,5,0,"wall",5,0,0,0,0],
      [0,0,0,0,0,0,0,"coin",0,0],
      ["star",0,0,5,5,5,0,"treasure",0,0]
    ],
    enemies:[
      {x:1, y:2, dir:1, color:"#FF69B4"},
      {x:7, y:3, dir:-1, color:"#40E0D0"}
    ]
  }
];

let maze = JSON.parse(JSON.stringify(levels[currentLevel].maze));
let enemies = JSON.parse(JSON.stringify(levels[currentLevel].enemies));
let player = {x:0,y:0,color:"red"};


function updateDisplay(){
  document.getElementById("score").innerText = score;
  document.getElementById("level").innerText = currentLevel + 1;
}


function drawMaze(){
  const time = Date.now();
  for(let y=0;y<maze.length;y++){
    for(let x=0;x<maze[y].length;x++){
      const cell = maze[y][x];
      if(cell==="wall") ctx.fillStyle="#8B4513";
      else if(cell===5) ctx.fillStyle="#1E90FF"; 
      else ctx.fillStyle="#32CD32"; 

      ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
      ctx.strokeStyle="#fff";
      ctx.strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);

      if(cell==="treasure" || cell==="coin" || cell==="star"){
        let radius = tileSize/4 + Math.sin(time/200)*5;
        if(cell==="treasure") ctx.fillStyle="#FFD700";
        if(cell==="coin") ctx.fillStyle="#FFA500";
        if(cell==="star") ctx.fillStyle="#00FFFF";
        ctx.beginPath();
        ctx.arc(x*tileSize+tileSize/2, y*tileSize+tileSize/2, radius, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }
}


function drawPlayer(){
  ctx.fillStyle=player.color;
  ctx.beginPath();
  ctx.arc(player.x*tileSize+tileSize/2, player.y*tileSize+tileSize/2,tileSize/3,0,Math.PI*2);
  ctx.fill();
  ctx.strokeStyle="#000";
  ctx.stroke();
}


function drawEnemies(){
  enemies.forEach(e=>{
    ctx.save();
    ctx.translate(e.x*tileSize + tileSize/2, e.y*tileSize + tileSize/2);
    ctx.scale(1, Math.sin(Date.now()/300)*0.1 + 1); // bounce
    ctx.fillStyle = e.color;
    ctx.beginPath();
    ctx.arc(0,0,tileSize/3,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  });
}


function moveEnemies(){
  enemies.forEach(e=>{
    if(maze[e.y][e.x+e.dir]!=="wall" && maze[e.y][e.x+e.dir]!==5) e.x+=e.dir;
    else e.dir*=-1;
  });
}


function movePlayer(dx,dy){
  if(maze[player.y+dy] && maze[player.y+dy][player.x+dx]!=="wall" && maze[player.y+dy][player.x+dx]!==5){
    player.x+=dx; player.y+=dy;
    moveSound.currentTime=0; moveSound.play();

    const cell = maze[player.y][player.x];
    if(cell==="treasure"){ score+=10; maze[player.y][player.x]=0; collectSound.play(); }
    if(cell==="coin"){ score+=5; maze[player.y][player.x]=0; collectSound.play(); }
    if(cell==="star"){ score+=15; maze[player.y][player.x]=0; collectSound.play(); }
  }
  checkGameStatus();
  drawGame();
  updateDisplay();
}


function checkGameStatus(){
  enemies.forEach(e=>{
    if(player.x===e.x && player.y===e.y){
      hitSound.play();
      alert("Oops! You hit a monster! Try again!");
      resetLevel();
    }
  });

  if(!maze.flat().some(c=>c==="treasure" || c==="coin" || c==="star")){
    alert(`🎉 Level ${currentLevel+1} Complete!`);
    currentLevel++;
    if(currentLevel>=levels.length){
      alert("🏆 You finished all levels! Congrats!");
      currentLevel=0;
      score=0;
    }
    loadLevel(currentLevel);
  }
}

function resetLevel(){
  maze=JSON.parse(JSON.stringify(levels[currentLevel].maze));
  enemies=JSON.parse(JSON.stringify(levels[currentLevel].enemies));
  player={x:0,y:0,color:"red"};
  drawGame();
  updateDisplay();
}

function loadLevel(level){
  maze=JSON.parse(JSON.stringify(levels[level].maze));
  enemies=JSON.parse(JSON.stringify(levels[level].enemies));
  player={x:0,y:0,color:"red"};
  drawGame();
  updateDisplay();
}


document.addEventListener("keydown", (e)=>{
  switch(e.key){
    case"ArrowUp": case"w": movePlayer(0,-1); break;
    case"ArrowDown": case"s": movePlayer(0,1); break;
    case"ArrowLeft": case"a": movePlayer(-1,0); break;
    case"ArrowRight": case"d": movePlayer(1,0); break;
  }
});


function drawGame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawMaze();
  drawPlayer();
  drawEnemies();
}

function gameLoop(){
  moveEnemies();
  drawGame();
  requestAnimationFrame(gameLoop);
}

gameLoop();
updateDisplay();

function goToLobby() {
  window.location.href = "index.html";
}
