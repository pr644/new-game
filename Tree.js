const startBtn = document.getElementById("startBtn");
const branches = document.querySelectorAll(".branch");
const infoBox = document.getElementById("infoBox");
const treeImage = document.getElementById("treeImage");
const treeName = document.getElementById("treeName");
const feedback = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

const bgMusic = document.getElementById("bgMusic");
const crowd = document.getElementById("crowd");
const whistle = document.getElementById("whistle");

let score = 0;
let visitedTrees = new Set();  

const trees = {
  mango: {
    name: "Mango Tree 🥭",
    img: "https://www.tropicalpermaculture.com/images/growing-mangoes-5.jpg.pagespeed.ce.JGAy5c1I70.jpg",
    sound: "https://cdn.pixabay.com/download/audio/2021/09/02/audio_849b62f0b3.mp3?filename=birds-chirping-ambient-nature-sounds-8012.mp3"
  },
  apple: {
    name: "Apple Tree 🍎",
    img: "https://www.trees.com/wp-content/uploads/2020/07/Types-of-apple-trees.jpg",
    sound: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5c0c6e3881.mp3?filename=small-bell-ding-112193.mp3"
  },
  coconut: {
    name: "Coconut Tree 🥥",
    img: "https://t3.ftcdn.net/jpg/02/99/05/24/360_F_299052492_E8MwfyTRnSMeDaqvMElHZpd7po4vq4Pv.jpg",
    sound: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_6a21d01ab5.mp3?filename=water-splash-112957.mp3"
  },
  pine: {
    name: "Pine Tree 🌲",
    img: "https://cff2.earth.com/uploads/2023/05/08165030/pine-trees_1medium-960x640.jpg",
    sound: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_0e5c5f2ff6.mp3?filename=wind-blowing-in-trees-112192.mp3"
  },
  banyan: {
    name: "Banyan Tree 🌳",
    img: "https://d2al04l58v9bun.cloudfront.net/blog/wp-content/uploads/2023/07/21161826/Know-All-About-The-Astrological-Benefits-of-Banyan-Tree.jpg",
    sound: "https://cdn.pixabay.com/download/audio/2021/09/01/audio_b2ee5d3887.mp3?filename=forest-sounds-ambient-nature-sounds-7105.mp3"
  }
};

startBtn.addEventListener("click", () => {
  bgMusic.play().catch(e => console.log("Play blocked:", e));
  createLeaves();
  startBtn.style.display = "none";
});

branches.forEach(branch => {
  branch.addEventListener("click", () => {
    const key = branch.dataset.tree;
    if (visitedTrees.has(key)) return; 

    const tree = trees[key];

    infoBox.classList.remove("hidden");
    treeName.textContent = tree.name;
    treeImage.src = tree.img;
    feedback.textContent = "🎵 Listen to the sound!";

    playTreeSound(tree.sound);

    score++;
    scoreEl.textContent = `Score: ${score}`;
    visitedTrees.add(key);

    checkGameOver();
  });
});

function playTreeSound(src) {
  const audio = new Audio(src);
  audio.play().catch(e => console.log("Sound blocked:", e));

  crowd.play().catch(e => console.log("Crowd blocked", e));
  whistle.play().catch(e => console.log("Whistle blocked", e));
}

function createLeaves() {
  const leavesContainer = document.querySelector(".leaves");
  for (let i = 0; i < 30; i++) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.textContent = "🍃";
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.animationDuration = (3 + Math.random() * 3) + "s";
    leavesContainer.appendChild(leaf);
  }
}


function checkGameOver() {
  if (visitedTrees.size === Object.keys(trees).length) {
    setTimeout(() => {
      alert(`🎉 Game Over! You discovered all trees! Your score: ${score}`);
      resetGame();
    }, 300); 
  }
}

function resetGame() {
  score = 0;
  scoreEl.textContent = `Score: ${score}`;
  visitedTrees.clear();
  infoBox.classList.add("hidden");
  startBtn.style.display = "block";
}

