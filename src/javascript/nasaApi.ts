import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import API_KEY from '../../api_key';

export const nasaApi = (sol: string, filter: string) => {
    // eslint-disable-next-line max-len
    return fromFetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&${filter === 'none' ? '' : `&camera=${filter}&`}page=1&api_key=${API_KEY}`)
        .pipe(
            switchMap((resp: object) => {
                if (resp.ok) {
                    return resp.json();
                } 
                    return of({ error: true, message: `Error: ${resp.status}` });
            }),
            map((data: object) => {
                return data.photos.map((pic: object) => `
                    <div class="gallery__pictures-picture"
                        style="background-image: url(${pic.img_src})"
                    ></div>
                `).join('');
            }),
            catchError((error: object) => {
                return of({ error: true, message: error.message });
            })
        );
};