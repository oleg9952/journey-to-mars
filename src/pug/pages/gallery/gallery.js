import API_KEY from '../../../../nasa_api';

export const gallery = () => {
	// ----- DOM Elements -----
	const form = document.querySelector('.gallery__interface-filters');
	const cameras = document.querySelector('.gallery__filters-cameras');
	const camera = document.querySelectorAll('.gallery__cameras-camera');
	const output = document.querySelector('.gallery__output-pictures');
	const spinner = document.querySelector('.gallery__output-spinner');
	const solSelection = document.querySelector('.gallery__sol-selection');

	let selectedFilter = null;

	cameras.addEventListener('click', (e) => {
		camera.forEach((element) => element.classList.remove('active'));
		if (e.target.id === 'FHAZ') {
			e.target.classList.add('active');
			selectedFilter = 'FHAZ';
		} else if (e.target.id === 'RHAZ') {
			e.target.classList.add('active');
			selectedFilter = 'RHAZ';
		} else if (e.target.id === 'MAST') {
			e.target.classList.add('active');
			selectedFilter = 'MAST';
		} else if (e.target.id === 'CHEMCAM') {
			e.target.classList.add('active');
			selectedFilter = 'CHEMCAM';
		} else if (e.target.id === 'MAHLI') {
			e.target.classList.add('active');
			selectedFilter = 'MAHLI';
		} else if (e.target.id === 'MARDI') {
			e.target.classList.add('active');
			selectedFilter = 'MARDI';
		} else if (e.target.id === 'NAVCAM') {
			e.target.classList.add('active');
			selectedFilter = 'NAVCAM';
		} else if (e.target.id === 'PANCAM') {
			e.target.classList.add('active');
			selectedFilter = 'PANCAM';
		} else if (e.target.id === 'all') {
			e.target.classList.add('active');
		}
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (selectedFilter) {
			output.classList.remove('active');
			spinner.classList.add('active');
			fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solSelection.value}&camera=${selectedFilter}&page=1&api_key=${API_KEY}`)
				.then((resp) => resp.json())
				.then((data) => {
					output.innerHTML = '';
					spinner.classList.remove('active');
					const outputData = data.photos.map((pic) => `
                        <div class="gallery__pictures-picture"
                            style="background-image: url(${pic.img_src})"
                        ></div>
                    `).join('');
					output.classList.add('active');
					output.innerHTML = outputData;
				})
				.catch((err) => console.error(err));
		} else {
			alert('empty');
		}
	});
};
