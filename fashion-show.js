let coins = 100;
let selectedModel = null;
let selectedWardrobe = [];

function updateCoins() {
    document.getElementById("coin-count").textContent = coins;
}

function selectModel(model) {
    selectedModel = model;
    alert(`You selected ${model} as your model!`);
}

function addWardrobe(item) {
    if (!selectedModel) { alert("Select a model first!"); return; }
    selectedWardrobe.push(item);
    alert(`${item} added to your outfit!`);
}

document.getElementById("start-show-btn").onclick = () => {
    if (!selectedModel) { alert("Select a model first!"); return; }
    if (selectedWardrobe.length === 0) { alert("Add at least one outfit!"); return; }

    const runway = document.getElementById("runway");
    runway.innerHTML = "";

    const avatar = document.createElement("div");
    avatar.className = "runway-avatar";
    avatar.textContent = selectedModel + selectedWardrobe.join('');
    runway.appendChild(avatar);

    
    for (let i = 0; i < 5; i++) {
        const light = document.createElement("div");
        light.className = "stage-light";
        light.style.left = `${i*20}%`;
        runway.appendChild(light);
    }

    
    for (let i = 0; i < selectedWardrobe.length*3; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.style.left = `${Math.random()*80}%`;
        sparkle.style.bottom = `${Math.random()*80}px`;
        sparkle.textContent = "✨";
        runway.appendChild(sparkle);
    }

   
    avatar.style.left = "0px";
    setTimeout(() => {
        avatar.style.left = "calc(100% - 80px)";
    }, 100);

    
    const audience = document.getElementById("audience");
    audience.innerHTML = "";
    setTimeout(() => {
        const reactions = ["👏", "🎉", "❤️", "💖"];
        for (let i = 0; i < reactions.length; i++) {
            const react = document.createElement("span");
            react.textContent = reactions[i].repeat(Math.floor(Math.random()*3+1));
            audience.appendChild(react);
        }
    }, 2000);

    
    setTimeout(() => {
        let reward = 20 + selectedWardrobe.length*10;
        coins += reward;
        updateCoins();
        alert(`🎉 Fashion show complete! You earned ${reward} coins!`);
        selectedWardrobe = [];
    }, 3000);
}

updateCoins();
