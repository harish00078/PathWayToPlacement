let score = 0;
let timer = 60;
let interval;

const scoreDisplay = document.getElementById('score');
const startRulesDiv = document.getElementById("start-rules");
const questionDiv = document.getElementById('question');
const answerButtons = document.getElementsByClassName('answer');
const timerDiv = document.getElementById('timer');
const finalScore = document.getElementById('finalScore');
const endMessage = document.getElementById('endMessage');

document.getElementById('startQuiz').addEventListener('click', function () {
    startRulesDiv.style.display = "none";
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    getQuestion();
    startTimer();
    updateScore();
});

document.getElementById('playAgain').addEventListener('click', function () {
    document.getElementById('endScreen').classList.add('hidden');
    score = 0;
    timer = 60;
    document.getElementById('quizScreen').classList.remove('hidden');
    getQuestion();
    startTimer();
    updateScore();
});

async function getQuestion() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1');
        const data = await response.json();
        const question = data.results[0];
        
        questionDiv.innerHTML = question.question;
        const correctIndex = Math.floor(Math.random() * 4);
        const answers = question.incorrect_answers;
        answers.splice(correctIndex, 0, question.correct_answer);
        
        for (let i = 0; i < 4; i++) {
            answerButtons[i].innerHTML = answers[i];
            answerButtons[i].dataset.correct = (i === correctIndex);
        }
    } catch (error) {
        questionDiv.innerHTML = 'Failed to load question. Please try again.';
    }
}

function selectAnswer(index) {
    const isCorrect = answerButtons[index].dataset.correct === 'true';
    if (isCorrect) {
        score++;
        updateScore();
    }
    getQuestion();
}

function updateScore() {
    scoreDisplay.innerHTML = score;
}

function startTimer() {
    interval = setInterval(function () {
        timer--;
        timerDiv.innerHTML = `Time left: ${timer} seconds`;
        if (timer <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('endScreen').classList.remove('hidden');
    finalScore.innerHTML = score;
    endMessage.innerHTML = `Your final score is ${score}. Great job!`;
}
