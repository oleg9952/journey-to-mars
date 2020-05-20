import { navDom } from '../../../javascript/dom_elements';
import { signOut } from '../../../javascript/auth';
import { initVideo } from '../infomodal/videos';
import { VidPlayerInterf } from '../../../javascript/videoPlayer';

export const navigation = (currentPage: string) => {
	// ----- Intersection Observer -----
	if (currentPage !== 'Booking') {	
		const intersectionOptions: Object = {
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

	// ----- HIDE NAV ON SCROLL DOWN -----
	let prevScrollPos: number = window.pageYOffset;

	window.onscroll = (): void => {
		let currentScrollPos: number = window.pageYOffset;
		if (prevScrollPos > currentScrollPos) {
			navDom.nav.style.top = '0';
		} else {
			navDom.nav.style.top = '-80px';
		}
		prevScrollPos = currentScrollPos;
	};

	// ----- AGENCIES INFO -----
	navDom.agencies.addEventListener('click', (e: Event) => {
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

	const videos = [
		initVideo('#nasaVideo'),
		initVideo('#urkVideo'),
		initVideo('#spacexVid')
	];

	const triggers: Array<string> = [
		'show--nasa',
		'show--ukr',
		'show--spacex',
	];

	navDom.closeBtn.addEventListener('click', () => {
		document.body.style.overflow = 'visible';
		triggers.forEach((trigger) => navDom.infomodal.classList.remove(trigger));
		videos.forEach((vid: { player: VidPlayerInterf, playBtn: HTMLElement }) => {
			vid.player.stopMedia();
			vid.playBtn.classList.remove('active');
		});
	});

	// ----- USER-NAV -----
	navDom.userPicture.addEventListener('click', () => {
		navDom.userNav.classList.toggle('active');
	});

	navDom.userNav.addEventListener('click', (e: Event) => {
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

	// ----- MOBILE NAV -----
	navDom.openMobileNavBtn.addEventListener('click', () => {
		navDom.mobileNav.classList.add('active');
	});

	navDom.closeBtnMobileNav.addEventListener('click', () => {
		navDom.mobileNav.classList.remove('active');
	});
};
