export class LazyLoader {
    constructor(
        public imgs: Array<string>,
        public currentChunk: number = 1,
        public imgsPerChunk: number = 9,
        public lastImg: number = currentChunk * imgsPerChunk,
        public firstImg: number = lastImg - imgsPerChunk
    ) {}

    getImgsPerChunk(): string {
        return this.imgs.slice(this.firstImg, this.lastImg).join('');
    }

    loadMoreImgsPerChunk(): string {
        this.imgsPerChunk += 9;
        this.lastImg = this.currentChunk * this.imgsPerChunk;
        this.firstImg = this.lastImg - this.imgsPerChunk;

        return this.getImgsPerChunk();
    }
}