/* eslint-disable max-len */
import * as moment from 'moment';

// ----- USERS -----

export class User {
    constructor(
        public uid: string,
        public email: string,
        public age: number,
        public firstname: string,
        public lastname: string,
        public type: string,
        public bookings: Array<object>,
        public logs: object,
        public profile_img: string,
    ) {}
    
    changeEmail(newEmail: string) {
        this.email = newEmail;

        // firebase code
    }

    updateProfile(first: string, last: string, age: number) {
        this.firstname = first;
        this.lastname = last;
        this.age = age;

        // firebase code
    }
}

export class Admin extends User {
    constructor(
        public uid: string,
        public email: string,
        public age: number,
        public firstname: string,
        public lastname: string,
        public type: string,
        public bookings: Array<object>,
        public logs: object
    ) {
        super(
            uid,
            email,
            age,
            firstname,
            lastname,
            type,
            bookings,
            logs
        );
    }

    // getAllUsers(): Array<object> {
    //     // firebase code
    //     const users: Array<object> = null;
    //     return users;
    // }

    // deleteUser(uid: string) {
    //     // firebase code
    // }
}

// ----- BOOKING -----

export class Booking {
    agency: string;

    agencyPrice: number;

    customerDetails: object;

    flight: string;

    seatClass: string;

    seats: Array<string>;

    services: Array<string>;

    servicePrice: number;

    pricePerSeat: object;

    priceTotal: number;

    constructor() {
        this.agency = null;
        this.agencyPrice = 0;
        this.customerDetails = {};
        this.flight = null;
        this.seatClass = null;
        this.seats = [];
        this.services = [];
        this.servicePrice = 0;
        this.pricePerSeat = {
            bussiness: 7000,
            standard: 5000,
            econom: 3000
        };
        this.priceTotal = 0;
    }

    setAgency(agency: string): void {
        this.agency = agency;
        switch (this.agency) {
            case 'NASA':
                this.agencyPrice = 2000;
                this.servicePrice = 300;
                break;
            case 'SSAU':
                this.agencyPrice = 1500;
                this.servicePrice = 200;
                break;
            case 'SpaceX':
                this.agencyPrice = 3000;
                this.servicePrice = 400;
                break;
            default:
                break;
        }
    }
    
    setDetails(
        first: string,
        last: string,
        age: number,
        email: string
    ) {
        this.customerDetails.firstname = first;
        this.customerDetails.lastname = last;
        this.customerDetails.age = age;
        this.customerDetails.email = email;
    }

    setFlight(date: string) {
        this.flight = date;
    }

    addSeat(seat: string): void {
        if (this.seats.indexOf(seat) === -1) {
            this.seats.push(seat.toLowerCase());
        }
    }

    removeSeat(seat: string): void {
        this.seats = this.seats.filter(s => s !== seat.toLowerCase());
    }
    
    resetSeats() {
        this.seats = [];
    }

    addService(service: string): void {
        this.services.push(service.toLowerCase());
    }

    removeService(service: string): void {
        this.services = this.services.filter(s => s !== service.toLowerCase());
    }

    resetServices() {
        this.services = [];
    }

    calcTotalPrice(): number {
        this.priceTotal = 0;
        this.seats.forEach((i) => {
            switch (i.charAt(0)) {
                case 'b':
                    this.priceTotal += (this.pricePerSeat.bussiness + this.agencyPrice);
                    break;
                case 's':
                    this.priceTotal += (this.pricePerSeat.standard + this.agencyPrice);
                    break;
                case 'e':
                    this.priceTotal += (this.pricePerSeat.econom + this.agencyPrice);
                    break;
                default:
                    break;
            }
        });
        this.services.forEach(() => {
            this.priceTotal += this.servicePrice;
        });
        return this.priceTotal;
    }

    reset() {
        this.customerDetails = {};
        this.seatClass = null;
        this.flight = null;
        this.seats = [];
        this.services = [];
        this.priceTotal = 0;
    }
}

// ----- FLIGHTS -----

export class Flight {
    timeNow: object;

    timeDiff: number;

    duration: number;

    constructor(
        public flight: string,
        public seats: Array<string>,
        public agency: string,
        public depTime: object
    ) { 
        this.timeNow = moment();
        this.timeDiff = this.depTime.unix() - this.timeNow.unix();    
        this.duration = moment.duration(this.timeDiff * 1000, 'milliseconds');   
    }

    calcAvailableSeats(): object {
        const business = 25 - this.seats.filter((i: string) => {
            if (i.search('b') > -1) {
                return i;
            }
        }).length;
        const standard = 25 - this.seats.filter((i: string) => {
            if (i.search('s') > -1) {
                return i;
            }
        }).length;
        const econom = 25 - this.seats.filter((i: string) => {
            if (i.search('e') > -1) {
                return i;
            }
        }).length;
        const total = (25 * 3) - this.seats.length;
        
        return {
 business, standard, econom, total 
};
    }

    getDepartureDate(): string {
        const [
            date,
            month,
            year,
            hour,
            minute
        ] = this.flight.split('.');

        return `${date}.${month}.${year} || ${hour}:${minute}`;
    }

    timer(): object {        
        this.duration = moment.duration(this.duration - 1000, 'milliseconds');

        const daysLeft = this.timeNow.diff(this.depTime, 'days') < 0 ? this.timeNow.diff(this.depTime, 'days') * -1 : this.timeNow.diff(this.depTime, 'days');
        const hoursLeft = this.duration.get('hour') < 10 ? `0${this.duration.get('hour')}` : this.duration.get('hour');
        const minutesLeft = this.duration.get('minute') < 10 ? `0${this.duration.get('minute')}` : this.duration.get('minute');
        const secondsLeft = this.duration.get('second') < 10 ? `0${this.duration.get('second')}` : this.duration.get('second');

        return {
            daysLeft,
            hoursLeft,
            minutesLeft,
            secondsLeft
        };
    }
}