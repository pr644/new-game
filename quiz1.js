// Garden Quiz Questions
const questions = [
  {
    image: "https://tse1.mm.bing.net/th/id/OIP.B89JFviebUWHqx55l28wEQHaE7?pid=Api&P=0&h=180",
    question: "How many cars?",
    options: ["1", "2", "3", "4"],
    answer: "1"
  },
  {
    image: "https://tse2.mm.bing.net/th/id/OIP.TRn5oKFPQ2Pg-9NZ33uB0QHaEJ?pid=Api&P=0&h=180",
    question: "How many ducks?",
    options: ["2", "4", "3", "1"],
    answer: "2"
  },
  {
    image: "https://tse3.mm.bing.net/th/id/OIP.ju_nx5kTyJQc1TYfvVxX1gHaH0?pid=Api&P=0&h=180",
    question: "How many mango?",
    options: ["3", "2", "1", "5"],
    answer: "3"
  },
  {
     image: "https://tse3.mm.bing.net/th/id/OIP.Yaj4YFLxaF3xUgots5UZfwHaFU?pid=Api&P=0&h=180",
    question: "How many bike?",
    options: ["3", "2", "1", "4"],
    answer: "4"
  },
  {
    image: "https://tse4.mm.bing.net/th/id/OIP.gUfFf314xIF7ymm_k7_eLAHaE8?pid=Api&P=0&h=180",
    question: "How many star?",
    options: ["3", "2", "1", "5"],
    answer: "5"

  }
];

let current = 0;
let selectedOption = null;

function startQuiz() {
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("quiz-image").src = q.image;
  document.querySelector("#quiz-question p").textContent = q.question;

  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
    btn.onclick = () => selectAnswer(btn, q.answer);
  });

  document.getElementById("feedback").textContent = "";
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next 🌼";
  nextBtn.onclick = nextQuestion;
  document.getElementById("feedback").appendChild(nextBtn);
}

function selectAnswer(btn, correctAnswer) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach((o) => (o.disabled = true));

  if (btn.textContent === correctAnswer) {
    btn.classList.add("correct");
    playSound("correct");
    showFeedback("✅ Correct!");
  } else {
    btn.classList.add("wrong");
    playSound("wrong");
    showFeedback("❌ Wrong! Try next one.");
  }
}

function showFeedback(message) {
  const feedback = document.getElementById("feedback");
  const oldBtn = feedback.querySelector("button");
  feedback.innerHTML = `<p>${message}</p>`;
  feedback.appendChild(oldBtn); // reattach next button
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    document.getElementById("quiz-container").innerHTML = `
      <h2>🎉 Finished!</h2>
      <p>You've completed the Garden Quiz!</p>
      <button onclick="location.reload()">🔁 Try Again</button>
      <button onclick="goToLobby()">🏠 Back to Lobby</button>
    `;
  } else {
    loadQuestion();
  }
}

function playSound(type) {
  const sound = new Audio(type === "correct" ? "correct.mp3" : "wrong.mp3");
  sound.play();
}

function goToLobby() {
  window.location.href = "index.html"; // change if your lobby file is different
}
