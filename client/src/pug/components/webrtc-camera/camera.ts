/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { profileDom } from '../../../javascript/dom_elements';
import { storage, firestore } from '../../../../fb_config';
import { getUserFromStorage } from '../../../javascript/user';
import { notification } from '../notification/notification';

const cameraModal: HTMLElement = document.querySelector('.camera');
const body: HTMLElement = document.querySelector('.camera__body');
const video: HTMLElement = document.getElementById('camera__video');
const canvas: HTMLElement = document.getElementById('camera__canvas');
const result: HTMLElement = document.querySelector('.camera__result');
const flash: HTMLElement = document.querySelector('.camera__flash');

const takePic: HTMLElement = document.getElementById('take__picture');
const setPic: HTMLElement = document.getElementById('set__picture');

class Camera {
    constructor(
        public stream: any = null,
        public streaming: boolean = false,
        public width: number = body.offsetWidth,
        public height: number = 0
    ) {}
    
    async openCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            video.srcObject = this.stream;
            video.play();
        } catch (error) {
            console.error(`Error accessing camera: ${error}`);
        }
    }

    closeCamera(): void {
        if (!this.stream) return;
        video.pause();
        video.srcObject = null;
        this.stream.getTracks()[0].stop();
        this.stream = null;
        this.streaming = false;
    }

    takePicture(): void {
        const context = canvas.getContext('2d');
        if (this.width && this.height) {
            canvas.width = this.width;
            canvas.height = this.height;
            context.drawImage(video, 0, 0, this.width, this.height);
            
            const data = canvas.toDataURL('image/png');
            result.setAttribute('src', data);
            result.classList.add('active');
            this.closeCamera();
        }
    }

    clearPicture(): void {
        const context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const data = canvas.toDataURL('image/png');
        result.setAttribute('src', data);
        result.classList.remove('active');
    }

    setPicture(): void {
        if (this.streaming) return;
        const { uid } = getUserFromStorage();
        canvas.toBlob((blob: Blob) => {
            storage.ref().child(`profilePictures/${uid}.png`)
                .put(blob)
                .then(() => {
                    storage.ref().child(`profilePictures/${uid}.png`)
                        .getDownloadURL()
                        .then((url: any) => {
                            this.updateProfile(url);
                        })
                        .catch((err: object) => console.error(`Error getting link to photo: ${err}`));
                })
                .catch((err: object) => console.error(`Error uploading photo: ${err}`));
        });
    }

    updateProfile(url: string): void {
        const { uid } = getUserFromStorage();
        firestore.collection('users').doc(uid)
            .update({
                profile_img: url
            })
            .then(() => {
                notification({
                    code: 'profile_photo',
                    message: 'Your photo has been updated.'
                });
                profileDom.userPic.style.backgroundImage = `url(${url})`;
                profileDom.userPic.innerText = '';
            })
            .catch((err: object) => console.error(`Error updating profile img: ${err}`));
    }
}

interface CameraInterf {
    stream: any;
    streaming: boolean;
    width: number;
    height: number;
    openCamera: () => void;
    closeCamera: () => void;
    takePicture: () => void;
    clearPicture: () => void;
    setPicture: () => void;
}

export const cameraFunc = () => {
    const camera: CameraInterf = new Camera();

    // calc size of canvas according to the size of stream
    video.addEventListener('canplay', () => {
        if (!camera.streaming) {
            camera.height = video.videoHeight / (video.videoWidth / camera.width);
            
            if (isNaN(camera.height)) {
                camera.height = camera.width / (4 / 3);
            }
            
            video.setAttribute('width', camera.width.toString());
            video.setAttribute('height', camera.height.toString());
            canvas.setAttribute('width', camera.width.toString());
            canvas.setAttribute('height', camera.height.toString());
            camera.streaming = true;
        }
    }, false);

    (profileDom as {userPic: HTMLElement}).userPic.addEventListener('click', () => {
        cameraModal.classList.add('active');
        camera.openCamera();
    });
    cameraModal.addEventListener('click', (e: Event) => {
        if (e.target !== e.currentTarget) return;
        cameraModal.classList.remove('active');
        camera.closeCamera();
        camera.clearPicture();
        takePic.classList.remove('active');
    });
    takePic.addEventListener('click', (e: Event) => {
        if (!(e.currentTarget as HTMLElement).className.includes('active')) {
            flash.classList.add('active');
            setTimeout(() => {
                flash.classList.remove('active');
            }, 200);
            setTimeout(() => {
                camera.takePicture();
            }, 400);
            takePic.classList.add('active');
        } else {
            camera.clearPicture();
            camera.openCamera();
            takePic.classList.remove('active');
        }
    });
    setPic.addEventListener('click', () => {
        camera.setPicture();
    });
};