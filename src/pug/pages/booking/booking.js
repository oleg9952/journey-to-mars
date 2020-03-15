/* eslint-disable no-debugger */
export const booking = () => {
	// ----- DOM Elements -----
	const bookingBgs = document.querySelectorAll('.booking__bg');
	const spaceAgencies = document.querySelectorAll('.booking__agencies-agency');
	const form = document.querySelector('.booking__content-form');

	const agencySelection = (target, bgSelector, classSelector, iteration) => {
		bookingBgs.forEach((bg) => bg.classList.remove('active'));
		bookingBgs[bgSelector].classList.add('active');
		
		if (target.className === classSelector) {
			bookingBgs.forEach((bg) => bg.classList.remove('active'));
			bookingBgs[0].classList.add('active');
			form.classList.remove('active');
			spaceAgencies.forEach((agency) => {
				agency.classList.remove('active');
				agency.classList.remove('hide');
			});
		} else {
			form.classList.add('active');
			for (let i = 0; i < spaceAgencies.length; i++) {
				spaceAgencies[i].classList.remove('active');
				if (i === iteration) {
					spaceAgencies[i].classList.remove('hide');
					spaceAgencies[i].classList.add('active');
				} else {
					spaceAgencies[i].classList.add('hide');
				}
			}
		}
	};

	document.querySelector('.booking__content-agencies').addEventListener('click', (e) => {
		if (e.target.classList[1] === spaceAgencies[0].classList[1]) {
			agencySelection(e.target, 1, 'booking__agencies-agency agency--nasa active', 0);
		} else if (e.target.classList[1] === spaceAgencies[1].classList[1]) {
			agencySelection(e.target, 2, 'booking__agencies-agency agency--ukr active', 1);
		} else if (e.target.classList[1] === spaceAgencies[2].classList[1]) {
			agencySelection(e.target, 3, 'booking__agencies-agency agency--spacex active', 2);
		}
	});
};
