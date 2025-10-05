const questions = [
  {
    image: "https://tse3.mm.bing.net/th/id/OIP.kori7Y8NQzmHi4RLlD-T9AHaE5?pid=Api&P=0&h=180",
    question: "What is the first letter of Apple?",
    options: ["A", "P", "B", "C"],
    answer: "A"
  },
  {
    image: "https://tse1.mm.bing.net/th/id/OIP.haugqw68uDXRFwZoOURodAHaH7?pid=Api&P=0&h=180",
    question: "What is the first letter of Ball?",
    options: ["B", "D", "L", "K"],
    answer: "B"
  },
  {
    image: "https://tse1.mm.bing.net/th/id/OIP.LsSx6kxsbQWlMRJ8S15lkQHaE8?pid=Api&P=0&h=180",
    question: "What is the first letter of Cat?",
    options: ["C", "Z", "T", "Y"],
    answer: "C"
  },
  {
    image: "https://tse4.mm.bing.net/th/id/OIP.vs_d1C-7n4PoNv0GVlaVDwHaFj?pid=Api&P=0&h=180",
    question: "What is the first letter of Dog?",
    options: ["D", "F", "E", "H"],
    answer: "D"
  },
  {
    image: "https://tse4.mm.bing.net/th/id/OIP.JItfGXxlznJRry5rQFEs5wHaFI?pid=Api&P=0&h=180",
    question: "What is the first letter of Elephant?",
    options: ["E", "L", "M", "G"],
    answer: "E"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options").children;
const scoreEl = document.getElementById("score");
const qNumberEl = document.getElementById("q-number");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");
const coinPopup = document.getElementById("coin-popup");
const trophy = document.getElementById("trophy");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.innerHTML = `<img src="${q.image}" style="width:100px"><br>${q.question}`;
  for (let i = 0; i < 4; i++) {
    optionsEl[i].textContent = q.options[i];
    optionsEl[i].disabled = false;
    optionsEl[i].style.backgroundColor = "";
  }
  qNumberEl.textContent = currentQuestion + 1;
}

function checkAnswer(btn) {
  const selected = btn.textContent;
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    scoreEl.textContent = score;
    btn.style.backgroundColor = "lightgreen";
    correctSound.play();
    coinPopup.style.display = "block";
    setTimeout(() => (coinPopup.style.display = "none"), 1000);
  } else {
    btn.style.backgroundColor = "tomato";
    wrongSound.play();
  }

  for (let btn of optionsEl) btn.disabled = true;

  if (currentQuestion === questions.length - 1) {
    setTimeout(showResult, 1500);
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(); 
  }else{
    // // showResult();

    //  document.getElementById("quiz-container").innerHTML = `
    //   <h2>🎉 Finished!</h2>
    //   <p>You've completed the Garden Quiz!</p>
    //   <button onclick="location.reload()">🔁 Try Again</button>
    //   <button onclick="goToLobby()">🏠 Back to Lobby</button>
    // `;
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// function showResult() {
//   document.querySelector(".quiz-container").style.display = "none";
//   resultEl.style.display = "block";
//   finalScoreEl.textContent = score;
//   if (score === questions.length) trophy.style.display = "block";
// }

 function showResult() {
  document.getElementById("question-box").style.display = "none";
  document.getElementById("navigation").style.display = "none";
  document.getElementById("score-box").style.display = "none";
  resultEl.style.display = "block";

  finalScoreEl.textContent = score;

  if (score >= 4) {
    trophy.style.display = "block";
  }
}

//   function restartQuiz() {
//   currentQuestion = 0;
//   score = 0;
//   scoreEl.textContent = 0;
//   resultEl.style.display = "none";
//   trophy.style.display = "none";
//   document.querySelector(".quiz-container").style.display = "block";
//   trophy.style.display = "none";
//   loadQuestion();
// }
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = 0;
  resultEl.style.display = "none";
  trophy.style.display = "none";
  document.getElementById("question-box").style.display = "block";
  document.getElementById("navigation").style.display = "flex";
  document.getElementById("score-box").style.display = "block";
  loadQuestion();
}


function goToLobby() {
  window.location.href = "index.html";
}

loadQuestion();
