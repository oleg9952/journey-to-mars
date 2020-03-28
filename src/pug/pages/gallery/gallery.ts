import { galleryDom } from '../../../javascript/dom_elements';
import { nasaApi } from '../../../javascript/nasaApi';

export const gallery = (): void => {
	let selectedFilter: string = null;

	galleryDom.solSelection.addEventListener('input', (e: Event): void => {
		const self: object = e.target;
		if (self.value > 1000) {
			self.value = '';
			self.placeholder = '1000 is maximum';
			setTimeout(() => {
				self.placeholder = 'Sol...';
			}, 2000);
		}
	});

	galleryDom.cameras.addEventListener('click', (e: Event): void => {
		galleryDom.camera.forEach((element) => element.classList.remove('active'));
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

	// ----- NATIVE -----

	// galleryDom.form.addEventListener('submit', (e: Event) => {
	// 	e.preventDefault();
	// 	if (selectedFilter && galleryDom.solSelection.value.length) {
	// 		galleryDom.placeholder.classList.remove('active');
	// 		galleryDom.output.classList.remove('active');
	// 		galleryDom.spinner.classList.add('active');
	// 		fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${galleryDom.solSelection.value}&${selectedFilter === 'none' ? '' : `&camera=${selectedFilter}&`}page=1&api_key=${API_KEY}`)
	// 			.then((resp: Object) => resp.json())
	// 			.then((data: Array<object>) => {
	// 				galleryDom.spinner.classList.remove('active');
	// 				if (data.photos.length) {
	// 					galleryDom.output.innerHTML = '';
	// 					galleryDom.output.classList.add('active');
	// 					galleryDom.output.innerHTML = data.photos.map((pic: object) => `
	// 						<div class="gallery__pictures-picture"
	// 							style="background-image: url(${pic.img_src})"
	// 						></div>
	// 					`).join('');
	// 				} else {
	// 					galleryDom.placeholder.classList.add('active');
	// 				}
	// 			})
	// 			.catch((err) => console.error(err));
	// 	} else {
	// 		alert('empty');
	// 	}
	// });

	// ----- RxJS -----

	galleryDom.form.addEventListener('submit', (e: Event) => {
		e.preventDefault();
		if (selectedFilter && galleryDom.solSelection.value.length) {
			galleryDom.placeholder.classList.remove('active');
			galleryDom.output.classList.remove('active');
			galleryDom.spinner.classList.add('active');

			nasaApi(galleryDom.solSelection.value, selectedFilter)
				.subscribe({
					next: (photos: object) => {
						galleryDom.spinner.classList.remove('active');
						if (photos.length) {
							galleryDom.output.innerHTML = '';
							galleryDom.output.classList.add('active');
							galleryDom.output.innerHTML = photos;
						} else {
							galleryDom.placeholder.classList.add('active');
						}
					},
					// error: (err: object) => console.error(err),
					// complete: () => console.log('done')
				})

		} else {
			alert('empty');
		}
	});

	
};
