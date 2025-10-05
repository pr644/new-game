let coins = 100;
const coinDisplay = document.getElementById("store-coin-count");


function loadCoins() {
  const saved = JSON.parse(localStorage.getItem("skw_coins"));
  if (saved !== null) coins = saved;
  updateCoins();
}

function saveCoins() {
  localStorage.setItem("skw_coins", JSON.stringify(coins));
}

function updateCoins() {
  coinDisplay.textContent = coins;
}


const items = {
  avatar: [
    { name: "Cool Hat", price: 20, emoji: "🧢" },
    { name: "Sunglasses", price: 25, emoji: "🕶️" },
    { name: "Fancy Shirt", price: 30, emoji: "👕" }
  ],
  toys: [
    { name: "Teddy Bear", price: 15, emoji: "🧸" },
    { name: "Toy Car", price: 10, emoji: "🚗" },
    { name: "Robot", price: 40, emoji: "🤖" }
  ],
  pets: [
    { name: "Little Dog", price: 50, emoji: "🐶" },
    { name: "Cat Friend", price: 45, emoji: "🐱" }
  ],
  powerups: [
    { name: "Speed Boost", price: 30, emoji: "⚡" },
    { name: "Magic Star", price: 35, emoji: "⭐" }
  ]
};


function showCategory(category) {
  const container = document.getElementById("store-items");
  container.innerHTML = "";

  items[category].forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    const emoji = document.createElement("p");
    emoji.textContent = item.emoji;

    const name = document.createElement("p");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `💰 ${item.price}`;

    const buyBtn = document.createElement("button");
    buyBtn.textContent = "Buy";
    buyBtn.onclick = () => buyItem(item);

    card.appendChild(emoji);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(buyBtn);

    container.appendChild(card);
  });
}


function buyItem(item) {
  if (coins >= item.price) {
    coins -= item.price;
    saveCoins();
    updateCoins();
    alert(`🎉 You bought ${item.name}!`);
  } else {
    alert("❌ Not enough coins!");
  }
}


loadCoins();
