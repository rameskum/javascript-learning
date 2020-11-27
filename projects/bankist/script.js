'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2020-11-10T14:11:59.604Z',
		'2020-11-19T17:01:17.194Z',
		'2020-11-21T10:51:36.790Z',
		'2020-11-22T23:36:17.929Z',
	],
	currency: 'EUR',
	locale: 'pt-PT', // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const formatMovementDate = function (movementDate, locale) {
	const calcDaysPassed = (date1, date2) =>
		Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

	const daysPassed = calcDaysPassed(new Date(), movementDate);

	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	return new Intl.DateTimeFormat(locale).format(movementDate);
};

const formatCurrency = (
	number,
	locale = navigator.locale,
	currencyFormat = 'USD'
) => {
	const currencyOption = {
		style: 'currency',
		currency: currencyFormat,
	};
	return new Intl.NumberFormat(locale, currencyOption).format(number);
};

const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = '';

	const moves = sort
		? acc.movements.slice().sort((a, b) => a - b)
		: acc.movements;

	moves.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';
		const movementDate = new Date(acc.movementsDates[i]);
		const displayDate = formatMovementDate(
			movementDate,
			acc.locale || navigator.language
		);

		const formattedMovement = formatCurrency(mov, acc.locale, acc.currency);

		const html = `
		<div class="movements__row">
			<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
			<div class="movements__date">${displayDate}</div>
			<div class="movements__value">${formattedMovement}</div>
		</div>
		`;
		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const calcDisplayBalance = function (acc) {
	acc.balance = acc.movements.reduce((acc, ele) => (acc += ele), 0);
	labelBalance.textContent = formatCurrency(
		acc.balance,
		acc.locale,
		acc.currency
	);
};

const calcDisplaySummary = function (acc) {
	const movements = acc.movements;
	const income = movements
		.filter(mov => mov > 0)
		.reduce((acc, mov) => (acc += mov), 0);

	labelSumIn.textContent = formatCurrency(income, acc.locale, acc.currency);

	const expenses = movements
		.filter(mov => mov < 0)
		.reduce((acc, mov) => (acc += mov), 0);

	labelSumOut.textContent = formatCurrency(
		Math.abs(expenses),
		acc.locale,
		acc.currency
	);

	const interest = movements
		.filter(mov => mov > 0)
		.map(deposit => (deposit * 1.2) / 100)
		.filter(int => int >= 1)
		.reduce((acc, int) => (acc += int), 0);

	labelSumInterest.textContent = formatCurrency(
		interest,
		acc.locale,
		acc.currency
	);
};

const createUserNames = accounts =>
	accounts.forEach(account => {
		account.username = account.owner
			?.toLowerCase()
			.split(' ')
			.map(word => word[0])
			.join('');
	});

createUserNames(accounts);

const updateUi = function (account) {
	// display moments
	displayMovements(account);
	// display balance
	calcDisplayBalance(account);
	// display summary
	calcDisplaySummary(account);
};

const setLogoutLTimer = function () {
	const tick = function () {
		const min = String(Math.trunc(time / 60)).padStart(2, 0);
		const sec = String(time % 60).padStart(2, 0);
		labelTimer.textContent = `${min}:${sec}`;
		// in each call, print the remaining time
		if (time === 0) {
			labelWelcome.textContent = `Log in to get started`;
			containerApp.style.opacity = 0;
			clearInterval(timer);
		}
		time--;
	};
	// set time to 5 minutes
	let time = 120;
	// call the timer every second
	tick();
	const timer = setInterval(tick, 1000);
	return timer;
};

// events handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
	// prevent form submitting
	e.preventDefault();
	currentAccount = accounts.find(
		acc => acc.username === inputLoginUsername.value
	);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		const now = new Date();
		const options = {
			hour: 'numeric',
			minute: 'numeric',
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		};

		const locale = currentAccount.locale || navigator.language;

		labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
			now
		);

		// display UI and message
		labelWelcome.textContent = `Welcome back, ${
			currentAccount.owner.split(' ')[0]
		}`;

		containerApp.style.opacity = 100;

		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();
		if (timer) clearInterval(timer);
		timer = setLogoutLTimer();
		updateUi(currentAccount);
	}
});

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(
		acc => acc.username === inputTransferTo.value
	);

	inputTransferAmount.value = inputTransferTo.value = null;

	if (
		amount > 0 &&
		currentAccount.balance >= amount &&
		receiverAcc &&
		receiverAcc?.username !== currentAccount.username
	) {
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);

		// add transfer date
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());

		updateUi(currentAccount);
		clearInterval(timer);
		timer = setLogoutLTimer();
	}
});

btnClose.addEventListener('click', function (e) {
	e.preventDefault();
	const closeUserName = inputCloseUsername.value;
	const closeUserPin = Number(inputClosePin.value);

	const userIndex = accounts.findIndex(
		acc =>
			acc.username === closeUserName &&
			acc.pin === closeUserPin &&
			acc.username === currentAccount.username
	);

	inputCloseUsername.value = inputClosePin.value = null;

	if (userIndex >= 0) {
		accounts.splice(userIndex, 1);
		containerApp.style.opacity = 0;
	}
});

btnLoan.addEventListener('click', function (ele) {
	ele.preventDefault();
	const loanAmount = Math.floor(inputLoanAmount.value);
	if (
		loanAmount > 0 &&
		currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
	) {
		setTimeout(function () {
			console.log('loan granted');
			currentAccount.movements.push(loanAmount);
			// add transfer date
			currentAccount.movementsDates.push(new Date().toISOString());
			updateUi(currentAccount);
			clearInterval(timer);
			timer = setLogoutLTimer();
		}, 3000);
	}
	inputLoanAmount.value = null;
});

let sort = false;
btnSort.addEventListener('click', function (e) {
	e.preventDefault();
	displayMovements(currentAccount, !sort);
	sort = !sort;
});

labelBalance.addEventListener('click', function () {
	[...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
		if (i % 2 === 0) row.style.backgroundColor = 'orange';
	});
});
