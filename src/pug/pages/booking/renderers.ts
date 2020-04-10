import { firestore } from '../../../../fb_config';
import { bookingDom } from '../../../javascript/dom_elements';
import { localStorageService } from '../../../javascript/loaclStorageService';

export const renderAvailableFlights = (agency: string): NodeListOf<Element> => {
    const flights: Array<string> = Object.keys(localStorageService('get', 'flights')[agency]);
    if (flights.length === 1) {
        bookingDom.flightsHolder.classList.add('center');
    } else {
        bookingDom.flightsHolder.classList.remove('center');
    }
    bookingDom.flightsHolder.innerHTML = flights.map((flight: string) => {
        const [
            date,
            month,
            year,
            hour,
            minute
        ] = flight.split('.');
        
        return `
            <div class="booking__flights-flight" data-flight="${flight}">
                ${date}.${month}.${year} || ${hour}:${minute}
            </div>`;
    }).join('');
    
    return document.querySelectorAll('.booking__flights-flight');
};

export const renderSeats = (
        seatType: string, 
        agency: string, 
        selected: Array<string>, 
        flight: string
    ): void => {
	const agent: string = agency.toLowerCase();
    const type: string = seatType.toLowerCase();

    firestore.collection('seats').doc('classes')
        .get()
        .then((listOfSeats: object) => {
            const seats: Array<string> = listOfSeats.data()[type];
            const booked: Array<string> = localStorageService('get', 'flights')[agent][flight];
            const output: Array<string> = [];

            seats.forEach((seat: string) => {
                if (booked.indexOf(seat) > -1) {
                    output.push(`<button class="booking__seats-seat" disabled>${seat}</button>`);
                } else if (selected.indexOf(seat) > -1) {
                    output.push(`<button class="booking__seats-seat active">${seat}</button>`);
                } else {
                    output.push(`<button class="booking__seats-seat">${seat}</button>`);
                }
            });
            bookingDom.seats.innerHTML = output.join('');
        })
        .catch((error: object) => console.error(error));
};