'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModelButton = document.querySelector('.close-modal');
const buttonsModels = document.querySelectorAll('.show-modal');

const showModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

for (let i = 0; i < buttonsModels.length; ++i) {
	buttonsModels[i].addEventListener('click', showModal);
}

closeModelButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
	if (
		'Escape' === event.code &&
		(!overlay.classList.contains('hidden') ||
			!modal.classList.contains('hidden'))
	) {
		console.log('closeModal');
		closeModal();
	}
});
