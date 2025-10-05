const shapes = [
  {name: "Circle", img: "https://tse1.mm.bing.net/th/id/OIP.xfojacTsO7rXNmzVwOb7QQHaHa?pid=Api&P=0&h=180"},
  {name: "Square", img: "https://c8.alamy.com/comp/M7ARCK/old-town-square-in-prague-czech-republic-on-a-sunny-day-M7ARCK.jpg"},
  {name: "Triangle", img: "https://tse3.mm.bing.net/th/id/OIP.yD7-tbRlxa6pWqh1yc_r5AHaE8?pid=Api&P=0&h=180"},
  {name: "Star", img: "https://tse2.mm.bing.net/th/id/OIP._o4WN9JCWyQZp-2KF0LxQQHaEo?pid=Api&P=0&h=180"},
  {name: "Heart", img: "https://tse3.mm.bing.net/th/id/OIP.y2lOQ6gFQ4Y-2nqdj2k41wHaEo?pid=Api&P=0&h=180"}
];
let score  = 0;
let currentQuestion = 0;
let quizQuestion = 0;

let quizQuestions = [];

const cardContainer = document.getElementById("card-container");
const quizContainer = document.getElementById("quiz-container");
const quizImage  = document.getElementById("quiz-image");
const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const scoreSpan  = document.getElementById("score");
const startBtn = document.getElementById("start-quiz");
const resultArea = document.getElementById("result-area");
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

function createCard(){
    shapes.forEach(shape => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<img src="${shape.img}" alt="${shape.name}">`;
        card.onclick = () => {
            alert(`This is a ${shape.name}!`);
            startBtn.style.display = "inline-block";
        };
        cardContainer.appendChild(card);
    });
}
function startQuiz() {
  quizQuestions = [...shapes].sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  score = 0;
  cardContainer.style.display = "none";
  startBtn.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}
function showQuestion() {
  let q = quizQuestions[currentQuestion];
  quizImage.src = q.img;
  questionText.textContent = "What shape is this?";
  
  optionsDiv.innerHTML = "";
  [...shapes].sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.name;
    btn.onclick = () => checkAnswer(opt.name, q.name);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected , correct){
    if(selected  === correct){
        score++;
        alert("✅ Correct!");

    }else{
      alert("❌ Oops!");

    }
    scoreSpan.textContent = score;
    nextQuiz();

}
function nextQuiz(){
    currentQuestion++;
    if(currentQuestion < quizQuestions.length){
        showQuestion();
    } else {
        // alert(`🎉 Quiz Finished! Score: ${score}`);
        quizContainer.style.display = "none";
        resultArea.style.display = "block";
        finalScore.textContent = `Your Score: ${score} / ${quizQuestions.length}`;
        finalMessage.textContent = score === quizQuestions.length ? "🏆 Perfect Score!" : "🎯 Good Job!";
    }
}

// function prevQuiz(){
//     if(quizIndex > 0){
//         quizIndex--;
//         loadQuizQuestion();
//     }

// }
createCard();