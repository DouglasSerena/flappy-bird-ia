import { GameStatus } from "../../game";
import CollisionRect from "../../modules/collision/collision-rect";
import ParallaxHorizontal from "../../modules/parallax-horizontal";
import GameObject from "../game-object";

export class GroundObstacle extends GameObject {
    public readonly name: string = "ground-obstacle";

    public zIndex: number = 2;
    public readonly collision = new CollisionRect(this);
    public readonly parallax = new ParallaxHorizontal(0.5);

    public get w() {
        return this.game.renderer.w + this.parallax.w;
    }
    public get h() {
        return this.parallax.h;
    }

    public async create(): Promise<void> {
        this.parallax.load("/assets/sprites/ground.png");
    }

    public update(): void {
        if (this.game.status === GameStatus.Paused) {
            return;
        }

        this.coord.y = this.game.renderer.h - this.parallax.h + 25;

        this.parallax.update(this.game.speed, this.coord);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.parallax.draw(ctx, this.game.renderer.w, this.coord);
    }
}
