import '../styles/main.scss';
import { home } from '../pug/pages/home/home';
import { booking } from '../pug/pages/booking/booking';

const currentPage = document.title;

if(currentPage === 'Home') {
    home();
} else if(currentPage === 'Booking') {
    booking();
} else if(currentPage === 'Gallery') {
    console.log('gallery')
}