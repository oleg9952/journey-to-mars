import { navDom } from '../../../javascript/dom_elements';
import { signOut } from '../../../javascript/auth';

export const navigation = (currentPage) => {
	// ----- Intersection Observer -----
	if (currentPage !== 'Booking') {	
		const intersectionOptions = {
			rootMargin: '-80px 0px 0px 0px'
		};
	
		const navigationObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) {
					navDom.nav.classList.add('scrolled');
				} else {
					navDom.nav.classList.remove('scrolled');
				}
			});
		}, intersectionOptions);
	
		navigationObserver.observe(navDom.header);
	}

	// ----- AGENCIES INFO -----
	navDom.agencies.addEventListener('click', (e) => {
		document.body.style.overflow = 'hidden';
		
		switch (e.target.classList[1]) {
			case 'agency--one':
				navDom.infomodal.classList.add('show--nasa');		
				break;
			case 'agency--two':
				navDom.infomodal.classList.add('show--ukr');		
				break;	
			case 'agency--three':
				navDom.infomodal.classList.add('show--spacex');		
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

	navDom.closeBtn.addEventListener('click', () => {
		document.body.style.overflow = 'visible';
		triggers.forEach((trigger) => navDom.infomodal.classList.remove(trigger));
	});

	// ----- USER-NAV -----
	navDom.userPicture.addEventListener('click', () => {
		navDom.userNav.classList.toggle('active');
	});

	navDom.userNav.addEventListener('click', e => {
		if (e.target.classList[0] === 'nav__listitem-link') {
			navDom.userNav.classList.remove('active');
		}
	});

	navDom.signOutBtn.addEventListener('click', () => {
		signOut();
	});

	// ----- AUTH FORM Events ----- 
	navDom.signInBtn.addEventListener('click', () => {
		navDom.authForm.classList.add('active');
	});
};
