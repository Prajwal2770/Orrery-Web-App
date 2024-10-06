const quizQuestions = [
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mercury", "Venus", "Mars", "Neptune"],
        correctAnswer: 2
    },
    {
        question: "What is the closest star to Earth?",
        options: ["Sirius", "Alpha Centauri", "Proxima Centauri", "Sun"],
        correctAnswer: 3
    },
    {
        question: "How many moons does Mars have?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionData = quizQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button, index) => {
        button.textContent = questionData.options[index];
        button.disabled = false;
        button.style.backgroundColor = "#00ffcc";
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button, index) => {
        if (index === correctAnswer) {
            button.style.backgroundColor = "#00ff66";
        } else if (index === selectedOption) {
            button.style.backgroundColor = "#ff0033";
        }
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        document.getElementById("question").textContent = "Quiz Completed!";
        document.querySelector(".options").innerHTML = "";
        document.getElementById("next").style.display = "none";
    }
}

window.onload = () => {
    loadQuestion();
};
