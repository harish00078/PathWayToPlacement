let score = 0;
let timer = 60;
let interval;

const startRulesDiv = document.getElementById("start-rules");
const quizScreen = document.getElementById("quizScreen");
const endScreen = document.getElementById("endScreen");
const questionDisplay = document.getElementById("question");
const answersDisplay = document.getElementById("answers");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("finalScore");

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("playAgain").addEventListener("click", startQuiz);

function startQuiz() {
    score = 0;
    timer = 60;
    startRulesDiv.classList.add("hidden");
    endScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    updateScore();
    getQuestion();
    startTimer();
}

async function getQuestion() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        const question = data.results[0];
        displayQuestion(question);
    } catch (error) {
        console.error("Error fetching question:", error);
        questionDisplay.textContent = "Error loading question. Please try again.";
        answersDisplay.innerHTML = '<button id="retryButton">Retry</button>';
        document.getElementById("retryButton").addEventListener("click", getQuestion);
    }
}

function displayQuestion(question) {
    questionDisplay.innerHTML = question.question;
    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);
    
    answersDisplay.innerHTML = answers.map(answer => 
        `<button class="answer">${answer}</button>`
    ).join("");

    answersDisplay.querySelectorAll(".answer").forEach(button => {
        button.addEventListener("click", () => checkAnswer(button.textContent, question.correct_answer));
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score += 10;
        updateScore();
    }
    getQuestion();
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function startTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Time left: ${timer} seconds`;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScoreDisplay.textContent = score;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}