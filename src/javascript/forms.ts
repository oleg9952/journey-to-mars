import { authFormsDom } from './dom_elements';

export const validateInputs = (action: string, ...inputs: Array<object>): void => {
    const toggleEmptyClass = (target: object) => {
        target.classList.add('empty');
        setTimeout(() => {
            target.classList.remove('empty');
        }, 2000);
    };

    switch (action) {
        case 'signUp':
            inputs.forEach((input: object) => {
                if (input.name === 'firstname' && !input.value.length) {
                    toggleEmptyClass(input);
                } else if (input.name === 'lastname' && !input.value.length) {
                    toggleEmptyClass(input);
                } else if (input.name === 'age' && !input.value.length) {
                    toggleEmptyClass(input);
                } else if (input.name === 'email' && !input.value.length) {
                    toggleEmptyClass(input);
                } else if (input.name === 'password' && !input.value.length) {
                    toggleEmptyClass(input);
                }
            });
            break;
        case 'signIn':
            inputs.forEach((input: object) => {
                if (input.name === 'email' && !input.value.length) {
                    toggleEmptyClass(input);
                } else if (input.name === 'password' && !input.value.length) {
                    toggleEmptyClass(input);
                }
            });
            break;
        case 'resetPass':
            inputs.forEach((input: object) => {
                if (!input.value.length) {
                    toggleEmptyClass(input);
                }
            });
            break;
        default:
            break;
    }
};

export const resetForm = (action: string, target: object) => {
    switch (action) {
        case 'signUp':
            target.reset();
            authFormsDom.auth.classList.remove('active');
			authFormsDom.signInForm.classList.remove('active');
			authFormsDom.signUpForm.classList.remove('active');
            break;
        case 'signIn':
            target.reset();
            authFormsDom.auth.classList.remove('active');
            break;
        case 'resetPass':
            target.reset();
            authFormsDom.passResetForm.classList.remove('active');
            authFormsDom.auth.classList.remove('active');
            break;
        default:
            break;
    }
};