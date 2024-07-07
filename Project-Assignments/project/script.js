document.addEventListener('DOMContentLoaded', () => {
    const startRulesDiv = document.getElementById('start-rules');
    const startScreenDiv = document.getElementById('startScreen');
    const quizScreenDiv = document.getElementById('quizScreen');
    const endScreenDiv = document.getElementById('endScreen');
    const questionDiv = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer');
    const timerDiv = document.getElementById('timer');
    const finalScoreDiv = document.getElementById('finalScore');
    let score = 0;
    let timer = 60;
    let interval;

    document.getElementById('startQuiz').addEventListener('click', startGame);
    document.getElementById('playAgain').addEventListener('click', startGame);

    async function startGame() {
        score = 0;
        timer = 60;
        endScreenDiv.classList.add('hidden');
        quizScreenDiv.classList.remove('hidden');
        startRulesDiv.style.display = 'none';
        startScreenDiv.classList.add('hidden');
        getQuestion();
        startTimer();
    }

    async function getQuestion() {
        try {
            console.log('Fetching question...');
            const response = await fetch('https://opentdb.com/api.php?amount=1');
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            console.log('Question fetched:', data);
            if (!data.results || data.results.length === 0) {
                throw new Error('No question found in the API response');
            }
            const question = data.results[0];
            displayQuestion(question);
        } catch (error) {
            questionDiv.textContent = 'Failed to load question. Please try again.';
            console.error('Fetch error:', error);
        }
    }

    function displayQuestion(question) {
        questionDiv.textContent = question.question;
        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        answerButtons.forEach((button, index) => {
            button.textContent = answers[index];
            button.onclick = () => {
                if (button.textContent === question.correct_answer) {
                    correctAnswer();
                } else {
                    wrongAnswer();
                }
                getQuestion();
            };
        });
    }

    function correctAnswer() {
        score++;
        updateScore();
    }

    function wrongAnswer() {
        // Optionally, handle wrong answers (e.g., display feedback)
    }

    function updateScore() {
        finalScoreDiv.textContent = score;
    }

    function startTimer() {
        clearInterval(interval);  // Clear any previous intervals to avoid multiple timers
        interval = setInterval(() => {
            timer--;
            timerDiv.textContent = `Time left: ${timer} seconds`;
            if (timer <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(interval);
        quizScreenDiv.classList.add('hidden');
        endScreenDiv.classList.remove('hidden');
    }
});

