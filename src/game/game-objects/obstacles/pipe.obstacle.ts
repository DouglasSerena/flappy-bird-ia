import CollisionRect from "../../modules/collision/collision-rect";
import Sprite from "../../modules/sprite";
import GameObject from "../game-object";

export default class PipeObstacle extends GameObject {
    public readonly name: string = "pipe-obstacle";

    public zIndex: number = 1;
    public readonly sprite = new Sprite();
    public readonly collision = new CollisionRect(this);

    public get w() {
        return this.sprite.w;
    }
    public get h() {
        return this.sprite.h;
    }

    constructor(public type: "up" | "down") {
        super();
    }

    public async create(): Promise<void> {
        this.sprite.load(`/assets/sprites/pipe/pixel-green-${this.type}.png`);
    }

    public update(): void {
        if (this.x + this.w < 0) {
            this.game.remove(this);
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx, this.coord);
    }
}
