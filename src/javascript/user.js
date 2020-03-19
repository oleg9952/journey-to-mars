import { navDom } from './dom_elements';

export const setCurrentUser = (action, user) => {
    switch (action) {
        case 'signedIn':
            localStorage.setItem('user', JSON.stringify(user));
            authUpdateUi('signedIn');
            break;
        case 'signedOut':
            localStorage.clear();
            authUpdateUi('signedOut');
            break;
        default:
            break;
    }
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

function authUpdateUi(action) {
    switch (action) {
        case 'signedIn':
            navDom.signInBtn.classList.remove('active');
            navDom.userOnline.classList.add('active');
            navDom.userLetter.innerText = getCurrentUser().firstname.charAt(0).toUpperCase();
            break;
        case 'signedOut':
            navDom.signInBtn.classList.add('active');
            navDom.userOnline.classList.remove('active');
            break;    
        default:
            break;
    }
}