const numbers = [
  { num: "1", word: "One car", img: "https://tse1.mm.bing.net/th/id/OIP.XRtahS_rZ1NNm5Hw2Z_0NwHaEW?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/one--_gb_1.mp3" },
  { num: "2", word: "Two Bananas", img: "https://tse1.mm.bing.net/th/id/OIP.QM-DpbyyAUWZORLj-KCangHaHa?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/two--_gb_1.mp3" },
  { num: "3", word: "Three tree", img: "https://tse2.mm.bing.net/th/id/OIP.kPNwh_L2cBS2wc1NRfpqIgHaE8?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/three--_gb_1.mp3" },
  { num: "4", word: "Four Birds", img: "https://tse4.mm.bing.net/th/id/OIP.NwHMQAGz3sGJ3FruRnRvxQHaEJ?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/four--_gb_1.mp3" },
  { num: "5", word: "Five Book", img: "https://tse4.mm.bing.net/th/id/OIP.mbowwZ6v5gA_gfehtKoH0QHaHa?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/five--_gb_1.mp3" },
];

let currentIndex = 0;

function showNumber(index) {
  const item = numbers[currentIndex];
  document.getElementById("number").textContent = item.num;
  document.getElementById("image").src = item.img;
  document.getElementById("image").alt = item.word;
  document.getElementById("word").textContent = item.word;
  document.getElementById("number-sound").src = item.sound;
  document.getElementById("progressBar").value = currentIndex + 1;
  document.getElementById("progressText").textContent = `${index + 1}/${numbers.length}`;
}

function playSound() {
const audio = document.getElementById("number-sound");
document.getElementById("number-sound").load();

  audio.currentTime = 0; 
  audio.play();
  audio.play();
}
function startGame() {
  document.getElementById("bg-sound").play();
  document.getElementById("start-screen").style.display = "none";
  document.querySelector(".number-container").style.display = "block";
  showNumber(currentIndex);
  document.getElementById("start-music").onclick = function() {
  const bg = document.getElementById("bg-sound");
  bg.play().catch(e => console.log("Music play blocked:", e));
  }

}


function nextNumber() {
  if (currentIndex < numbers.length - 1) {
    currentIndex++;
    showNumber(currentIndex);
  }else{
    document.querySelector(".number-container").style.display = "none";
    document.getElementById("finish-message").style.display = "block";
  }
}

function prevNumber() {
  if (currentIndex > 0) {
    currentIndex--;
    showNumber(currentIndex);
  }
}



function goToLobby() {
  window.location.href = "quiz1.html";
}

window.onload = () => {
   showNumber(currentIndex);
};
window.onload  = () =>{
 // Wait for user to click "Start Game" 
};


