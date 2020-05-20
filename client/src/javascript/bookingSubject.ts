/* eslint-disable no-restricted-globals */
import { firestore } from '../../fb_config';
import { notification } from '../pug/components/notification/notification';
import { getUserFromStorage } from './user';
import { activityLogger } from './activityLogger';

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
			return current !== obs;
		});
		return this;
	}

	dispatch(data: object) {
		if (this.observers.length) {
			this.observers.forEach(obs => {
				obs(data);
			});
		}
	}
}

const notifier = (data: object): void => {
	notification(data.trigger);
};

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
					const response = resp.data();
					delete response[data.flight];
					firestore.collection('seats').doc(`${data.ticket.agency.toLowerCase()}`)
						.set({
							[data.flight]: [...resp.data()[data.flight], ...data.ticket.seats],
							...response
						})
						.then(() => {
							setTimeout(() => {
								location.reload();
							}, 2000);
						})
						.catch(err => console.error(err));
				});
			activityLogger(getUserFromStorage().uid, 'booking');
		})
		.catch(err => console.error(err));
};

export const bookingSubject = new BookingSubject()
	.subscribe(notifier)
	.subscribe(bookTickets);