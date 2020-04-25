export const fullscreenGallery = (imgUrl: string, action: string): void => {
    // ----- DOM Elements -----
    const fullscreen: HTMLElement = document.querySelector('.fullscreen');
    const body: HTMLElement = document.querySelector('.fullscreen__body');
    const pic: HTMLElement = document.querySelector('.fullscreen__picture');
    const filter: HTMLElement = document.querySelector('.fullscreen__body-filter');

    switch (action) {
        case 'open':
            pic.style.backgroundImage = `url(${imgUrl})`;

            fullscreen.classList.add('active');
            setTimeout(() => {
                body.classList.add('active');
            }, 500);
            setTimeout(() => {
                pic.classList.add('active');
            }, 1600);
            break;
        case 'close':
            pic.classList.remove('active');
            setTimeout(() => {
                body.classList.remove('active');
            }, 500);
            setTimeout(() => {
                fullscreen.classList.remove('active');
                filter.classList.remove('active');
            }, 1000);
            break;
        case 'filter':
            filter.classList.toggle('active');
            break;
        default:
            break;
    }
};