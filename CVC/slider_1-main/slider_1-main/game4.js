const spaceship = document.getElementById("spaceship");
const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highscoreDisplay = document.getElementById("highscore"); // Reference to the high score element

let score = 0;
let highscore = 0; // Initialize high score
let gameOver = false;
let alienInterval;
let gameTimer;
let timeLeft = 60; // Starting time in seconds
let countdownInterval; // For the countdown clock

// Move spaceship with mouse
gameContainer.addEventListener("mousemove", (event) => {
    const containerRect = gameContainer.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;

    const spaceshipWidth = 50; // width of the spaceship
    if (mouseX >= 0 && mouseX <= containerRect.width - spaceshipWidth) {
        spaceship.style.left = `${mouseX - spaceshipWidth / 2}px`;
    }
});

// Shoot bullets with mouse click
gameContainer.addEventListener("click", () => {
    if (!gameOver) {
        shoot();
    }
});

function shoot() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.position = "absolute";
    bullet.style.left = `${parseInt(getComputedStyle(spaceship).left) + 20}px`;
    bullet.style.bottom = "70px";
    bullet.style.width = "10px";
    bullet.style.height = "20px";
    bullet.style.background = "red";
    gameContainer.appendChild(bullet);
    moveBullet(bullet);
}

function moveBullet(bullet) {
    const interval = setInterval(() => {
        const bottom = parseInt(getComputedStyle(bullet).bottom);
        if (bottom < window.innerHeight) {
            bullet.style.bottom = `${bottom + 5}px`;
            checkCollision(bullet, interval);
        } else {
            clearInterval(interval);
            bullet.remove();
        }
    }, 20);
}

function spawnAliens() {
    if (!gameOver) {
        const alien = document.createElement("div");
        alien.classList.add("alien");
        const randomPosition = Math.floor(Math.random() * (window.innerWidth - 50));
        alien.style.left = `${randomPosition}px`;
        alien.style.top = "0px";
        gameContainer.appendChild(alien);
        moveAlien(alien);
    }
}

function moveAlien(alien) {
    const interval = setInterval(() => {
        const top = parseInt(getComputedStyle(alien).top);
        if (top < window.innerHeight) {
            alien.style.top = `${top + 4.5}px`;
        } else {
            clearInterval(interval);
            alien.remove();
        }
    }, 100);
}

function checkCollision(bullet, bulletInterval) {
    const aliens = document.querySelectorAll(".alien");
    aliens.forEach((alien) => {
        const bulletRect = bullet.getBoundingClientRect();
        const alienRect = alien.getBoundingClientRect();
        if (
            bulletRect.left < alienRect.right &&
            bulletRect.right > alienRect.left &&
            bulletRect.top < alienRect.bottom &&
            bulletRect.bottom > alienRect.top
        ) {
            clearInterval(bulletInterval);
            bullet.remove();
            alien.remove();
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            updateHighScore(); // Update the high score if needed
        }
    });
}

function updateHighScore() {
    if (score > highscore) {
        highscore = score; // Update high score
        highscoreDisplay.innerText = `High Score: ${highscore}`; // Display new high score
    }
}

// Countdown timer function
function startTimer() {
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            endGame();
        }
    }, 1000); // Update the timer every second
}

function endGame() {
    gameOver = true;

    // Stop spawning aliens
    clearInterval(alienInterval);
    clearInterval(countdownInterval);

    // Display Game Over message
    const gameOverMessage = document.createElement("div");
    gameOverMessage.innerText = "Game Over! Click to Restart";
    gameOverMessage.style.position = "absolute";
    gameOverMessage.style.top = "50%";
    gameOverMessage.style.left = "50%";
    gameOverMessage.style.transform = "translate(-50%, -50%)";
    gameOverMessage.style.fontSize = "30px";
    gameOverMessage.style.color = "white";
    gameOverMessage.style.textAlign = "center";
    gameContainer.appendChild(gameOverMessage);

    // Remove all remaining aliens
    document.querySelectorAll(".alien").forEach((alien) => alien.remove());

    // Restart the game when the user clicks after game over
    gameContainer.addEventListener("click", () => {
        if (gameOver) {
            resetGame();
            gameOverMessage.remove();
        }
    });
}

function resetGame() {
    score = 0;
    timeLeft = 60; // Reset the timer to 60 seconds
    scoreDisplay.innerText = `Score: ${score}`;
    timerDisplay.innerText = `Time Left: ${timeLeft}`;
    gameOver = false;

    // Start spawning aliens again
    alienInterval = setInterval(spawnAliens, 1500);

    // Restart the countdown timer
    startTimer();
}

// Start the game
alienInterval = setInterval(spawnAliens, 1500);
startTimer(); // Start the countdown when the game starts
