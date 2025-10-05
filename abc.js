const letters = [
  { letter: "A", word: "Apple", img: "https://tse2.mm.bing.net/th/id/OIP.Iedlm9CO0U4Ke8ZqZmZPbQHaHf?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/apple--_gb_1.mp3" },
  { letter: "B", word: "Ball", img: "https://www.pngall.com/wp-content/uploads/5/Ball-PNG-Free-Download.png", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/ball--_gb_1.mp3" },
  { letter: "C", word: "Cat", img: "https://tse3.mm.bing.net/th/id/OIP.-d3JKGX5ZJ3Y3U7ybY8h8gHaE7?pin=Api&p=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/cat--_gb_1.mp3" },
  { letter: "D", word: "Dog", img: "https://tse2.mm.bing.net/th/id/OIP.Jf0NnGpH2AhNM3BtwZufwwHaJ4?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/dog--_gb_1.mp3" },
  { letter: "E", word: "Elephant", img: "https://tse1.mm.bing.net/th/id/OIP.PHvHTnF5_hRRbJjcFFtCLAHaFj?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/elephant--_gb_1.mp3" },
  { letter: "F", word: "Fish", img: "https://tse1.mm.bing.net/th/id/OIP.mDtAWh_h0qWPCLuhrgWiuwHaEo?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/fish--_gb_1.mp3" },
  { letter: "G", word: "Giraffe", img: "https://tse1.mm.bing.net/th/id/OIP.ykhn-tx6gx2zZp7zg0tooQHaEo?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/giraffe--_gb_1.mp3" },
  { letter: "H", word: "House", img: "https://tse3.mm.bing.net/th/id/OIP.KE72uok-PMdKnnZkN1S4aAHaE8?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/house--_gb_1.mp3" },
  { letter: "I", word: "Ice Cream", img: "https://tse2.mm.bing.net/th/id/OIP.mB0y6WQMfmtmnLdejjl8wwHaE7?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/ice%20cream--_gb_1.mp3" },
  { letter: "J", word: "Juice", img: "https://tse2.mm.bing.net/th/id/OIP.KHnk5klpFcClx8eEjYnNGQHaH9?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/juice--_gb_1.mp3" },
  { letter: "K", word: "Kite", img: "https://www.pngall.com/wp-content/uploads/5/Kite-PNG-Image-File.png", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/kite--_gb_1.mp3" },
  { letter: "L", word: "Lion", img: "https://tse4.mm.bing.net/th/id/OIP.hrt_dg9TXWsEO5ocNKD6rAHaFj?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/lion--_gb_1.mp3" },
  { letter: "M", word: "Monkey", img: "https://tse1.mm.bing.net/th/id/OIP.TX3W6t84PTnSdqPwTtM_TQHaE8?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/monkey--_gb_1.mp3" },
  { letter: "N", word: "Nest", img: "https://www.pngall.com/wp-content/uploads/2016/05/Nest-PNG-Picture.png", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/nest--_gb_1.mp3" },
  { letter: "O", word: "Orange", img: "https://tse1.mm.bing.net/th/id/OIP.k1bcs4IVQF6QM2TSpfpw9QHaFi?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/orange--_gb_1.mp3" },
  { letter: "P", word: "Parrot", img: "https://tse4.mm.bing.net/th/id/OIP.eQWPknAfjQWHdTowqGUu0wHaEK?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/parrot--_gb_1.mp3" },
  { letter: "Q", word: "Queen", img: "https://tse3.mm.bing.net/th/id/OIP.0f9qkEEiJY4rQ9KKOEXaXAHaFj?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/queen--_gb_1.mp3" },
  { letter: "R", word: "Rabbit", img: "https://tse1.mm.bing.net/th/id/OIP.TcVgoAR1zYzWZAhh77D-2wHaE8?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/rabbit--_gb_1.mp3" },
  { letter: "S", word: "Sun", img: "https://tse1.mm.bing.net/th/id/OIP.jB25EnI-vbRaofViRJNFMAHaEo?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/sun--_gb_1.mp3" },
  { letter: "T", word: "Tiger", img: "https://tse4.mm.bing.net/th/id/OIP.YStozDiRWuUlT8T9Tmo45QHaEo?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/tiger--_gb_1.mp3" },
  { letter: "U", word: "Umbrella", img: "https://tse3.mm.bing.net/th/id/OIP.FU4DJEiLBWQ2QxC5CcT3_QHaF4?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/umbrella--_gb_1.mp3" },
  { letter: "V", word: "Van", img: "https://tse1.mm.bing.net/th/id/OIP.lYunK6IztUDIc9qNUl_2nwHaE8?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/van--_gb_1.mp3" },
  { letter: "W", word: "Watch", img: "https://tse3.mm.bing.net/th/id/OIP.H4zV5hAF0ypuiO9_U8dKiAHaE8?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/watch--_gb_1.mp3" },
  { letter: "X", word: "Xylophone", img: "https://tse3.mm.bing.net/th/id/OIP.PEl3GVD6kbRsi35X2769qQHaEz?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/xylophone--_gb_1.mp3" },
  { letter: "Y", word: "Yoga", img: "https://tse2.mm.bing.net/th/id/OIP.La_o58ZUbuVuuVISophxNgHaEo?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/yogurt--_gb_1.mp3" },
  { letter: "Z", word: "Zebra", img: "https://tse3.mm.bing.net/th/id/OIP.zW6p1tMmK3sVBTM9ZoMJYgHaFj?pid=Api&P=0&h=180", sound: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/zebra--_gb_1.mp3" }
];


let currentIndex = 0;

function updateCard() {
  const data = letters[currentIndex];
  document.getElementById('letter').textContent = data.letter;
  document.getElementById('word').textContent = data.word;
  document.getElementById('image').src = data.img;
  document.getElementById('image').alt = `${data.letter} for ${data.word}`;
  document.getElementById('letter-sound').src = data.sound;
}

function playSound() {
  document.getElementById('letter-sound').play();
}

function nextLetter() {
  currentIndex = (currentIndex + 1) % letters.length;
  updateCard();
}

function prevLetter() {
  currentIndex = (currentIndex - 1 + letters.length) % letters.length;
  updateCard();
}

function showLetter() {
  const current = letters[currentIndex];
  document.getElementById("letter").innerText = current.letter;
  document.getElementById("word").innerText = current.word;
  document.getElementById("image").src = current.img;

document.getElementById("progressBar").value = currentIndex + 1;
document.getElementById("progressText").innerText = `${currentIndex + 1}/26`; 


if (currentIndex === 25) {
    document.getElementById("reward").style.display = "block";
    document.getElementById("quiz-popup").style.display = "block";
  } else {
    document.getElementById("reward").style.display = "none";
   document.getElementById("quiz-popup").style.display = "none"; 
  }
  playSound();
}
function nextLetter() {
  if (currentIndex < letters.length - 1) {
    currentIndex++;
    localStorage.setItem("abcIndex", currentIndex);
    showLetter();
  }
}
function prevLetter() {
  if (currentIndex > 0) {
    currentIndex--;
    localStorage.setItem("abcIndex", currentIndex);
    showLetter();
  }
}
function playSound() {
  const audio = new Audio(letters[currentIndex].sound);
  audio.play();
}


window.onload = showLetter;


function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  if (music.paused) {
    music.play();
    btn.innerText = "🔊";
  } else {
    music.pause();
    btn.innerText = "🔇";
  }
}function goToQuiz() {
  window.location.href = "quiz.html";
}

window.onload = () => {
  const savedIndex = localStorage.getItem("abcIndex");
  if (savedIndex !== null) {
    currentIndex = parseInt(savedIndex);
  }
  showLetter();
};


function goToLobby() {
  window.location.href = "index.html";
}

window.onload = updateCard;
