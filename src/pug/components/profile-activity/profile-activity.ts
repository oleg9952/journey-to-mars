import { profileDom } from "../../../javascript/dom_elements";
import { logsRenderer } from "./logsRenderer";

export const activityHistory = (): void => {
    profileDom.filters.addEventListener('click', (e: Event) => {
        const currentFilter = e.target;

        for(let i = 0; i < profileDom.allFilters.length; i++) {
            profileDom.allFilters[i].classList.remove('active');
            profileDom.contentBlocks[i].classList.remove('active');
        }

        switch (currentFilter.innerText) {
            case 'All':
                currentFilter.classList.add('active');
                profileDom.contentAll.classList.add('active');
                break;
            case 'Logins':
                currentFilter.classList.add('active');
                profileDom.contentLogins.classList.add('active');
                break;
            case 'Bookings':
                currentFilter.classList.add('active');
                profileDom.contentBookings.classList.add('active');
                break;
            default:
                break;
        }

    })
    // ----- RENDER LOGS -----
    profileDom.contentAll.innerHTML = logsRenderer('all');
    profileDom.contentLogins.innerHTML = logsRenderer('logins');
    profileDom.contentBookings.innerHTML = logsRenderer('bookings');
}