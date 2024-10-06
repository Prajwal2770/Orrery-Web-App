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

// Define a game over function
function gameOver() {
    alert("Game Over! Your score was: " + score);
    // Optionally reset the game state here
    // Clear all aliens and bullets
    const aliens = document.querySelectorAll(".alien");
    aliens.forEach((alien) => alien.remove());
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach((bullet) => bullet.remove());
    
    // Reset score
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
}

// Modify the moveAlien function
function moveAlien(alien) {
    const interval = setInterval(() => {
        const top = parseInt(getComputedStyle(alien).top);
        const containerBottom = gameContainer.getBoundingClientRect().bottom; // Get the bottom position of the game container
        const alienBottom = alien.getBoundingClientRect().bottom; // Get the bottom position of the alien

        if (alienBottom < containerBottom) {
            alien.style.top = `${top + 3.5}px`; // Adjust speed as needed
        } else {
            clearInterval(interval);
            alien.remove();
            gameOver(); // Call game over if the alien reaches the bottom
        }
    }, 100);
}
    const interval = setInterval(() => {
        const top = parseInt(getComputedStyle(alien).top);
        if (top < window.innerHeight) {
            alien.style.top = `${top + 3.5}px`;
        } else {
            clearInterval(interval);
            alien.remove();
        }
    }, 100);


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
