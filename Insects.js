const flowers = document.querySelectorAll(".flower");
const infoBox = document.getElementById("infoBox");
const insectNameEl = document.getElementById("insectName");
const insectFactEl = document.getElementById("insectFact");
const scoreEl = document.getElementById("score");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

let score = 0;
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;


const insects = {
  ladybug: { name: "Ladybug 🐞", sound: document.getElementById("ladybugSound"), fact: "Ladybugs can eat up to 5,000 aphids in their lifetime!" },
  butterfly: { name: "Butterfly 🦋", sound: document.getElementById("butterflySound"), fact: "Butterflies taste with their feet!" },
  bee: { name: "Bee 🐝", sound: document.getElementById("beeSound"), fact: "Bees communicate by dancing!" },
  ant: { name: "Ant 🐜", sound: document.getElementById("antSound"), fact: "Ants can carry 50 times their own weight!" },
  dragonfly: { name: "Dragonfly 🐉", sound: document.getElementById("dragonflySound"), fact: "Dragonflies can fly in all directions!" },
  grasshopper: { name: "Grasshopper 🦗", sound: document.getElementById("grasshopperSound"), fact: "Grasshoppers can jump up to 20 times their body length!" }
};


const confettis = [];
function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      r: Math.random() * 6 + 4,
      d: Math.random() * 50 + 10,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10
    });
  }
}


function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confettis.forEach((c, i) => {
    ctx.beginPath();
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.r);
    ctx.lineWidth = c.r / 2;
    ctx.strokeStyle = c.color;
    ctx.stroke();
    c.y += Math.sin(c.d) + 1 + c.r / 2;
    c.tilt += Math.cos(c.d) * 0.5;
    if (c.y > window.innerHeight) {
      c.y = -10;
      c.x = Math.random() * window.innerWidth;
    }
  });
  requestAnimationFrame(drawConfetti);
}
createConfetti();
drawConfetti();


flowers.forEach(flower => {
  flower.addEventListener("click", () => {
    const insectKey = flower.dataset.insect;
    const insect = insects[insectKey];

    insectNameEl.textContent = insect.name;
    insectFactEl.textContent = insect.fact;
    infoBox.classList.remove("hidden");

    
    insect.sound.currentTime = 0;
    insect.sound.play().catch(err => console.log("🔇 Sound blocked:", err));

   
    score++;
    scoreEl.textContent = `Score: ${score}`;

    
    if (score >= 3) {
      confettis.forEach(c => c.y = Math.random() * window.innerHeight);
    }
  });
});



function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);

 
  sparkle.addEventListener("animationend", () => {
    sparkle.remove();
  });
}


flowers.forEach(flower => {
  flower.addEventListener("mousemove", e => {
    createSparkle(e.clientX, e.clientY);
  });

  flower.addEventListener("click", e => {
    createSparkle(e.clientX, e.clientY);
  });
});


function backToGarden() {
  infoBox.classList.add("hidden");
}

function goBack() {
  window.location.href = "index.html"; 
}

