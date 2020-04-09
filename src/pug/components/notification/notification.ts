import { notificationDom } from '../../../javascript/dom_elements';
import {
    wrongPassword,
    userNotFound,
    weakPassword,
    usedEmail,
    invalidEmail
} from '../../../javascript/authErrors';

export const notification = (trigger: object): void => {
    notificationDom.notif.classList.add('active');

    switch (trigger.code) {
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
        case 'booking':
            notificationDom.notifMessage.innerText = trigger.message;
            break;
        case 'no-flights':
            notificationDom.notifMessage.innerText = trigger.message;
            break;
        case 'no-flight-selected':
            notificationDom.notifMessage.innerText = trigger.message;
            break;
        default:
            break;
    }

    // notificationDom.notifMessage.innerText = error.message;

    setTimeout((): void => {
        notificationDom.notif.classList.remove('active');
    }, 4000);
};