'use strict';

const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const message = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const highScoreDisplay = document.querySelector('.highscore');
const guess = document.querySelector('.guess');
const number = document.querySelector('.number');
const body = document.querySelector('body');

window.onload = function () {
  guess.focus();
};

let secretNumber = generateRandomNumber();
let score = 20;
let highScore = 0;

function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(msg) {
  message.textContent = msg;
}

function updateUIForWin() {
  guess.disabled = true;
  checkBtn.disabled = true;
  number.textContent = secretNumber;
  body.style.backgroundColor = '#60b347';
  number.style.width = '30rem';
}

function resetGame() {
  score = 20;
  secretNumber = generateRandomNumber();
  guess.disabled = false;
  checkBtn.disabled = false;
  displayMessage('Start guessing...');
  scoreDisplay.textContent = '20';
  number.textContent = '?';
  guess.value = '';
  body.style.backgroundColor = '#222';
  number.style.width = '15rem';
}

function checkGuess() {
  const guessValue = Number(guess.value);

  if (guessValue < 1 || guessValue > 20) {
    displayMessage('🚫 Enter a number between 1 and 20!');
    return;
  }

  if (!guessValue) {
    displayMessage('⛔️ No number!');
  } else if (guessValue === secretNumber) {
    displayMessage('🎉 Correct Number!');
    updateUIForWin();
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
    }
  } else {
    if (score > 1) {
      displayMessage(
        guessValue > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      score--;
      scoreDisplay.textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      scoreDisplay.textContent = '0';
    }
  }
}

checkBtn.addEventListener('click', checkGuess);

guess.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

againBtn.addEventListener('click', resetGame);
