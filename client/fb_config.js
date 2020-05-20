import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyC6nDXbehBICAcaA1Z8_makHRfm4IATiFI',
    authDomain: 'journey-to-mars.firebaseapp.com',
    databaseURL: 'https://journey-to-mars.firebaseio.com',
    projectId: 'journey-to-mars',
    storageBucket: 'journey-to-mars.appspot.com',
    messagingSenderId: '424623257220',
    appId: '1:424623257220:web:ac86e444e803816ca2b4d1'
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();