import { notificationDom } from '../../../javascript/dom_elements';
import {
    wrongPassword,
    userNotFound,
    weakPassword,
    usedEmail,
    invalidEmail
} from '../../../javascript/authErrors';

const icon = document.getElementById('notif__icon');
const iconBox = document.querySelector('.notification--icon');

export const notification = (trigger: object): void => {
    notificationDom.notif.classList.add('active');

    const sign = {
        warning: {
            icon: 'fas fa-exclamation-circle',
            color: 'orange'
        },
        error: {
            icon: 'fas fa-exclamation-triangle',
            color: 'red'
        },
        notif: {
            icon: 'fas fa-bell',
            color: 'blue'
        },
        success: {
            icon: 'fas fa-check-circle',
            color: '#01c4ff'
        }
    };

    switch (trigger.code) {
        // ----- ERRORS -----
        case wrongPassword.code:
            notificationDom.notifMessage.innerText = wrongPassword.message;
            icon.className = sign.error.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.error.color;
            break;
        case userNotFound.code:
            notificationDom.notifMessage.innerText = userNotFound.message;
            icon.className = sign.error.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.error.color;
            break;
        case weakPassword.code:
            notificationDom.notifMessage.innerText = weakPassword.message;
            icon.className = sign.error.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.error.color;
            break;
        case usedEmail.code:
            notificationDom.notifMessage.innerText = usedEmail.message;
            icon.className = sign.error.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.error.color;
            break;
        case invalidEmail.code:
            notificationDom.notifMessage.innerText = invalidEmail.message;
            icon.className = sign.error.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.error.color;
            break;
        // ----- WARNINGS -----
        case 'no-flights':
            notificationDom.notifMessage.innerText = trigger.message;
            icon.className = sign.warning.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.warning.color;
            break;
        case 'no-flight-selected':
            notificationDom.notifMessage.innerText = trigger.message;
            icon.className = sign.warning.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.warning.color;
            break;
        // ----- NOTIFICATION -----
        case 'newCustomerInTheChat':
            notificationDom.notifMessage.innerText = trigger.message;
            icon.className = sign.notif.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.notif.color;
            break;
        // ----- SUCCESS -----
        case 'booking':
            notificationDom.notifMessage.innerText = trigger.message;
            icon.className = sign.success.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.success.color;
            break;
        case 'archive':
            notificationDom.notifMessage.innerText = trigger.message;
            icon.className = sign.success.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.success.color;
            break;
        case 'profile_photo':
            notificationDom.notifMessage.innerText = trigger.message;
            icon.className = sign.success.icon;
            (iconBox as HTMLElement).style.backgroundColor = sign.success.color;
            break;
        default:
            break;
    }

    // notificationDom.notifMessage.innerText = error.message;

    setTimeout((): void => {
        notificationDom.notif.classList.remove('active');
    }, 4000);
};