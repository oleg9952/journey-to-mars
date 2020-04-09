import { getUserFromStorage } from "../../../javascript/user";

export const logsRenderer = (filter: string): string => {
    let output: string = null;
    const { bookings, logins, logouts, signup} = getUserFromStorage().logs;
    const all: Array<string> = [
        ...bookings.map((record: number): object => {
            return {
                activity: 'Booking',
                date: record
            }
        }),
        ...logins.map((record: number): object => {
            return {
                activity: 'Login',
                date: record
            }
        }),
        ...logouts.map((record: number): object => {
            return {
                activity: 'Logout',
                date: record
            }
        }),
        {
            activity: 'Signup',
            date: signup
        }
    ].sort((a, b) => {
        const sortA: number = a.date;
        const sortB: number = b.date;

        if(sortA > sortB) {
            return -1
        } else if(sortA < sortB) {
            return 1
        } else {
            return 0
        }
    })

    switch (filter) {
        case 'all':
            output = all.map((record: object): string => {
                return generateActivityRecord(record.date, record.activity)
            }).join('');
            break;
        case 'logins':
            output = all.filter((record: object) => {
                if (record.activity === 'Login' || record.activity === 'Logout' || record.activity === 'Signup') {
                    return record;
                }
            }).map((record: object) => {
                return generateActivityRecord(record.date, record.activity);
            }).join('');
            break;
        case 'bookings':
            output = all.filter((record: object) => {
                if (record.activity === 'Booking') {
                    return record;
                }
            }).map((record: object) => {
                return generateActivityRecord(record.date, record.activity);
            }).join('');
            break;
        default:
            break;
    }

    return output;
}

function generateActivityRecord(date: number, type: string): string {
    const recordDate = new Date(date);
    const day: string = `${recordDate.getDay() < 10 ? '0'+recordDate.getDate(): recordDate.getDate()}`;
    const month: string = `${recordDate.getMonth() < 10 ? '0'+recordDate.getMonth(): recordDate.getMonth()}`;
    const year: string = `${recordDate.getFullYear()}`;
    const hour: string = `${recordDate.getHours() < 10 ? '0'+recordDate.getHours(): recordDate.getHours()}`;
    const minute: string = `${recordDate.getMinutes() < 10 ? '0'+recordDate.getMinutes(): recordDate.getMinutes()}`;
    const second: string = `${recordDate.getSeconds() < 10 ? '0'+recordDate.getSeconds(): recordDate.getSeconds()}`

    const icons: object = {
        login: 'fas fa-sign-in-alt',
        logout: 'fas fa-sign-out-alt',
        signup: 'fas fa-user-plus',
        booking: 'fas fa-ticket-alt'
    }
    let currentIcon: string = null;

    switch (type) {
        case 'Login':
            currentIcon = icons.login;
            break;
        case 'Logout':
            currentIcon = icons.logout;
            break;
        case 'Signup':
            currentIcon = icons.signup;
            break;
        case 'Booking':
            currentIcon = icons.booking;
            break;
        default:
            break;
    }

    return `
    <div class="profile__activities-historyitem">
        <div class="profile__historyitem-icon">
        <i class="${currentIcon}"></i></div>
        <div class="profile__historyitem-type">${type}</div>
        <p class="profile__historyitem-date">${day}.${month}.${year} || ${hour}:${minute}:${second}</p>
    </div>
    `
}