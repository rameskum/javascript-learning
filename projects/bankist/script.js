'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
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

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
	containerMovements.innerHTML = '';

	const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

	movs.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';
		const html = `
		<div class="movements__row">
			<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
			<div class="movements__value">${mov}€</div>
		</div>
		`;
		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const calcDisplayBalance = function (acc) {
	acc.balance = acc.movements.reduce((acc, ele) => (acc += ele), 0);
	labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (movements) {
	const incomes = movements
		.filter(mov => mov > 0)
		.reduce((acc, mov) => (acc += mov), 0);
	labelSumIn.textContent = `${incomes}€`;

	const expenses = movements
		.filter(mov => mov < 0)
		.reduce((acc, mov) => (acc += mov), 0);

	labelSumOut.textContent = `${Math.abs(expenses)}€`;

	const interest = movements
		.filter(mov => mov > 0)
		.map(deposit => (deposit * 1.2) / 100)
		.filter(int => int >= 1)
		.reduce((acc, int) => (acc += int), 0);

	labelSumInterest.textContent = `${interest}€`;
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
	displayMovements(account.movements);
	// display balance
	calcDisplayBalance(account);
	// display summary
	calcDisplaySummary(account.movements);
};

// events handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
	// prevent form submitting
	e.preventDefault();
	currentAccount = accounts.find(
		acc => acc.username === inputLoginUsername.value
	);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		// display UI and message
		labelWelcome.textContent = `Welcome back, ${
			currentAccount.owner.split(' ')[0]
		}`;
		containerApp.style.opacity = 100;
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
		updateUi(currentAccount);
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
	const loanAmount = Number(inputLoanAmount.value);
	if (
		loanAmount > 0 &&
		currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
	) {
		console.log('loan granted');
		currentAccount.movements.push(loanAmount);
		updateUi(currentAccount);
	}
	inputLoanAmount.value = null;
});

let sort = false;
btnSort.addEventListener('click', function (e) {
	e.preventDefault();
	displayMovements(currentAccount.movements, !sort);
	sort = !sort;
});
