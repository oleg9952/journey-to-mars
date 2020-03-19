import { sidesDom } from '../../../javascript/dom_elements';

export const sides = () => {
	sidesDom.sideDay.addEventListener('mouseover', () => {
		sidesDom.sideDay.classList.add('show');
		sidesDom.sideNight.classList.add('hide');
	});
	sidesDom.sideDay.addEventListener('mouseout', () => {
		sidesDom.sideDay.classList.remove('show');
		sidesDom.sideNight.classList.remove('hide');
	});

	sidesDom.sideNight.addEventListener('mouseover', () => {
		sidesDom.sideNight.classList.add('show');
		sidesDom.sideDay.classList.add('hide');
	});
	sidesDom.sideNight.addEventListener('mouseout', () => {
		sidesDom.sideNight.classList.remove('show');
		sidesDom.sideDay.classList.remove('hide');
	});
};
