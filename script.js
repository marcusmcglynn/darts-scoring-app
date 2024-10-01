let playerName = document.getElementById("player1-name");
let userBtn = document.getElementById("usernameBtn");
let currentScore = 1;
let dartsRemaining = 3;
let multiplier = 1;

function welcomeMsg() {
  let username = prompt("What is your name");
  playerName.innerHTML = username;
}

userBtn.addEventListener("click", () => welcomeMsg());

const currentScoreElement = document.getElementById("currentScore");
const dartImages = document.querySelectorAll(".darts");

// Game mode
const fiveOne = document.getElementById("501");
const threeOne = document.getElementById("301");

// Multiplier
const singleButton = document.querySelector("#single");
const doubleButton = document.querySelector("#double");
const trebleButton = document.querySelector("#treble");
const multiplyButtons = document.querySelectorAll(".multiply");

multiplyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    multiplyButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
  });
});

// Number and common scores
const numberButtons = document.querySelectorAll(".number-btn");
const commonScoreButtons = document.querySelectorAll(".score-btn");

// Game mode
fiveOne.addEventListener("click", () => setGameMode(501));
threeOne.addEventListener("click", () => setGameMode(301));

function setGameMode(mode) {
  currentScore = mode;
  currentScoreElement.innerText = currentScore;
}

// multiplier
singleButton.addEventListener("click", () => setMultiplier(1));
doubleButton.addEventListener("click", () => setMultiplier(2));
trebleButton.addEventListener("click", () => setMultiplier(3));

function setMultiplier(value) {
  multiplier = value;
  console.log("Multiplier set to:", multiplier);
}

// Number button clicks
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dartValue = parseInt(button.getAttribute("data-score"));
    updateScore(dartValue, false);
  });
});

// common score button clicks
commonScoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const commonScoreValue = parseInt(button.getAttribute("data-score"));
    updateScore(commonScoreValue, true);
  });
});

// Update score and darts
function updateScore(dartValue, isCommonScore = false) {
  const calculatedScore = dartValue * multiplier;
  currentScore -= calculatedScore;
  currentScoreElement.innerText = currentScore;

  if (isCommonScore) {
    dartsRemaining = 0;
  } else {
    dartsRemaining--;
  }

  dartImages[dartsRemaining].style.visibility = "hidden";

  if (dartsRemaining === 0 && currentScore !== 0) {
    alert("Visit over! Resetting darts.");
    resetDarts();
  }

  if (currentScore === 0) {
    alert("Well done! Game over");
    resetDarts();
    currentScore = 0;
  }

  console.log(
    `Dart value: ${dartValue}, Multiplier: ${multiplier}, New total score: ${currentScore}`
  );
}

function resetDarts() {
  dartsRemaining = 3;
  dartImages.forEach((dart) => {
    dart.style.visibility = "visible";
  });
  console.log("Darts reset");
}
