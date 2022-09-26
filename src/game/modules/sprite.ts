import { Coord } from "../shared/vector2";

export default class Sprite {
    public sprite!: HTMLImageElement;

    public get w() {
        return this.sprite?.width ?? 0;
    }
    public get h() {
        return this.sprite?.height ?? 0;
    }

    constructor() {}

    public async load(src: string) {
        this.sprite = await Sprite.load(src);
    }

    public draw(ctx: CanvasRenderingContext2D, coord: Coord) {
        if (!this.sprite) {
            return;
        }

        ctx.drawImage(this.sprite, coord.x, coord.y, this.sprite.width, this.sprite.height);
    }

    public static async chuck(sources: string[]): Promise<HTMLImageElement[]> {
        return Promise.all(sources.map((source) => Sprite.load(source)));
    }

    public static load(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => resolve(image);
            image.onerror = () => reject();

            image.src = src;
        });
    }
}
