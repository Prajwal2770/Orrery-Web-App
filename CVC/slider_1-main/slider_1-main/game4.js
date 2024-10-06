const spaceship = document.getElementById("spaceship");
const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");

let score = 0;

// Move spaceship with mouse
gameContainer.addEventListener("mousemove", (event) => {
    const containerRect = gameContainer.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    
    // Keep the spaceship within bounds
    const spaceshipWidth = 50; // width of the spaceship
    if (mouseX >= 0 && mouseX <= containerRect.width - spaceshipWidth) {
        spaceship.style.left = `${mouseX - spaceshipWidth / 2}px`;
    }
});

// Shoot bullets with mouse click
gameContainer.addEventListener("click", () => {
    shoot();
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
    const alien = document.createElement("div");
    alien.classList.add("alien");
    const randomPosition = Math.floor(Math.random() * (window.innerWidth - 50));
    alien.style.left = `${randomPosition}px`;
    alien.style.top = "0px";
    gameContainer.appendChild(alien);
    moveAlien(alien);
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
        }
    });
}

setInterval(spawnAliens, 1500);


function endGame() {
    gameOver = true;
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

    // Stop spawning aliens and remove any remaining aliens
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
    scoreDisplay.innerText = `Score: ${score}`;
    gameOver = false;

    // Start spawning aliens again
    setInterval(spawnAliens, 1500);
}

// Start spawning aliens at intervals
setInterval(spawnAliens, 1500);