// Load coins from localStorage
let coins = parseInt(localStorage.getItem("coins")) || 0;
let coinsDisplay = document.getElementById("coins");
coinsDisplay.textContent = coins;

// Load purchased collection
let collection = JSON.parse(localStorage.getItem("collection")) || [];
updateCollection();

// Handle Buy Buttons
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    let parent = this.parentElement;
    let price = parseInt(parent.dataset.price);
    let name = parent.dataset.name;

    if (coins >= price) {
      coins -= price;
      coinsDisplay.textContent = coins;
      localStorage.setItem("coins", coins);

      if (!collection.includes(name)) {
        collection.push(name);
      }
      localStorage.setItem("collection", JSON.stringify(collection));
      updateCollection();

      alert("🎉 You bought " + name + "!");
    } else {
      alert("❌ Not enough coins!");
    }
  });
});

// Update Collection display
function updateCollection() {
  let box = document.getElementById("collection");
  box.innerHTML = collection.join(" ");
}
