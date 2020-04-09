// ***** AUTH-FORMS *****
export const authFormsDom: object = {
    signInForm: document.querySelector('.auth__form-signin'),
    signUpForm: document.querySelector('.auth__form-signup'),
    passResetForm: document.querySelector('.auth__form-reset'),
    goToSignUpBtn: document.querySelector('#auth__signup'),
    goBackToLogInBtn: document.querySelector('.auth__form-backbtn'),
    goToResetBtn: document.querySelector('#auth__reset'),
    closeResetFormBtn: document.querySelector('#close__reset'),
    auth: document.querySelector('.auth'),
};

// ***** NAVIGATION *****
export const navDom: object = {
    // ----- Intersection Observer -----
    nav: document.querySelector('.nav'),
    header: document.querySelector('.header'),
    // ----- AGENCIES INFO -----
    agencies: document.querySelector('.nav__column-agencies'),
    infomodal: document.querySelector('.infomodal'),
    closeBtn: document.querySelector('.infomodal__close-btn'),
    // ----- USER-NAV -----
    userOnline: document.querySelector('.nav__column-useronline'),
    userPicture: document.querySelector('.nav__column-user'),
    userLetter: document.querySelector('.nav__user-letter'),
    userNav: document.querySelector('.nav__column-usernav'),
    signOutBtn: document.querySelector('#sign--out'),
    // ----- AUTH FORM Events ----- 
    signInBtn: document.querySelector('#sign--in'),
    authForm: document.querySelector('.auth'),
    auth: document.querySelector('.auth'),
    // ----- MOBILE-NAV -----
    openMobileNavBtn: document.querySelector('.nav__column-mobile'),
    mobileNav: document.querySelector('.navmobile'),
    closeBtnMobileNav: document.querySelector('.navmobile__colse-btn'),
};

// ***** SIDES *****
export const sidesDom: object = {
    sideDay: document.querySelector('.side--day'),
    sideNight: document.querySelector('.side--night')
};

// ***** GALLERY *****
export const galleryDom: object = {
    form: document.querySelector('.gallery__interface-filters'),
    cameras: document.querySelector('.gallery__filters-cameras'),
    camera: document.querySelectorAll('.gallery__cameras-camera'),
    output: document.querySelector('.gallery__output-pictures'),
    spinner: document.querySelector('.gallery__output-spinner'),
    placeholder: document.querySelector('.gallery__output-nothingfound'),
    solSelection: document.querySelector('.gallery__sol-inp')
};

// ***** BOOKING *****
export const bookingDom: object = {
    bookingBgs: document.querySelectorAll('.booking__bg'),
    spaceAgencies: document.querySelectorAll('.booking__agencies-agency'),
    form: document.querySelector('.booking__content-form'),
    // ----- NEXT -----
    nextSection: document.querySelector('.booking__next'),
    nextSectionClose: document.querySelector('.booking__next-close'),
    seatClassSection: document.querySelector('.booking__next-types'),
    seatClasses: document.querySelectorAll('.booking__types-type'),
    seats: document.querySelector('.booking__next-seats'),
    services: document.querySelector('.booking__next-services'),
    servicesAll: document.querySelectorAll('.booking__services-service'),
    bookingPrice: document.querySelector('.booking__next-price'),
    confirmBtn: document.querySelector('.booking__next-submit'),
    // ----- Flights
    flights: document.querySelectorAll('.booking__flights-flight'),
    flightsHolder: document.querySelector('.booking__next-flights'),
    // ----- Agencies
    nasa: document.querySelector('.agency--nasa'),
    ssau: document.querySelector('.agency--ukr'),
    spacex: document.querySelector('.agency--spacex')
};

// ***** FORM-SPINNER *****
export const [
    fSpinnerSignIn,
    fSpinnerSignUp,
    fSpinnerReset
] = document.querySelectorAll('.fspinner');

// ***** NOTIFICATION *****
export const notificationDom: object = {
    notif: document.querySelector('.notification'),
    notifIcon: document.querySelector('.notification--icon'),
    notifMessage: document.querySelector('.notification__column-message')
};

// ***** PROFILE PAGE *****
export const profileDom: object = {
    // ----- Navigation -----
    userNav: document.querySelector('.profile__nav-user'),
    adminNav: document.querySelector('.profile__nav-admin'),
    navBtn: document.querySelectorAll('.profile__btn-name'),
    navBtnParents: document.querySelectorAll('.profile__nav-btn'),
    returnBtn: document.querySelector('.profile__nav-return'),
    // ----- Content User Types -----
    userContent: document.querySelector('.profile__content-user'),
    adminContent: document.querySelector('.profile__content-admin'),
    // ----- User Pages -----
    myPage: document.querySelector('.mypage'),
    myTickets: document.querySelector('.mytickets'),
    support: document.querySelector('.support'),
    userPages: document.querySelectorAll('.profile__user-page'),
    // My Page
    userPic: document.querySelector('.profile__header-picture'),
    userFullName: document.querySelector('.profile__header-username'),
    userFirstName: document.querySelector('#user--first-name'),
    userLastName: document.querySelector('#user--last-name'),
    userAge: document.querySelector('#user--age'),
    userEmail: document.querySelector('#user--email'),
    // Activity History Widget
    filters: document.querySelector('.profile__filter-filters'),
    allFilters: document.querySelectorAll('.profile__filters-filter'),
    contentBlocks: document.querySelectorAll('.profile__activities-content'),
    contentAll: document.querySelector('#history--all'),
    contentLogins: document.querySelector('#history--logins'),
    contentBookings: document.querySelector('#history--bookings'),
    // My Tickets
    ticketsOutput: document.querySelector('.profile__mytickets-tickets')


    // ----- Admin Pages -----
    // customers: document.querySelector('.profile__user-support'),
}

// ***** FLIGHTS *****
export const flightsDom = {
    // ----- New flight -----
    openModalBtn: document.querySelector('.flights__newflight-btn'),
    modal: document.querySelector('.newflight'),
    // ----- Form
    form: document.querySelector('.newflight__form'),
    agenciesHolder: document.querySelector('.newflight__form-agencies'),
    agencies: document.querySelectorAll('.newflight__agencies-agency'),
    // ----- Cards -----
    flightsCardsOutput: document.querySelector('.flights__cards')
}