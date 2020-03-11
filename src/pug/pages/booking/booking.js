export const booking = () => {
	// ----- DOM Elements -----
	const bookingBgs = document.querySelectorAll('.booking__bg');
	const spaceAgencies = document.querySelectorAll('.booking__agencies-agency');
	const form = document.querySelector('.booking__content-form');

	document.querySelector('.booking__content-agencies').addEventListener('click', (e) => {
		if (e.target.classList[1] === spaceAgencies[0].classList[1]) {
			bookingBgs.forEach((bg) => bg.classList.remove('active'));
			bookingBgs[1].classList.add('active');

			if (e.target.className === 'booking__agencies-agency agency--nasa active') {
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
					if (i === 0) {
						spaceAgencies[i].classList.remove('hide');
						spaceAgencies[i].classList.add('active');
					} else {
						spaceAgencies[i].classList.add('hide');
					}
				}
			}
		} else if (e.target.classList[1] === spaceAgencies[1].classList[1]) {
			bookingBgs.forEach((bg) => bg.classList.remove('active'));
			bookingBgs[2].classList.add('active');

			if (e.target.className === 'booking__agencies-agency agency--ukr active') {
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
					if (i === 1) {
						spaceAgencies[i].classList.remove('hide');
						spaceAgencies[i].classList.add('active');
					} else {
						spaceAgencies[i].classList.add('hide');
					}
				}
			}
		} else if (e.target.classList[1] === spaceAgencies[2].classList[1]) {
			bookingBgs.forEach((bg) => bg.classList.remove('active'));
			bookingBgs[3].classList.add('active');

			if (e.target.className === 'booking__agencies-agency agency--spacex active') {
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
					if (i === 2) {
						spaceAgencies[i].classList.remove('hide');
						spaceAgencies[i].classList.add('active');
					} else {
						spaceAgencies[i].classList.add('hide');
					}
				}
			}
		}
	});
};
