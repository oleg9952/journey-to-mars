export const wrongPassword: object = {
    code: 'auth/wrong-password',
    message: 'The password is invalid or the user does not have a password.'
};

export const userNotFound: object = {
    code: 'auth/user-not-found',
    message: 'There is no user record corresponding to this identifier.'
};

export const weakPassword: object = {
    code: 'auth/weak-password',
    message: 'Password should be at least 6 characters.'
};

export const usedEmail: object = {
    code: 'auth/email-already-in-use',
    message: 'The email address is already in use by another account.'
};

export const invalidEmail: object = {
    code: 'auth/invalid-email',
    message: 'The email address is badly formatted.'
};  