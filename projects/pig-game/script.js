'use strict';

// selecting comments
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const buttonNewEl = document.querySelector('.btn--new');
const buttonRollEl = document.querySelector('.btn--roll');
const buttonHoldEl = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// initialize game

const resetGame = function () {
	playing = true;
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	diceEl.classList.add('hidden');
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.remove('player--winner');
	document.querySelector(`.player--0`).classList.add('player--active');
	activePlayer = 0;
};

resetGame();

const switchPlayer = function () {
	// reset current active player
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.toggle('player--active');

	// switch player
	activePlayer = activePlayer === 0 ? 1 : 0;
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.toggle('player--active');

	// reset current score
	currentScore = 0;
};

buttonRollEl.addEventListener('click', function () {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		if (dice != 1) {
			currentScore += dice;
			document.getElementById(
				`current--${activePlayer}`
			).textContent = currentScore; // TODO: change later
		} else {
			switchPlayer();
		}
	}
});

buttonHoldEl.addEventListener('click', function () {
	if (playing) {
		scores[activePlayer] += currentScore;
		currentScore = 0;

		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= 100) {
			playing = false;
			diceEl.classList.add('hidden');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		} else {
			switchPlayer();
		}
	}
});

buttonNewEl.addEventListener('click', resetGame);
