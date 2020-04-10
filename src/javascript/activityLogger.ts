import { firestore } from '../../fb_config';

export const activityLogger = (uid: string, type: string): void => {
    if (type === 'signUp') {
        firestore.collection('logs').doc(`${uid}`)
            .set({
                logins: [],
                logouts: [],
                signup: new Date().getTime(),
                bookings: []
            })
            .catch((error: object) => console.error(`Logger: ${error}`));
    } else {
        firestore.collection('logs').doc(`${uid}`)
            .get()
            .then((resp: object) => {
                if (type === 'signIn') {
                    firestore.collection('logs').doc(`${uid}`)
                        .update({
                            logins: [...resp.data().logins, new Date().getTime()]
                        })
                        .catch((error: object) => console.error(error));
                } else if (type === 'signOut') {
                    firestore.collection('logs').doc(`${uid}`)
                        .update({
                            logouts: [...resp.data().logouts, new Date().getTime()]
                        })
                        .catch((error: object) => console.error(error));
                } else if (type === 'booking') {
                    firestore.collection('logs').doc(`${uid}`)
                        .update({
                            bookings: [...resp.data().bookings, new Date().getTime()]
                        })
                        .catch((error: object) => console.error(error));
                }
            })
            .catch((error: object) => console.error(`Logger: ${error}`));
    }    
};
