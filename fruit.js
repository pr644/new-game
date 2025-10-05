const fruits = document.querySelectorAll(".fruit");
const baskets = document.querySelectorAll(".basket");
const body = document.body;
let landedCount = 0;


baskets.forEach(b => b.style.background = b.dataset.color);


fruits.forEach(fruit => {
  fruit.addEventListener("click", () => {
    const jumpHeight = Math.random() * 100 + 150;
    const rotateDeg = Math.random() * 360;
    fruit.style.transform = `translateY(-${jumpHeight}px) rotate(${rotateDeg}deg)`;
    fruit.style.boxShadow = `0 0 35px ${fruit.dataset.color}`;
    playSound();
    changeBackground(fruit.dataset.color);
    showName(fruit);
    setTimeout(() => {
      fruit.style.transform = "";
      fruit.style.boxShadow = "";
      checkLanding(fruit);
    }, 800);
  });
});


function showName(fruit) {
  const tip = document.createElement("div");
  tip.innerText = `${fruit.dataset.fruit} - ${fruit.dataset.fact}`;
  tip.style.position = "absolute";
  tip.style.top = (fruit.offsetTop - 25) + "px";
  tip.style.left = fruit.offsetLeft + "px";
  tip.style.color = fruit.dataset.color;
  tip.style.fontWeight = "bold";
  tip.style.background = "#ffffffaa";
  tip.style.padding = "2px 5px";
  tip.style.borderRadius = "5px";
  document.body.appendChild(tip);
  setTimeout(() => tip.remove(), 1500);
}


function changeBackground(color) {
  body.style.background = `linear-gradient(to bottom, ${color}33, #ccf2ff)`;
}


function checkLanding(fruit) {
  const basket = Array.from(baskets).find(b => b.dataset.color === fruit.dataset.color);
  if (basket) {
    basket.classList.add("correct");
    fruit.style.display = "none";
    landedCount++;
    addHat(fruit.dataset.fruit);
    if (landedCount === fruits.length) {
      showReward();
    }
  }
}


function addHat(fruitName) {
  const hat = document.createElement("div");
  hat.innerText = `👑 ${fruitName}`;
  hat.style.position = "absolute";
  hat.style.top = "10px";
  hat.style.right = (Math.random()*300) + "px";
  hat.style.fontSize = "24px";
  document.body.appendChild(hat);
  setTimeout(() => hat.remove(), 2500);
}


function showReward() {
  const reward = document.getElementById("reward");
  reward.classList.remove("hidden");
  playRewardSound();
}


function playSound() {
  const audio = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");
  audio.play();
}


function playRewardSound() {
  const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
  audio.play();
}


function restartGame() {
  location.reload();
}
function goToLobby() {
  window.location.href = "index.html";
}

