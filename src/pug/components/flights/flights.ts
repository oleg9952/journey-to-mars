/* eslint-disable @typescript-eslint/no-use-before-define */
import { flightsDom } from '../../../javascript/dom_elements';
// import { flightsRenderer } from "./flightsRenderer";
import { getUserFromStorage } from '../../../javascript/user';
// eslint-disable-next-line import/no-cycle
import { addNewFlight } from './newFlight';

export const flights = () => {
    // ----- Toggle modal -----
    const user = getUserFromStorage();
    if (user) {
        if (user.type === 'admin') {
            flightsDom.openModalBtn.addEventListener('click', () => {
                flightsDom.modal.classList.add('active');
            });
            flightsDom.modal.addEventListener('click', (e: Event) => {
                if (e.target !== e.currentTarget) return;
                resetFlightsModal();
            });
        
            // ----- Form -----
            let selectedAgency: string = null;
    
            flightsDom.agenciesHolder.addEventListener('click', (e: Event) => {
                if (e.target.className.search('newflight__agencies-agency') > -1) {
                    flightsDom.agencies.forEach(agency => agency.classList.remove('active'));
                    selectedAgency = e.target.innerText.toLowerCase();
                    e.target.classList.add('active');
                }
            });
            flightsDom.form.addEventListener('submit', (e: Event) => {
                e.preventDefault();
                const {
                    date,
                    month,
                    year,
                    hour,
                    minute,
                } = e.currentTarget;
        
                if (
                    date.value.length
                    && month.value.length
                    && year.value.length
                    && hour.value.length
                    && minute.value.length
                    && selectedAgency
                ) {
                    addNewFlight(selectedAgency, {
                        date: date.value,
                        month: month.value,
                        year: year.value,
                        hour: hour.value,
                        minute: minute.value
                    });
                } else {
                    alert('Empty');
                }
            });
        }  
    }
};

export function resetFlightsModal() {
    flightsDom.modal.classList.remove('active');
    flightsDom.agencies.forEach(agency => agency.classList.remove('active'));
    flightsDom.form.reset();
}