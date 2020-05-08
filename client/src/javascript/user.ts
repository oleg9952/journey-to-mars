/* eslint-disable @typescript-eslint/no-use-before-define */
import { User, Admin } from './classes';
import { navDom } from './dom_elements';

export let currentUser: object = null;

export const setCurrentUser = (action: string, user?: object): void => {
    switch (action) {
        case 'signedIn':
            if (user.type === 'user') {
                currentUser = new User(
                    user.uid,
                    user.email,
                    user.age,
                    user.firstname,
                    user.lastname,
                    user.type,
                    user.bookings,
                    user.logs
                );
            } else {
                currentUser = new Admin(
                    user.uid,
                    user.email,
                    user.age,
                    user.firstname,
                    user.lastname,
                    user.type,
                    user.bookings,
                    user.logs
                );
            }
            localStorage.setItem('user', JSON.stringify(currentUser));
            authUpdateUi(action);
            break;
        case 'signedOut':
            currentUser = null;
            localStorage.removeItem('user');
            authUpdateUi(action);
            break;        
        default:
            break;
    }
};

export const getUserFromStorage = (): object => {
    return JSON.parse(localStorage.getItem('user'));
};

function authUpdateUi(action: string): void {
    if (document.title !== 'Profile') {
        switch (action) {
            case 'signedIn':
                navDom.signInBtn.classList.remove('active');
                navDom.userOnline.classList.add('active');
                navDom.userLetter.innerText = currentUser.firstname.charAt(0).toUpperCase();
                break;
            case 'signedOut':
                navDom.signInBtn.classList.add('active');
                navDom.userOnline.classList.remove('active');
                break;    
            default:
                break;
        }
    }
}
