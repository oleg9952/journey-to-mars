/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/camelcase */
import { profileDom } from '../../../javascript/dom_elements';

export const profileRenderer = (userType: string, data: object): void => {
    const {
        email,
        age,
        firstname,
        lastname,
        bookings,
        profile_img
    } = data;

    if (userType === 'user') {
        // ----- My Page -----
        if (profile_img) {
            profileDom.userPic.style.backgroundImage = `url(${profile_img})`;
        } else {
            profileDom.userPic.innerText = firstname.charAt(0);
        }
        profileDom.userFullName.innerText = `${firstname} ${lastname}`;
        profileDom.userFirstName.innerText = firstname;
        profileDom.userLastName.innerText = lastname;
        profileDom.userAge.innerText = age;
        profileDom.userEmail.innerText = email;
        // ----- My Tickets -----
        if (bookings.length) {
            profileDom.ticketsOutput.innerHTML = bookings.map((ticket: object) => {
                return generateTicket(
                    ticket.firstname,
                    ticket.lastname,
                    ticket.age,
                    ticket.email,
                    ticket.agency,
                    ticket.seats,
                    ticket.services,
                    ticket.totalPrice
                );
            }).join('');
        } else {
            profileDom.ticketsOutput.innerHTML = 'No bookings yet...';
        }
    } else {
        // ----- Customers -----
        // ----- Bookings -----
        // ----- Chats -----
    }
};

function generateTicket(
    firstname: string,
    lastname: string,
    age: number,
    email: string,
    agency: string,
    seats: Array<string>,
    services: Array<string>,
    totalPrice: number
) {
    return `
        <div class="profile__tickets-ticket">
            <div class="profile__ticket-header">
                <i class="fas fa-ticket-alt"></i>
                <p class="profile__header-text">Ticket #154563</p>
            </div>
            <div class="profile__ticket-body">
                <div class="profile__body-column">
                    <p class="profile__ticket-item">First Name</p>
                    <p class="profile__ticket-item">Last Name</p>
                    <p class="profile__ticket-item">Age</p>
                    <p class="profile__ticket-item">Email</p>
                    <p class="profile__ticket-item">Agency</p>
                    <p class="profile__ticket-item">Departure</p>
                    <p class="profile__ticket-item">Seats</p>
                    <p class="profile__ticket-item">Services</p>
                    <p class="profile__ticket-item">Flight Duration</p>
                    <p class="profile__ticket-item">Arrival</p>
                    <p class="profile__ticket-item">Total Price</p>
                </div>
                <div class="profile__body-column">
                    <p class="profile__ticket-item">${firstname}</p>
                    <p class="profile__ticket-item">${lastname}</p>
                    <p class="profile__ticket-item">${age}</p>
                    <p class="profile__ticket-item">${email}</p>
                    <p class="profile__ticket-item">${agency}</p>
                    <p class="profile__ticket-item">----</p>
                    <p class="profile__ticket-item capitalize">${seats.join(', ')}</p>
                    <p class="profile__ticket-item capitalize">${services.length ? services.join(', ') : '---'}</p>
                    <p class="profile__ticket-item">----</p>
                    <p class="profile__ticket-item">----</p>
                    <p class="profile__ticket-item">$${totalPrice}</p>
                </div>
            </div>
        </div>
    `;
}