export const sides = () => {
	// --- DOM Elements ---
	const sideDay = document.querySelector('.side--day');
	const sideNight = document.querySelector('.side--night');

	sideDay.addEventListener('mouseover', () => {
		sideDay.classList.add('show');
		sideNight.classList.add('hide');
	});
	sideDay.addEventListener('mouseout', () => {
		sideDay.classList.remove('show');
		sideNight.classList.remove('hide');
	});

	sideNight.addEventListener('mouseover', () => {
		sideNight.classList.add('show');
		sideDay.classList.add('hide');
	});
	sideNight.addEventListener('mouseout', () => {
		sideNight.classList.remove('show');
		sideDay.classList.remove('hide');
	});
};
