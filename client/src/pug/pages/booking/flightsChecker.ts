import { firestore } from '../../../../fb_config';
import { localStorageService } from '../../../javascript/loaclStorageService';
import { bookingDom } from '../../../javascript/dom_elements';
import { flightsRenderer } from '../../components/flights/flightsRenderer';

interface FlightsInterface {
    nasa: Array<string>;
    ssau: Array<string>;
    spacex: Array<string>;
}

export const checkFlights = (page: string): void => {
    firestore.collection('seats').doc('nasa')
        .get()
        .then((nasa: object) => {
            firestore.collection('seats').doc('ssau')
                .get()
                .then((ssau: object) => {
                    firestore.collection('seats').doc('spacex')
                        .get()
                        .then((spacex: object) => {
                            const flights: FlightsInterface = {
                                nasa: nasa.data(),
                                ssau: ssau.data(),
                                spacex: spacex.data()
                            };
                            localStorageService('set', 'flights', flights);

                            const dimmer: string = 'brightness(50%)';
                            if (page === 'Booking') {
                                if (!Object.keys(flights.nasa).length) {
                                    bookingDom.nasa.style.filter = dimmer;
                                } 
                                if (!Object.keys(flights.ssau).length) {
                                    bookingDom.ssau.style.filter = dimmer;
                                } 
                                if (!Object.keys(flights.spacex).length) {
                                    bookingDom.spacex.style.filter = dimmer;
                                }
                            }

                            // ----- RENDER FLIGHTS ON HOME PAGES
                            if (page === 'Home') {
                                flightsRenderer('renderFlights');
                            }
                        })
                        .catch((error: object) => console.error(error));
                })
                .catch((error: object) => console.error(error));
        })
        .catch((error: object) => console.error(error));
};