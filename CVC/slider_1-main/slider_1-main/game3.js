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
    },
    {
        question: "What are comets primarily made of?",
        options: ["Metal", "Gas", "Rock and Ice", "Lava"],
        correctAnswer: 2
    },
    {
        question: "What is the typical shape of a comet’s orbit?",
        options: ["Circular", "Elliptical", "Paraboolic", "Hyperbolic"],
        correctAnswer: 1
    },
    {
        question: "In which direction does a comet’s tail always point?",
        options: ["Toward the Sun", "Away from the Sun", "Parallel to the Sun", "Perpendicular to its orbit"],
        correctAnswer: 1
    },
    {
        question: "When will Halley’s Comet next be visible from Earth?",
        options: ["2061", "2029", "2035", "2048"],
        correctAnswer: 0
    },
    {
        question: "What does the prefix 'P/' in a comet’s name indicate?",
        options: ["Long-period comet", "Short-period comet", "Discovered by a probe", "Discovered in the 21st century"],
        correctAnswer: 1
    },
    {
        question: "How were comets commonly viewed in ancient civilizations?",
        options: ["Harbingers of good luck", "Harbingers of doom", "Signs of wealth", "Symbols of fertility"],
        correctAnswer: 1
    },
    {
        question: "What was the main goal of the Rosetta mission?",
        options: ["Explore Mars", "Study asteroids", "Orbit and land on a comet", "Collect samples from the Moon"],
        correctAnswer: 2
    },
    {
        question: "What are asteroids primarily made of?",
        options: ["Metal and rock", "Ice and gas", "Water and minerals", "Lava and dust"],
        correctAnswer: 0
    },
    {
        question: "Where is the majority of asteroids in our solar system located?",
        options: ["Between Earth and Mars", "Between Mars and Jupiter", "Between Jupiter and Saturn", "Between Venus and Earth"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is a common type of asteroid?",
        options: ["Iron-rich asteroid", "Ice asteroid", "Carbonaceous asteroid", "Gaseous asteroid"],
        correctAnswer: 2
    },
    {
        question: "What is the largest known asteroid in our solar system?",
        options: ["Pallas", "Vesta", "ceres", "Eros"],
        correctAnswer: 2
    },
    {
        question: "What is believed to have caused the extinction of the dinosaurs?",
        options: ["Volcanic eruption", "Asteroid impact", "Solar flare", "Tsunami"],
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
