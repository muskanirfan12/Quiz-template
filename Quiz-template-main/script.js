// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "C++", "Java"],
        answer: 1
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "10", "15"],
        answer: 1
    },
    {
        question: "What does the acronym CPU stand for in computing?",
        options: ["Central Processing Unit", "Computer Power Unit", "Control Panel Unit", "Computer Peripheral Unit"],
        answer: 0
    },
    {
        question: "Which programming language is known as the mother of all languages",
        options: ["Python", "HTML", "C++", "Assembly"],
        answer: 3
    },
    {
        question: "Which protocol is primarily used for sending email over the internet?",
        options: ["FTP", "SMTP ", "HTTP", "POP3"],
        answer: 1
    },
    
];

// DOM elements
const quiz = document.getElementById("quiz");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;

// Load the current question
function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.forEach((option, index) => {
        option.textContent = currentQuiz.options[index];
        option.classList.remove("correct", "wrong");
        option.disabled = false;
    });
    nextBtn.classList.add("hidden");
}

// Check the selected answer
function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestion].answer;

    // Disable all options and show correct one
    optionsEl.forEach((option, index) => {
        option.disabled = true;
        if (index === correctIndex) {
            option.classList.add("correct"); // Green for correct answer
        }
    });

    // If selected answer is wrong, mark it red
    if (selectedIndex !== correctIndex) {
        optionsEl[selectedIndex].classList.add("wrong"); // Red for wrong answer
    } else {
        score++; // Increment score if answer is correct
    }

    nextBtn.classList.remove("hidden"); // Show the Next button
}

// Add event listeners to options
optionsEl.forEach((option, index) => {
    option.addEventListener("click", () => checkAnswer(index));
});

// Handle Next button click
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        quiz.classList.add("hidden");
        resultEl.classList.remove("hidden");
        scoreEl.textContent = `${score} / ${quizData.length}`;
    }
});

// Handle Restart button click
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    quiz.classList.remove("hidden");
    resultEl.classList.add("hidden");
    loadQuestion();
});

// Load the first question when the page loads
loadQuestion();
