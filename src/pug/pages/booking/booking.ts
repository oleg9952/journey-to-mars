import { bookingDom } from '../../../javascript/dom_elements';
import { Booking } from '../../../javascript/classes';
import { getUserFromStorage } from '../../../javascript/user';
import { bookingSubject } from '../../../javascript/bookingSubject';
import { renderSeats, renderAvailableFlights } from './renderers';
import { localStorageService } from '../../../javascript/loaclStorageService';
import { notification } from '../../components/notification/notification';

export const booking = () => {
	const booking = new Booking();
	let selectedSeats: Array<string> = [];
	let flightNodes: NodeListOf<Element> = null;


	// ***** DOM Manipulations *****
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
			if (Object.keys(localStorageService('get', 'flights').nasa).length) {
				agencySelection(e.target, 1, 'booking__agencies-agency agency--nasa active', 0);
				booking.setAgency('NASA');
			} else {
				notification({
					code: 'no-flights',
					message: 'There are no available flights from Nasa!'
				});
			}
		} else if (e.target.classList[1] === bookingDom.spaceAgencies[1].classList[1]) {
			if (Object.keys(localStorageService('get', 'flights').ssau).length) {
				agencySelection(e.target, 2, 'booking__agencies-agency agency--ukr active', 1);
				booking.setAgency('SSAU');
			} else {
				notification({
					code: 'no-flights',
					message: 'There are no available flights from SSAU!'
				});
			}
		} else if (e.target.classList[1] === bookingDom.spaceAgencies[2].classList[1]) {
			if (Object.keys(localStorageService('get', 'flights').spacex).length) {
				agencySelection(e.target, 3, 'booking__agencies-agency agency--spacex active', 2);
				booking.setAgency('SpaceX');
			} else {
				notification({
					code: 'no-flights',
					message: 'There are no available flights from SpaceX!'
				});
			}
		}
	});

	const user = getUserFromStorage();

	if (user) {
		bookingDom.form.firstname.value = user.firstname;
		bookingDom.form.lastname.value = user.lastname;
		bookingDom.form.age.value = user.age;
		bookingDom.form.email.value = user.email;
	}

	// ***** NEXT STEP *****

	// ----- GET USER DETAILS -----
	bookingDom.form.addEventListener('submit', (e: Event) => {
		e.preventDefault();
	
		booking.setDetails(
			bookingDom.form.firstname.value,
			bookingDom.form.lastname.value,
			bookingDom.form.age.value,
			bookingDom.form.email.value
		);

		// show available dates
		const selectedAgency: string = booking.agency.toLowerCase();
		switch (selectedAgency) {
			case 'nasa':
				renderAvailableFlights(selectedAgency);
				flightNodes = renderAvailableFlights(selectedAgency);
				break;
			case 'ssau':
				renderAvailableFlights(selectedAgency);
				flightNodes = renderAvailableFlights(selectedAgency);
				break;
			case 'spacex':
				renderAvailableFlights(selectedAgency);
				flightNodes = renderAvailableFlights(selectedAgency);
				break;
			default:
				break;
		}
	
		bookingDom.nextSection.classList.add('active');
	})

	// ----- CLOSE AND RESET BOOKING -----
	bookingDom.nextSectionClose.addEventListener('click', () => {
		bookingDom.nextSection.classList.remove('active');

		bookingDom.seatClasses.forEach((btn: object) => btn.classList.remove('active'));
		bookingDom.servicesAll.forEach(service => {
			service.classList.remove('active');
		})
		bookingDom.seats.classList.remove('active');
		// bookingDom.seats.innerHTML = '';
		bookingDom.services.classList.remove('active');
		bookingDom.bookingPrice.classList.remove('active');
		bookingDom.confirmBtn.classList.remove('active');

		booking.reset();
		selectedSeats = [];
		flightNodes = null;
	})

	// ----- SELECT FLIGHT -----

	bookingDom.flightsHolder.addEventListener('click', (e: Event): void => {
		if (e.target.className === 'booking__flights-flight') {
			flightNodes.forEach((btn: object) => btn.classList.remove('active'));
		}
		e.target.classList.add('active');

		booking.setFlight(e.target.dataset.flight);
		
		// ----- RESET
		selectedSeats = [];
		booking.resetSeats();
		booking.resetServices();
		bookingDom.seats.classList.remove('active');
		bookingDom.seatClasses.forEach((btn: object) => btn.classList.remove('active'));
		bookingDom.servicesAll.forEach((btn: object) => btn.classList.remove('active'));

		bookingDom.services.classList.remove('active');
		bookingDom.bookingPrice.classList.remove('active');
		bookingDom.confirmBtn.classList.remove('active');
	})

	// ----- SELECT SEATS CLASS -----
	bookingDom.seatClassSection.addEventListener('click', (e: Event): void => {
		if (e.target.className === 'booking__types-type') {
			bookingDom.seatClasses.forEach((btn: object) => btn.classList.remove('active'));
			if (booking.flight) {
				e.target.classList.add('active');
				switch (e.target.innerText) {
					case 'Bussiness':
						renderSeats(e.target.innerText, booking.agency, selectedSeats, booking.flight);
						bookingDom.seats.classList.add('active');
						break;
					case 'Standard':
						renderSeats(e.target.innerText, booking.agency, selectedSeats, booking.flight);
						bookingDom.seats.classList.add('active');
						break;
					case 'Econom':
						renderSeats(e.target.innerText, booking.agency, selectedSeats, booking.flight);
						bookingDom.seats.classList.add('active');
						break;
					default:
						break;
				}
			} else {
				notification({
					code: 'no-flight-selected',
					message: 'First select one of the flights!'
				})
			}
		}
		
		
	})

	// ----- SELECT SEAT -----
	bookingDom.seats.addEventListener('click', (e: Event) => {
		if (e.target.tagName === 'BUTTON') {
			e.target.classList.toggle('active');
			if (e.target.className.search('active') > -1) {
				booking.addSeat(e.target.innerText);
				if (selectedSeats.indexOf(e.target.innerText) === -1) {
					selectedSeats.push(e.target.innerText.toLowerCase());
				}
			} else {
				booking.removeSeat(e.target.innerText);
				selectedSeats = selectedSeats.filter(seat => {
					return seat !== e.target.innerText.toLowerCase();
				})

			}
			bookingDom.bookingPrice.innerText = `$${booking.calcTotalPrice()}`;
		}

		if (selectedSeats.length) {
			bookingDom.services.classList.add('active');
			bookingDom.bookingPrice.classList.add('active');
			bookingDom.confirmBtn.classList.add('active');
		} else {
			bookingDom.services.classList.remove('active');
			bookingDom.bookingPrice.classList.remove('active');
			bookingDom.confirmBtn.classList.remove('active');
		}
	})

	// ----- SELECT SERVICES -----
	bookingDom.services.addEventListener('click', (e: Event) => {
		if (
			e.target.className === 'booking__services-service' ||
			e.target.className === 'booking__services-service active'
		) {
			e.target.classList.toggle('active');
			if (e.target.className.search('active') > -1) {
				booking.addService(e.target.innerText);
			} else {
				booking.removeService(e.target.innerText);
			}
			bookingDom.bookingPrice.innerText = `$${booking.calcTotalPrice()}`;
		}
	})

	// ----- BOOK -----
	bookingDom.confirmBtn.addEventListener('click', () => {
		const [
			date,
			month,
			year,
			hour,
			minute
		] = booking.flight.split('.');

		const bookingData = {
			...booking.customerDetails,
			agency: booking.agency,
			departure: `${date}.${month}.${year} || ${hour}:${minute}`,
			seats: booking.seats,
			services: booking.services,
			totalPrice: booking.priceTotal
		}

		bookingSubject.dispatch({
			ticket: bookingData,
			trigger: {
				code: 'booking',
				message: 'Thank you for your booking!'
			},
			flight: booking.flight
		})
	})
};