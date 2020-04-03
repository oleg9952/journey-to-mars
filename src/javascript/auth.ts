import { auth, firestore } from '../../fb_config';
import { setCurrentUser, getUserFromStorage } from './user';
import { resetForm } from './forms';
import { notification } from '../pug/components/notification/notification';
import {
    fSpinnerSignIn,
    fSpinnerSignUp,
    fSpinnerReset
} from './dom_elements';
import { activityLogger } from './activityLogger';

// ***** AUTH-LISTENER *****

auth.onAuthStateChanged((user: object) => {
    if (user) {
        firestore.collection('users').doc(`${user.uid}`)
            .get()
            .then((resp: object) => {
                firestore.collection('bookings')
                    .get()
                    .then((tickets: object) => {
                        const bookings: Array<object> = [];

                        tickets.docs.forEach((ticket: object) => {
                            if (ticket.data().uid === user.uid) {
                                bookings.push(ticket.data());
                            }
                        })

                        firestore.collection('logs').doc(`${user.uid}`)
                            .get()
                            .then((logs: object) => {
                                setCurrentUser('signedIn', {
                                    uid: user.uid,
                                    email: user.email,
                                    bookings,
                                    ...resp.data(),
                                    logs: logs.data()
                                }); 
                            })
                            .catch((error: object) => console.error(`Logs: ${error}`))

                        
                    })
                    .catch((error: object) => console.error(error))
            })
            .catch((error: object) => console.error(error));
    } else {
        setCurrentUser('signedOut');
    }
});

// ***** AUTH-FUNCTIONS *****

export const signUpNewUser = async (credentials: object, target: object) => {
    fSpinnerSignUp.classList.add('active');
    const { 
        firstname,
        lastname,
        age,
        email, 
        password 
    } = credentials;
    try {
        const request = await auth.createUserWithEmailAndPassword(email, password);
        const { uid } = request.user;

        activityLogger(uid, 'signUp');

        firestore.collection('users').doc(`${uid}`)
            .set({
                firstname,
                lastname,
                age,
                type: 'user'
            })
            .then(() => {
                fSpinnerSignUp.classList.remove('active');
                resetForm('signUp', target);
            })
            .catch((error) => console.error(error));
    } catch (error) {
        fSpinnerSignUp.classList.remove('active');
        notification(error);
        console.error(error)
    }
};

export const signIn = (credentials: object, target: object) => {
    const { email, password } = credentials;
    fSpinnerSignIn.classList.add('active');
    auth.signInWithEmailAndPassword(email, password)
        .then((resp: object) => {
            fSpinnerSignIn.classList.remove('active');
            resetForm('signIn', target);
            activityLogger(resp.user.uid, 'signIn');
        })
        .catch((error: object) => {
            fSpinnerSignIn.classList.remove('active');
            notification(error);
        });
};

export const resetPass = (email: string, target: object) => {
    fSpinnerReset.classList.add('active');
    auth.sendPasswordResetEmail(email)
        .then(() => {
            fSpinnerReset.classList.remove('active');
            resetForm('resetPass', target);
        })
        .catch((error) => {
            fSpinnerReset.classList.remove('active');
            notification(error);
        });
};

export const signOut = () => {
        activityLogger(getUserFromStorage().uid, 'signOut')
        auth.signOut()
            .catch((error) => console.error(error));
};