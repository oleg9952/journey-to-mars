import '../styles/main.scss';
import { home } from '../pug/pages/home/home';

const currentPage = document.title;

if(currentPage === 'Home') {
    home()
} else if(currentPage === 'Booking') {
    console.log('booking');
} else if(currentPage === 'Gallery') {
    console.log('gallery')
}