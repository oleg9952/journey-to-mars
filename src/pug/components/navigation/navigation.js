export const navigation = () => {
	// ----- DOM Elements -----
	const agencies = document.querySelector('.nav__column-agencies');
	const infomodal = document.querySelector('.infomodal');
	const closeBtn = document.querySelector('.infomodal__close-btn');

	agencies.addEventListener('click', (e) => {
		document.body.style.overflow = 'hidden';
		if (e.target.classList[1] === 'agency--one') {
			infomodal.classList.add('show--nasa');
		} else if (e.target.classList[1] === 'agency--two') {
			infomodal.classList.add('show--ukr');
		} else if (e.target.classList[1] === 'agency--three') {
			infomodal.classList.add('show--spacex');
		}
	});

	const triggers = [
		'show--nasa',
		'show--ukr',
		'show--spacex',
	];

	closeBtn.addEventListener('click', () => {
		document.body.style.overflow = 'visible';
		triggers.forEach((trigger) => infomodal.classList.remove(trigger));
	});
};
