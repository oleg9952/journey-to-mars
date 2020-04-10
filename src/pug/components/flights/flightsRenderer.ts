/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-cycle */
import * as moment from 'moment';
import { flightsDom } from '../../../javascript/dom_elements';
import { getUserFromStorage } from '../../../javascript/user';
import { flights } from './flights';
import { localStorageService } from '../../../javascript/loaclStorageService';
import { Flight } from '../../../javascript/classes';

interface OpenFlightsInstancesInterface {
    nasa: any;
    ssau: any;
    spacex: any;
}

interface FlightInterface {
    flight: string;
    seats: Array<string>;
    agency: string;
    depTime: object;
    timeNow: object;
    timeDiff: number;
    duration: object;
    getDepartureDate: () => string;
    calcAvailableSeats: () => object;
    timer: () => object;
}

export const flightsRenderer = (action: string): void => {
    // ----- RENDER ADMIN BTN -----
    const user = getUserFromStorage();
    const page: string = document.title;

    if (page === 'Home') {
        switch (action) {
            case 'auth':
                if (user) {
                    if (user.type === 'admin') {
                        flights();
                        flightsDom.openModalBtn.style.display = 'block';
                    } else {
                        flights();
                        flightsDom.openModalBtn.style.display = 'none';
                    }
                } else {
                    flightsDom.openModalBtn.style.display = 'none';
                }
                break;
            case 'renderFlights':
                const openFlights = localStorageService('get', 'flights');
                const {
                    nasa,
                    ssau,
                    spacex
                } = openFlights as OpenFlightsInstancesInterface;

                const flightInstances: Array<object> = [];

                if (Object.keys(nasa).length) {
                    for (let i in nasa) {
                        const [
                            date,
                            month,
                            year,
                            hour,
                            minute
                        ] = i.split('.');

                        flightInstances.push(
                            new Flight(i, nasa[i], 'nasa', moment().set({
                                date: Number(date),
                                month: (Number(month) - 1),
                                year: Number(year),
                                hour: Number(hour),
                                minute: Number(minute),
                                second: 0
                            }))
                        );
                    }
                }
                if (Object.keys(ssau).length) {
                    for (let i in ssau) {
                        const [
                            date,
                            month,
                            year,
                            hour,
                            minute
                        ] = i.split('.');

                        flightInstances.push(
                            new Flight(i, ssau[i], 'ssau', moment().set({
                                date: Number(date),
                                month: (Number(month) - 1),
                                year: Number(year),
                                hour: Number(hour),
                                minute: Number(minute),
                                second: 0
                            }))
                        );
                    }
                }
                if (Object.keys(spacex).length) {
                    for (let i in spacex) {
                        const [
                            date,
                            month,
                            year,
                            hour,
                            minute
                        ] = i.split('.');

                        flightInstances.push(
                            new Flight(i, spacex[i], 'spacex', moment().set({
                                date: Number(date),
                                month: (Number(month) - 1),
                                year: Number(year),
                                hour: Number(hour),
                                minute: Number(minute),
                                second: 0
                            }))
                        );
                    }
                }

                if (flightInstances.length === 1) {
                    flightsDom.flightsCardsOutput.classList.add('center');
                } else {
                    flightsDom.flightsCardsOutput.classList.remove('center');
                }

                flightsDom.flightsCardsOutput.innerHTML = flightInstances.map((flight: FlightInterface) => {
                    return generateFlight(flight);
                }).join('');   
                
                const timerNodes: NodeListOf<Element> = document.querySelectorAll('.fligths__flight-timer');

                setInterval(() => {
                    flightInstances.forEach((flight: object, index: number) => {
                        timerNodes[index].innerHTML = generateTimer(flight.timer());
                    });
                }, 1000);
                break;
            default:
                break;
        }
    }
};

interface AgenciesInterface {
    nasa: string;
    ssau: string;
    spacex: string;
}

function generateFlight(flight: FlightInterface): string {
    const agencies: AgenciesInterface = {
        nasa: 'agency--nasa',
        ssau: 'agency--ukraine',
        spacex: 'agency--spacex'
    };

    let agency: string = null;

    switch (flight.agency) {
        case 'nasa':
            agency = agencies.nasa;
            break;
        case 'ssau':
            agency = agencies.ssau;
            break;
        case 'spacex':
            agency = agencies.spacex;
            break;
        default:
            break;
    }

    return `
        <div class="flights__flight">
            <h2 class="flights__flight-title">Departure</h2>
            <p class="flights__flight-departuredate">${flight.getDepartureDate()}</p>
            <div class="fligths__flight-timer">
                <div class="flights__timer-column">
                    <p class="flights__column-value">...</p>
                    <p class="flights__column-subtitle">Days</p>
                </div>
                <div class="flights__timer-column">
                    <p class="flights__column-value">...</p>
                    <p class="flights__column-subtitle">Hours</p>
                    <div class="fligths__column-dots">
                        <div class="flights__column-dot"></div>
                        <div class="flights__column-dot"></div>
                    </div>
                </div>
                <div class="flights__timer-column">
                    <p class="flights__column-value">...</p>
                    <p class="flights__column-subtitle">Minutes</p>
                    <div class="fligths__column-dots">
                        <div class="flights__column-dot"></div>
                        <div class="flights__column-dot"></div>
                    </div>
                </div>
                <div class="flights__timer-column">
                    <p class="flights__column-value">...</p>
                    <p class="flights__column-subtitle">Seconds</p>
                </div>
            </div>
            <h2 class="flights__flight-title">Agency</h2>
            <div class="flights__flight-agency ${agency}"></div>
            <h2 class="flights__flight-title">Seats Avaliable</h2>
            <div class="flights__flight-seats">
                <div class="flights__seats-seat">
                    <p class="flights__seat-number">${flight.calcAvailableSeats().business}</p>
                    <p class="flights__seat-class">Business</p>
                </div>
                <div class="flights__seats-seat">
                    <p class="flights__seat-number">${flight.calcAvailableSeats().standard}</p>
                    <p class="flights__seat-class">Standard</p>
                </div>
                <div class="flights__seats-seat">
                    <p class="flights__seat-number">${flight.calcAvailableSeats().econom}</p>
                    <p class="flights__seat-class">Econom</p>
                </div>
                <div class="flights__seats-seat seat--total">
                    <p class="flights__seat-number">${flight.calcAvailableSeats().total}</p>
                    <p class="flights__seat-class">Total</p>
                </div>
            </div>
        </div>
    `;
}

function generateTimer(time: {
    daysLeft: string,
    hoursLeft: string,
    minutesLeft: string,
    secondsLeft: string
}): string {
    const {
        daysLeft, 
        hoursLeft, 
        minutesLeft, 
        secondsLeft 
    } = time;

    return `
        <div class="flights__timer-column">
            <p class="flights__column-value">${daysLeft}</p>
            <p class="flights__column-subtitle">Days</p>
        </div>
        <div class="flights__timer-column">
            <p class="flights__column-value">${hoursLeft}</p>
            <p class="flights__column-subtitle">Hours</p>
            <div class="fligths__column-dots">
                <div class="flights__column-dot"></div>
                <div class="flights__column-dot"></div>
            </div>
        </div>
        <div class="flights__timer-column">
            <p class="flights__column-value">${minutesLeft}</p>
            <p class="flights__column-subtitle">Minutes</p>
            <div class="fligths__column-dots">
                <div class="flights__column-dot"></div>
                <div class="flights__column-dot"></div>
            </div>
        </div>
        <div class="flights__timer-column">
            <p class="flights__column-value">${secondsLeft}</p>
            <p class="flights__column-subtitle">Seconds</p>
        </div>
    `;
}