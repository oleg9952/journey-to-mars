export const authForm = () => {
	// ----- DOM Elements -----
	const signInForm = document.querySelector('.auth__form-signin');
	const signUpForm = document.querySelector('.auth__form-signup');
	const passResetForm = document.querySelector('.auth__form-reset');
	const goToSignUpBtn = document.querySelector('#auth__signup');
	const goBackToLogInBtn = document.querySelector('.auth__form-backbtn');
	const goToResetBtn = document.querySelector('#auth__reset');
	const closeResetFormBtn = document.querySelector('#close__reset');


	goToSignUpBtn.addEventListener('click', () => {
		signInForm.classList.add('active');
		signUpForm.classList.add('active');
	});

	goBackToLogInBtn.addEventListener('click', () => {
		signInForm.classList.remove('active');
		signUpForm.classList.remove('active');
	});

	goToResetBtn.addEventListener('click', () => {
		passResetForm.classList.add('active');
	});
	closeResetFormBtn.addEventListener('click', () => {
		passResetForm.classList.remove('active');
	});
};