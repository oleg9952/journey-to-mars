import { firestore } from '../../fb_config';
import { notification } from "../pug/components/notification/notification";
import { getUserFromStorage } from './user';

class BookingSubject {
    observers: Array<object>;

    constructor() {
        this.observers = [];
    }

    subscribe(obs): object {
        this.observers.push(obs);
        return this;
    }
    unsubscribe(obs): object {
        this.observers = this.observers.filter(current => {
            return current !== obs
        })
        return this;
    }
    dispatch(data: object) {
        if (this.observers.length) {
            this.observers.forEach(obs => {
                obs(data);
            })
        }
    }
}

const notifier = (data: object): void => {
    notification(data.trigger)
}

const bookTickets = (data: object) => {
    firestore.collection('bookings')
        .add({
            uid: getUserFromStorage() ? getUserFromStorage().uid : null,
            ...data.ticket
        })
        .then(() => {
            firestore.collection('seats').doc(`${data.ticket.agency.toLowerCase()}`)
                .get()
                .then((resp: object) => {
                    firestore.collection('seats').doc(`${data.ticket.agency.toLowerCase()}`)
                        .update({
                            booked: [...resp.data().booked, ...data.ticket.seats] 
                        })
                        .then(() => {
                            setTimeout(() => {
                            	location.reload();
                            }, 2000)
                        })
                        .catch(err => console.error(err))
                })
        })
        .catch(err => console.error(err))
}

export const bookingSubject = new BookingSubject()
    .subscribe(notifier)
    .subscribe(bookTickets)