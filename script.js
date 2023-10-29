const questions = [
    {
        question: "Who was the father of computer? ",
        answers: [
            { text: "Charlie Babbage", correct: false },
            { text: "Dennis Ritchie", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "Ken Thompson", correct: false }
        ]
    },
    {
        question: "What is the full form of SDRAM? ",
        answers: [
            { text: "Special Dynamic Read Access Memory", correct: false },
            { text: "Synchronous Dynamic Read Access Memory", correct: false },
            { text: "Special Dynamic Random Access Memory", correct: false },
            { text: "Synchronous Dynamic Random Access Memory", correct: true }
        ]
    },
    {
        question: "Which electronics component is used in first generation computers?",
        answers: [
            { text: "Transistors", correct: false },
            { text: "ULSI Chips", correct: false },
            { text: "Vacuum Tubes", correct: true },
            { text: "LSI Chips", correct: false }
        ]
    },
    {
        question: "Which is not a correct type of a computer?",
        answers: [
            { text: "Mini Frame Computer", correct: true },
            { text: "Super Computer", correct: false },
            { text: "Workstations", correct: false },
            { text: "Personal Computers", correct: false }
        ]
    },
    {
        question: "Which part of the computer is considered as Brain of the Computer?",
        answers: [
            { text: "Random Access Memory", correct: false },
            { text: "Central Processing Unit", correct: true },
            { text: "Read Only Memory", correct: false },
            { text: "Hard Disk", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    restState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

startQuiz();

function restState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    restState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});