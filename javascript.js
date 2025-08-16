const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let countdownInterval;

function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    startBtn.disabled = true;
    gameArea.innerHTML = '';

    // Countdown timer
    countdownInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Spawn stars repeatedly
    gameInterval = setInterval(spawnStar, 800);
}

function spawnStar() {
    // Create star
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position
    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Click handler
    star.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        star.remove();
    });

    gameArea.appendChild(star);

    // Remove star after 1.5 seconds if not clicked
    setTimeout(() => {
        if (gameArea.contains(star)) {
            star.remove();
        }
    }, 1500);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    startBtn.disabled = false;
    alert(`Time's up! Your final score is ${score}`);
}

startBtn.addEventListener('click', startGame);
