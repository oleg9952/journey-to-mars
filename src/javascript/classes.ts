import { navDom } from './dom_elements';

// ----- AUTH -----

export class AuthCreds {
    constructor(
        public email: string,
        public password?: string,
        public firstname?: string,
        public lastname?: string,
        public age?: number,
    ) {};
}

// ----- USERS -----

export class User {
    constructor(
        public uid: string,
        public email: string,
        public age: number,
        public firstname: string,
        public lastname: string,
        public type: string
    ) {}
    
    changeEmail(newEmail: string) {
        this.email = newEmail;

        // firebase code
    }
    updateProfile(first: string, last: string, age: number) {
        this.firstname = first;
        this.lastname = last;
        this.age = age;

        // firebase code
    }
}

export class Admin extends User {
    constructor(
        public uid: string,
        public email: string,
        public age: number,
        public firstname: string,
        public lastname: string,
        public type: string
    ) {
        super(
            uid,
            email,
            age,
            firstname,
            lastname,
            type
        );
    }

    getAllUsers(): Array<object> {
        // firebase code
        const users: Array<object> = null;
        return users;
    }

    deleteUser(uid: string) {
        // firebase code
    }
}