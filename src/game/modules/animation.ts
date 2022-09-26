import { Coord } from "../shared/vector2";
import Sprite from "./sprite";

export default class Animation {
    public sprites: HTMLImageElement[] = [];

    public frame: number = 0;
    public frames: number = 0;
    public frameRate: number = 0;

    public get w() {
        return this.sprite?.width ?? 0;
    }
    public get h() {
        return this.sprite?.height ?? 0;
    }

    public get sprite() {
        return this.sprites[this.frame];
    }

    constructor(frameRate: number) {
        this.frameRate = frameRate;
    }

    public async load(sources: string[]) {
        this.sprites = await Sprite.chuck(sources);
    }

    public update(delta: number) {
        this.frames += delta; // Atualizar o frame
        this.frame = Math.floor(this.frames / this.frameRate) % this.sprites.length; // Se o frame atual for maior que o frame rate
    }

    public draw(ctx: CanvasRenderingContext2D, coord: Coord) {
        if (!this.sprite) {
            return;
        }

        ctx.drawImage(this.sprite, coord.x, coord.y, this.sprite.width, this.sprite.height);
    }
}
