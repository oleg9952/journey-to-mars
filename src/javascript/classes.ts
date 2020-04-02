import { navDom } from './dom_elements';

// ----- AUTH -----

// export class AuthCreds {
//     constructor(
//         public email: string,
//         public password?: string,
//         public firstname?: string,
//         public lastname?: string,
//         public age?: number,
//     ) {};
// }

// ----- USERS -----

export class User {
    constructor(
        public uid: string,
        public email: string,
        public age: number,
        public firstname: string,
        public lastname: string,
        public type: string,
        public bookings: Array<object>
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
        public bookings: Array<object>
    ) {
        super(
            uid,
            email,
            age,
            firstname,
            lastname,
            type,
            bookings
        );
    }

    getAllUsers(): Array<object> {
        // firebase code
        const users: Array<object> = null;
        return users;
    }

    deleteUser(uid: string) {
        // firebase code
    }
}

// ----- BOOKING -----

export class Booking {
    agency: string;
    agencyPrice: number;
    customerDetails: object;
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

    addSeat(seat: string): void {
        if (this.seats.indexOf(seat) === -1) {
            this.seats.push(seat.toLowerCase());
        }
    }

    removeSeat(seat: string): void {
        this.seats = this.seats.filter(s => s !== seat.toLowerCase());
    }


    addService(service: string): void {
        this.services.push(service.toLowerCase());
    }

    removeService(service: string): void {
        this.services = this.services.filter(s => s !== service.toLowerCase());
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
        })
        this.services.forEach(() => {
            this.priceTotal += this.servicePrice;
        })
        return this.priceTotal;
    }

    reset() {
        this.customerDetails = {};
        this.seatClass = null;
        this.seats = [];
        this.services = [];
        this.priceTotal = 0;
    }
}