const flashcards = [
    "The Sun is 109 times wider than Earth.",
    "Venus is the hottest planet in the solar system.",
    "A day on Venus is longer than a year on Venus.",
    "Neptune has the strongest winds in the solar system.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Mars has the tallest volcano in the solar system, Olympus Mons.",
    "Saturn's rings are made of ice and rock.",
    "Jupiter's Great Red Spot is a massive storm."
];

let currentCardIndex = 0;
let intervalId;

function loadFlashcard() {
    const flashcard = document.getElementById("flashcard");
    flashcard.textContent = flashcards[currentCardIndex];
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    loadFlashcard();
    resetInterval();
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    loadFlashcard();
    resetInterval();
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextCard, 5000);
}

window.onload = () => {
    loadFlashcard();
    intervalId = setInterval(nextCard, 5000);
};
