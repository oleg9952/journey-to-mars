import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import API_KEY from '../../api_key';

export interface RespInterf {
    ok: string;
    status: string;
    json: () => Array<any>;
}
export interface DataInterf {
    photos: Array<object>;
}
export interface PicInterf {
    img_src: string;
}

export const nasaApi = (sol: string, filter: string) => {
    // eslint-disable-next-line max-len
    return fromFetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&${filter === 'none' ? '' : `&camera=${filter}&`}&api_key=${API_KEY}`)
        .pipe(
            switchMap((resp: RespInterf) => {
                if (resp.ok) {
                    return resp.json();
                } 
                    return of({ error: true, message: `Error: ${resp.status}` });
            }),
            map((data: DataInterf) => {
                return data.photos.map((pic: PicInterf) => `
                    <div class="gallery__pictures-picture"
                        style="background-image: url(${pic.img_src})"
                        data-img_url="${pic.img_src}"
                    ></div>
                `);
            }),
            catchError((error: object) => {
                return of({ error: true, message: (<{message: string}>error).message });
            })
        );
};
// eslint-disable-next-line max-len
// return fromFetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&${filter === 'none' ? '' : `&camera=${filter}&`}page=1&api_key=${API_KEY}`)