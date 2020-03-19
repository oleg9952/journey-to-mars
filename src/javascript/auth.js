import { auth, firestore } from '../../fb_config';
import { setCurrentUser } from './user';
import { resetForm } from './forms';
import { notification } from '../pug/components/notification/notification';
import {
    fSpinnerSignIn,
    fSpinnerSignUp,
    fSpinnerReset
} from './dom_elements';

// ***** AUTH-LISTENER *****

auth.onAuthStateChanged((user) => {
    if (user) {
        firestore.collection('users').doc(`${user.uid}`)
            .get()
            .then((resp) => {
                setCurrentUser('signedIn', {
                    uid: user.uid,
                    email: user.email,
                    ...resp.data()
                });
            })
            .catch((error) => console.error(error));
    } else {
        setCurrentUser('signedOut');
    }
});

// ***** AUTH-FUNCTIONS *****

export const signUpNewUser = async (credentials, target) => {
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
        firestore.collection('users').doc(`${uid}`)
            .set({
                firstname,
                lastname,
                age
            })
            .then(() => {
                fSpinnerSignUp.classList.remove('active');
                resetForm('signUp', target);
            })
            .catch((error) => console.error(error));
    } catch (error) {
        fSpinnerSignUp.classList.remove('active');
        notification(error);
    }
};

export const signIn = (credentials, target) => {
    const { email, password } = credentials;
    fSpinnerSignIn.classList.add('active');
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            fSpinnerSignIn.classList.remove('active');
            resetForm('signIn', target);
        })
        .catch((error) => {
            fSpinnerSignIn.classList.remove('active');
            notification(error);
        });
};

export const resetPass = (email, target) => {
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
        auth.signOut()
            .catch((error) => console.error(error));
};