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
    form: document.querySelector('.booking__content-form')
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
    // ----- Admin Pages -----
    // customers: document.querySelector('.profile__user-support'),
}