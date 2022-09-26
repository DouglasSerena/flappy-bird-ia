import { GameStatus } from "../../game";
import Animation from "../../modules/animation";
import GameObject from "../game-object";

export default class TapUI extends GameObject {
    public readonly name: string = "tap-ui";

    public zIndex: number = 1000;

    public readonly animation = new Animation(240);

    public async create(): Promise<void> {
        this.animation.load(["/assets/sprites/ui/tap/0.png", "/assets/sprites/ui/tap/1.png"]);
    }

    public update(delta: number) {
        this.coord.x = (this.game.renderer.w - this.animation.w) / 2;
        this.coord.y = 320 - this.animation.h;

        this.animation.update(delta);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.game.status === GameStatus.GetReady || this.game.status === GameStatus.GameOver) {
            this.animation.draw(ctx, this.coord);
        }
    }
}
