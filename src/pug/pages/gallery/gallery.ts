import { galleryDom } from '../../../javascript/dom_elements';
import { nasaApi } from '../../../javascript/nasaApi';
import { LazyLoader } from './lazyLoader';
import { fullscreenGallery } from './fullscreen/fullscreen';

interface ImagesInterf {
	imgs: Array<string>;
	currentChunk: number;
	imgsPerChunk: number;
	lastImg: number;
	firstImg: number;
	getImgsPerChunk: () => string;
	loadMoreImgsPerChunk: () => string;
}

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

	// ----- RxJS -----
	let images: ImagesInterf = null;

	galleryDom.form.addEventListener('submit', (e: Event) => {
		e.preventDefault();
		if (selectedFilter && galleryDom.solSelection.value.length) {
			galleryDom.placeholder.classList.remove('active');
			galleryDom.output.classList.remove('active');
			galleryDom.spinner.classList.add('active');

			nasaApi(galleryDom.solSelection.value, selectedFilter)
				.subscribe({
					next: (photos: Array<string>) => {
						galleryDom.spinner.classList.remove('active');
						if (photos.length) {
							images = new LazyLoader(photos);
							console.log(photos.length);
							if (photos.length > images.imgsPerChunk) {
								galleryDom.showMoreBtn.style.display = 'block';
							} else {
								galleryDom.showMoreBtn.style.display = 'none';
							}
							galleryDom.output.innerHTML = '';
							galleryDom.output.classList.add('active');
							galleryDom.output.innerHTML = images.getImgsPerChunk();
						} else {
							galleryDom.showMoreBtn.style.display = 'none';
							galleryDom.placeholder.classList.add('active');
						}
					},
					// error: (err: object) => console.error(err),
					// complete: () => console.log('done')
				});
		} else {
			alert('empty');
		}
	});

	// ----- LOAD MORE PICTURES
	galleryDom.showMoreBtn.addEventListener('click', () => {
		if (images) {
			galleryDom.output.innerHTML = images.loadMoreImgsPerChunk();

			if (images.imgsPerChunk >= images.imgs.length) {
				galleryDom.showMoreBtn.style.display = 'none';
			}
		}
	});

	// ----- FULLSCREEN PICTURE

	galleryDom.output.addEventListener('click', (e: Event) => {
		if (e.target.className === 'gallery__pictures-picture') {
			fullscreenGallery(e.target.dataset.img_url, 'open');
		}
	});

	document.querySelector('.fullscreen').addEventListener('click', (e: Event): void => {
		// eslint-disable-next-line no-useless-return
		if (e.target !== e.currentTarget) return;
		fullscreenGallery('', 'close');
	});
};
