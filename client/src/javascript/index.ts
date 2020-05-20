/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../styles/main.scss';
import { navigation } from '../pug/components/navigation/navigation';
import { home } from '../pug/pages/home/home';
import { booking } from '../pug/pages/booking/booking';
import { gallery } from '../pug/pages/gallery/gallery';
import { authForm } from '../pug/components/auth-form/auth-form';
import { profile } from '../pug/pages/profile/profile';
import { checkFlights } from '../pug/pages/booking/flightsChecker';

import { adminSocket } from '../pug/components/support/admin/adminSocket';
import { getUserFromStorage } from './user';

import Chat from '../pug/components/support/client/ClientChat.jsx';

const currentPage = document.title;

if (currentPage !== 'Profile') {
	navigation(currentPage);
	authForm();
}

if (currentPage === 'Home') {
	home();
} else if (currentPage === 'Booking') {
	booking();
} else if (currentPage === 'Gallery') {
	gallery();
} else if (currentPage === 'Profile') {
	profile();
}

checkFlights(currentPage);

// React components
const chat = Chat;

// sockets

const user: object = getUserFromStorage();
adminSocket(user);