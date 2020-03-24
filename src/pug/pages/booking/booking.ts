import { bookingDom } from '../../../javascript/dom_elements';

export const booking = () => {
	// ----- DOM Manipulations -----
	const agencySelection = (target: object, bgSelector: number, classSelector: string, iteration: number) => {
		bookingDom.bookingBgs.forEach((bg) => bg.classList.remove('active'));
		bookingDom.bookingBgs[bgSelector].classList.add('active');

		if (target.className === classSelector) {
			bookingDom.bookingBgs.forEach((bg) => bg.classList.remove('active'));
			bookingDom.bookingBgs[0].classList.add('active');
			bookingDom.form.classList.remove('active');
			bookingDom.spaceAgencies.forEach((agency) => {
				agency.classList.remove('active');
				agency.classList.remove('hide');
			});
		} else {
			bookingDom.form.classList.add('active');
			for (let i = 0; i < bookingDom.spaceAgencies.length; i++) {
				bookingDom.spaceAgencies[i].classList.remove('active');
				if (i === iteration) {
					bookingDom.spaceAgencies[i].classList.remove('hide');
					bookingDom.spaceAgencies[i].classList.add('active');
				} else {
					bookingDom.spaceAgencies[i].classList.add('hide');
				}
			}
		}
	};

	document.querySelector('.booking__content-agencies').addEventListener('click', (e) => {
		if (e.target.classList[1] === bookingDom.spaceAgencies[0].classList[1]) {
			agencySelection(e.target, 1, 'booking__agencies-agency agency--nasa active', 0);
		} else if (e.target.classList[1] === bookingDom.spaceAgencies[1].classList[1]) {
			agencySelection(e.target, 2, 'booking__agencies-agency agency--ukr active', 1);
		} else if (e.target.classList[1] === bookingDom.spaceAgencies[2].classList[1]) {
			agencySelection(e.target, 3, 'booking__agencies-agency agency--spacex active', 2);
		}
	});
};
