import '../styles/main.scss';
import { navigation } from '../pug/components/navigation/navigation';
import { home } from '../pug/pages/home/home';
import { booking } from '../pug/pages/booking/booking';
import { gallery } from '../pug/pages/gallery/gallery';
import { authForm } from '../pug/components/auth-form/auth-form';

const currentPage = document.title;

navigation();
authForm();

if (currentPage === 'Home') {
	home();
} else if (currentPage === 'Booking') {
	booking();
} else if (currentPage === 'Gallery') {
	gallery();
}
