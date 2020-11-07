'use strict';

let secret = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secret;
let higScore = 0;

document.querySelector('.guess').value = 0;

let score = 20;

const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
	const guess = Number(document.querySelector('.guess').value);
	console.log(guess);

	if (!guess) {
		displayMessage('⛔ No number!');
	} else if (guess === secret) {
		displayMessage('🏆 Correct Number!');

		document.querySelector('body').style.backgroundColor = '#60b347';

		document.querySelector('.number').style.width = '30rem';

		document.querySelector('.number').textContent = secret;
		if (score > higScore) {
			higScore = score;
			document.querySelector('.highscore').textContent = higScore;
		}
	} else if (guess < secret) {
		if (score > 1) {
			displayMessage('📉 Number is too low!');
			score--;
			document.querySelector('.score').textContent = score;
		} else {
			displayMessage('💥 You loose!');
		}
	} else if (guess > secret) {
		if (score > 1) {
			displayMessage('📈 Number is too high!');
			score--;
			document.querySelector('.score').textContent = score;
		} else {
			displayMessage('💥 You loose!');
		}
	}
});

document.querySelector('.again').addEventListener('click', function () {
	secret = Math.trunc(Math.random() * 20) + 1;
	score = 20;
	document.querySelector('.score').textContent = score;
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
	displayMessage('Start guessing...');
	document.querySelector('.guess').value = 0;
	document.querySelector('.number').textContent = '?';
});
