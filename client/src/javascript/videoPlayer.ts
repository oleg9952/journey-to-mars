export interface VidPlayerInterf {
    intervalFwd: any;
    intervalBwd: any;
    media: HTMLVideoElement;
    playPauseMedia: () => void;
    stopMedia: () => void;
    windBackward: () => void;
    windForward: () => void;
    resetBwdInterval: () => void;
    resetFwdInterval: () => void;
    setBwdInterval: () => void;
    setFwdInterval: () => void;
}

export class VideoPlayer {
    intervalFwd: any;

    intervalBwd: any;

    constructor(
        public media: HTMLMediaElement
    ) {}

    playPauseMedia(): void {
        if (this.media.paused) {
            this.media.play();
        } else {
            this.media.pause();
        }
    }

    stopMedia(): void {
        this.media.pause();
        this.media.currentTime = 0;
    }

    windBackward(): void {
        if (this.media.currentTime <= 5) {
            this.resetBwdInterval();
            this.stopMedia();
        } else {    
            this.media.currentTime -= 3;
        }
    }

    windForward(): void {
        if (this.media.currentTime >= this.media.duration - 5) {
            this.resetFwdInterval();
            this.stopMedia();
        } else {
            this.media.currentTime += 3;
        }
    }

    resetBwdInterval(): void {
        clearInterval(this.intervalBwd);
        this.intervalBwd = null;
    }

    resetFwdInterval(): void {
        clearInterval(this.intervalFwd);
        this.intervalFwd = null;
    }

    setBwdInterval(callback: Function, ms: number): void {
        this.intervalBwd = setInterval(() => {
            callback();
        }, ms);
    }

    setFwdInterval(callback: Function, ms: number): void {
        this.intervalFwd = setInterval(() => {
            callback();
        }, ms);
    }
}