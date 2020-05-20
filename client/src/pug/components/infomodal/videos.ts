import { VideoPlayer } from '../../../javascript/videoPlayer';

export const initVideo = (selector: string): object => {
    const vid: string = selector;
    // ----- HTMLElements -----
    const video: HTMLMediaElement = document.querySelector(`${vid} .video`);
    // ----- controls
    const backward: HTMLElement = document.querySelector(`${vid} #windBack`);
    const playPause: HTMLElement = document.querySelector(`${vid} #playPause`);
    const stop: HTMLElement = document.querySelector(`${vid} #stop`);
    const forward: HTMLElement = document.querySelector(`${vid} #windForward`);

    const timer: HTMLElement = document.querySelector(`${vid} .current-time`);
    const timerDuration: HTMLElement = document.querySelector(`${vid} .duration-time`);

    const rocketPath: HTMLElement = document.querySelector(`${vid} .rocket-path`);
    const rocket: HTMLElement = document.querySelector(`${vid} .rocket`);
    // ------------------------
    // ----- LOGIC -----
    video.removeAttribute('controls');

    const videoPlayer = new VideoPlayer(video);

    const reseter = (): void => {
        forward.classList.remove('active');
        backward.classList.remove('active');
        videoPlayer.resetBwdInterval();
        videoPlayer.resetFwdInterval();
    };

    // ----- EVENTS -----
    video.addEventListener('mouseover', () => {
        if (!videoPlayer.media.readyState) return;
        const durMinutes = Math.floor(videoPlayer.media.duration / 60);
        const durSeconds = Math.floor(videoPlayer.media.duration - durMinutes * 60);
        const durMinuteVal = durMinutes < 10 ? '0' + durMinutes : durMinutes;
        const durSecondVal = durSeconds < 10 ? '0' + durSeconds : durSeconds;

        timerDuration.innerText = `${durMinuteVal}:${durSecondVal}`;
    });

    playPause.addEventListener('click', () => {
        reseter();
        videoPlayer.playPauseMedia();
        playPause.classList.toggle('active');
    });
    stop.addEventListener('click', () => {
        reseter();
        videoPlayer.stopMedia();
        playPause.classList.remove('active');
    });
    backward.addEventListener('click', () => {
        videoPlayer.resetFwdInterval();
        forward.classList.remove('active');
        playPause.classList.remove('active');

        if (backward.classList.contains('active')) {
            backward.classList.remove('active');
            videoPlayer.resetBwdInterval();
            videoPlayer.media.play();
            playPause.classList.add('active');
        } else {
            backward.classList.add('active');
            videoPlayer.media.pause();
            videoPlayer.setBwdInterval(videoPlayer.windBackward.bind(videoPlayer), 200);
        }
    });
    forward.addEventListener('click', () => {
        videoPlayer.resetBwdInterval();
        backward.classList.remove('active');
        playPause.classList.remove('active');

        if (forward.classList.contains('active')) {
            forward.classList.remove('active');
            videoPlayer.resetFwdInterval();
            videoPlayer.media.play();
            playPause.classList.add('active');
        } else {
            forward.classList.add('active');
            videoPlayer.media.pause();
            videoPlayer.setFwdInterval(videoPlayer.windForward.bind(videoPlayer), 200);
        }
    });
    // ----- VIDEO EVENTS -----
    videoPlayer.media.addEventListener('ended', () => {
        reseter();
        videoPlayer.stopMedia();
        playPause.classList.remove('active');
    });
    videoPlayer.media.addEventListener('timeupdate', () => {
        const minutes: number = Math.floor(videoPlayer.media.currentTime / 60);
        const seconds: number = Math.floor(videoPlayer.media.currentTime - minutes * 60);
        const minuteValue: string | number = minutes < 10 ? '0' + minutes : minutes;
        const secondValue: string | number = seconds < 10 ? '0' + seconds : seconds;
        timer.innerText = `${minuteValue}:${secondValue}`;

        const barLength: number = rocketPath.clientWidth * (videoPlayer.media.currentTime / videoPlayer.media.duration);
        rocket.style.left = `${barLength}px`;
    });
    
    return {
        player: videoPlayer,
        playBtn: playPause
    };
};