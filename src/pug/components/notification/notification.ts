import { notificationDom } from '../../../javascript/dom_elements';
import {
    wrongPassword,
    userNotFound,
    weakPassword,
    usedEmail,
    invalidEmail
} from '../../../javascript/authErrors';

export const notification = (error: Object): void => {
    notificationDom.notif.classList.add('active');

    switch (error.code) {
        case wrongPassword.code:
            notificationDom.notifMessage.innerText = wrongPassword.message;
            break;
        case userNotFound.code:
            notificationDom.notifMessage.innerText = userNotFound.message;
            break;
        case weakPassword.code:
            notificationDom.notifMessage.innerText = weakPassword.message;
            break;
        case usedEmail.code:
            notificationDom.notifMessage.innerText = usedEmail.message;
            break;
        case invalidEmail.code:
            notificationDom.notifMessage.innerText = invalidEmail.message;
            break;
        default:
            break;
    }

    setTimeout((): void => {
        notificationDom.notif.classList.remove('active');
    }, 4000);
};