export const navigation = (currentPage) => {
	// ----- Intersection Observer -----
	if (currentPage !== 'Booking') {
		const nav = document.querySelector('.nav');
		const header = document.querySelector('.header');
	
		const intersectionOptions = {
			rootMargin: '-80px 0px 0px 0px'
		};
	
		const navigationObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) {
					nav.classList.add('scrolled');
				} else {
					nav.classList.remove('scrolled');
				}
			});
		}, intersectionOptions);
	
		navigationObserver.observe(header);
	}

	// ----- AGENCIES INFO -----
	const agencies = document.querySelector('.nav__column-agencies');
	const infomodal = document.querySelector('.infomodal');
	const closeBtn = document.querySelector('.infomodal__close-btn');

	agencies.addEventListener('click', (e) => {
		document.body.style.overflow = 'hidden';
		
		switch (e.target.classList[1]) {
			case 'agency--one':
				infomodal.classList.add('show--nasa');		
				break;
			case 'agency--two':
				infomodal.classList.add('show--ukr');		
				break;	
			case 'agency--three':
				infomodal.classList.add('show--spacex');		
				break;	
			default:
				break;
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

	// ----- USER-NAV -----
	const userPicture = document.querySelector('.nav__column-user');
	const userNav = document.querySelector('.nav__column-usernav');

	userPicture.addEventListener('click', () => {
		userNav.classList.toggle('active');
	});

	userNav.addEventListener('click', e => {
		if (e.target.classList[0] === 'nav__listitem-link') {
			userNav.classList.remove('active');
		}
	});

	// ----- AUTH FORM Events ----- 
	const signInBtn = document.querySelector('#sign--in');
	const authForm = document.querySelector('.auth');
	const auth = document.querySelector('.auth');
	// const form = document.querySelector('.auth__form');

	signInBtn.addEventListener('click', () => {
		authForm.classList.add('active');
	});

	auth.addEventListener('click', e => {
		if (e.target !== e.currentTarget) return;
		auth.classList.remove('active');
	});
};
