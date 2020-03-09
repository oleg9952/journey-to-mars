import '../styles/main.scss';
import { navigation } from '../pug/components/navigation/navigation';
import { home } from '../pug/pages/home/home';
import { booking } from '../pug/pages/booking/booking';

const currentPage = document.title;

navigation()

if(currentPage === 'Home') {
    home();
} else if(currentPage === 'Booking') {
    booking();
} else if(currentPage === 'Gallery') {
    console.log('gallery')
}