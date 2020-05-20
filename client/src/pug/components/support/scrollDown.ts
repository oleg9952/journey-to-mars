export const scrollDown = (target: HTMLElement): void => {
    setTimeout(() => {
        target.current.scroll({
            top: target.current.scrollHeight,
            behavior: 'smooth'
        });
    }, 0);
};