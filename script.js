// script.js
const colors = ["rouge", "bleu", "vert", "jaune"];
const colorValues = ["#ff0000", "#0000ff", "#008000", "#ffff00"]; // Correspondance des couleurs

let score = 0;
let faults = 0;
let level = 1;
let currentColor = "";
let correctAnswer = "";

// Sélecteurs d'éléments HTML
const stroopWord = document.getElementById("stroop-word");
const colorButtonsContainer = document.getElementById("color-buttons");
const feedback = document.getElementById("feedback");
const scoreValue = document.getElementById("score-value");
const startButton = document.getElementById("start-button");
const instructions = document.getElementById("instructions");

function generateRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function loadNewWord() {
    if (faults >= 3) {
        endGame();
        return;
    }

    const randomWordIndex = generateRandomIndex(colors.length);
    const randomColorIndex = generateRandomIndex(colorValues.length);

    currentColor = colorValues[randomColorIndex];
    correctAnswer = colorValues[randomWordIndex];

    stroopWord.textContent = colors[randomWordIndex];
    stroopWord.style.color = currentColor;
}

function createColorButtons() {
    colorButtonsContainer.innerHTML = ""; // Efface les anciens boutons
    colorValues.forEach((color, index) => {
        const button = document.createElement("button");
        button.style.backgroundColor = color;
        button.textContent = colors[index];
        button.dataset.color = color;
        button.addEventListener("click", handleButtonClick);
        colorButtonsContainer.appendChild(button);
    });
}

function handleButtonClick(event) {
    const selectedColor = event.target.dataset.color;
    if (selectedColor === correctAnswer) {
        score++;
        feedback.textContent = "Correct !";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Incorrect.";
        feedback.style.color = "red";
        faults++;
    }
    scoreValue.textContent = score;

    if (score === 10 && level === 1) {
        advanceToNextLevel();
    } else if (faults >= 3) {
        endGame();
    } else {
        setTimeout(loadNewWord, 1000); // Charge un nouveau mot après 1 seconde
    }
}

function advanceToNextLevel() {
    level = 2;
    feedback.textContent = "Bravo ! Vous passez au niveau 2.";
    feedback.style.color = "blue";
    setTimeout(() => {
        loadNewWord();
    }, 2000); // Petite pause avant de commencer le niveau 2
}

function startTest() {
    score = 0;
    faults = 0;
    level = 1;
    scoreValue.textContent = score;
    feedback.textContent = "";
    startButton.style.display = "none";
    instructions.style.display = "none";
    loadNewWord();
    createColorButtons();
}

function endGame() {
    feedback.textContent = `Jeu terminé. Votre score : ${score}. Niveau atteint : ${level}.`;
    feedback.style.color = "red";
    stroopWord.textContent = "";
    colorButtonsContainer.innerHTML = "";
    startButton.style.display = "block";
    startButton.textContent = "Rejouer";
}

startButton.addEventListener("click", startTest);
