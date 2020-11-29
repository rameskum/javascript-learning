'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModals = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnOpenModals.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

// cookie banner
const header = document.querySelector('.header');
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML =
	'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button>';
header.append(cookieMessage);

document
	.querySelector('.btn--close-cookie')
	.addEventListener('click', function () {
		cookieMessage.remove();
		// cookieMessage.parentElement.removeChild(cookieMessage); // old way of doing
	});
