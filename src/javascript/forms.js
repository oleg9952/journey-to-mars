import { authFormsDom } from './dom_elements';

export const validateInputs = (action, ...inputs) => {
    const toggleEmptyClass = (target) => {
        target.classList.add('empty');
        setTimeout(() => {
            target.classList.remove('empty');
        }, 2000);
    };

    switch (action) {
        case 'signUp':
            inputs.forEach((input) => {
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
            inputs.forEach((input) => {
                if (input.name === 'email' && !input.value.length) {
                    toggleEmptyClass(input);
                } else if (input.name === 'password' && !input.value.length) {
                    toggleEmptyClass(input);
                }
            });
            break;
        case 'resetPass':
            inputs.forEach((input) => {
                if (!input.value.length) {
                    toggleEmptyClass(input);
                }
            });
            break;
        default:
            break;
    }
};

export const resetForm = (action, target) => {
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