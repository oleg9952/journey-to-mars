import { signUpNewUser, signIn, resetPass } from '../../../javascript/auth';
import { authFormsDom } from '../../../javascript/dom_elements';
import { validateInputs } from '../../../javascript/forms';
// import { AuthCreds } from '../../../javascript/classes';

export const authForm = () => {
	// ----- DOM Manipulations -----
	authFormsDom.goToSignUpBtn.addEventListener('click', () => {
		authFormsDom.signInForm.classList.add('active');
		authFormsDom.signUpForm.classList.add('active');
	});

	authFormsDom.goBackToLogInBtn.addEventListener('click', () => {
		authFormsDom.signInForm.classList.remove('active');
		authFormsDom.signUpForm.classList.remove('active');
	});

	authFormsDom.goToResetBtn.addEventListener('click', () => {
		authFormsDom.passResetForm.classList.add('active');
	});
	authFormsDom.closeResetFormBtn.addEventListener('click', () => {
		authFormsDom.passResetForm.classList.remove('active');
	});

	authFormsDom.auth.addEventListener('click', (e: Event) => {
		if (e.target !== e.currentTarget) return;
		authFormsDom.auth.classList.remove('active');
		authFormsDom.signInForm.classList.remove('active');
		authFormsDom.signUpForm.classList.remove('active');
		authFormsDom.passResetForm.classList.remove('active');
	});

	// ----- SignUp -----
	authFormsDom.signUpForm.addEventListener('submit', (e: Event) => {
		e.preventDefault();
		const {
			firstname,
			lastname,
			age,
			email,
			password
		} = e.currentTarget;
		
		if (
			firstname.value.length 
			&& lastname.value.length 
			&& age.value.length 
			&& email.value.length 
			&& password.value.length
		) {
			signUpNewUser({
				firstname: firstname.value,
				lastname: lastname.value,
				age: age.value,
				email: email.value,
				password: password.value
			},
				e.currentTarget
			);
		} else {
			validateInputs('signUp', 
				firstname,
				lastname,
				age,
				email,
				password
			);
		}
	});

	// ----- SignIn -----
	authFormsDom.signInForm.addEventListener('submit', (e: Event) => {
		e.preventDefault();
		const { email, password } = e.currentTarget;

		if (email.value.length && password.value.length) {
			signIn({
				email: email.value,
				password: password.value
			}, e.currentTarget);
		} else {
			validateInputs('signIn', email, password);
		}
	});

	// ----- ResetPassword -----
	authFormsDom.passResetForm.addEventListener('submit', (e: Event) => {
		e.preventDefault();
		const { email } = e.currentTarget;

		if (email.value.length) {
			resetPass(email.value, e.currentTarget);
		} else {
			validateInputs('resetPass', email);
		}
	});
};