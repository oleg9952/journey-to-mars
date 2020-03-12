import API_KEY from '../../../../nasa_api';

export const gallery = () => {
	// ----- DOM Elements -----
	const form = document.querySelector('.gallery__interface-filters');
	const cameras = document.querySelector('.gallery__filters-cameras');
	const camera = document.querySelectorAll('.gallery__cameras-camera');
	const output = document.querySelector('.gallery__output-pictures');
	const spinner = document.querySelector('.gallery__output-spinner');
	const placeholder = document.querySelector('.gallery__output-nothingfound');
	const solSelection = document.querySelector('.gallery__sol-inp');

	let selectedFilter = null;

	solSelection.addEventListener('input', (e) => {
		const self = e.target;
		if (self.value > 1000) {
			self.value = '';
			self.placeholder = '1000 is maximum';
			setTimeout(() => {
				self.placeholder = 'Sol...';
			}, 2000);
		}
	});

	cameras.addEventListener('click', (e) => {
		camera.forEach((element) => element.classList.remove('active'));
		switch (e.target.id) {
		case 'FHAZ':
			e.target.classList.add('active');
			selectedFilter = 'FHAZ';
			break;
		case 'RHAZ':
			e.target.classList.add('active');
			selectedFilter = 'RHAZ';
			break;
		case 'MAST':
			e.target.classList.add('active');
			selectedFilter = 'MAST';
			break;	
		case 'CHEMCAM':
			e.target.classList.add('active');
			selectedFilter = 'CHEMCAM';
			break;
		case 'MAHLI':
			e.target.classList.add('active');
			selectedFilter = 'MAHLI';
			break;
		case 'MARDI':
			e.target.classList.add('active');
			selectedFilter = 'MARDI';
			break;
		case 'NAVCAM':
			e.target.classList.add('active');
			selectedFilter = 'NAVCAM';
			break;
		case 'PANCAM':
			e.target.classList.add('active');
			selectedFilter = 'PANCAM';
			break;
		case 'all':
			e.target.classList.add('active');
			selectedFilter = 'none';
			break;
		default:
			break;
		}
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (selectedFilter && solSelection.value.length) {
			placeholder.classList.remove('active');
			output.classList.remove('active');
			spinner.classList.add('active');
			fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solSelection.value}&${selectedFilter === 'none' ? '' : `&camera=${selectedFilter}&`}page=1&api_key=${API_KEY}`)
				.then((resp) => resp.json())
				.then((data) => {
					spinner.classList.remove('active');
					if (data.photos.length) {
						output.innerHTML = '';
						output.classList.add('active');
						output.innerHTML = data.photos.map((pic) => `
							<div class="gallery__pictures-picture"
								style="background-image: url(${pic.img_src})"
							></div>
						`).join('');
					} else {
						placeholder.classList.add('active');
					}
				})
				.catch((err) => console.error(err));
		} else {
			alert('empty');
		}
	});
};
