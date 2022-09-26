import { GameStatus } from "../../game";
import ParallaxHorizontal from "../../modules/parallax-horizontal";
import vector2 from "../../shared/vector2";
import GameObject from "../game-object";
import { GroundObstacle } from "../obstacles/ground.obstacle";

export class BackgroundLayer extends GameObject {
    public name: string = "background-layer";

    public get ground(): GroundObstacle {
        return this.find<GroundObstacle>("ground-obstacle")[0];
    }

    public zIndex: number = -1;
    public readonly coord: vector2 = new vector2(0, 0);
    public readonly parallax = new ParallaxHorizontal(2);

    public async create(): Promise<void> {
        this.parallax.load("/assets/sprites/backgrounds/night.png");
    }

    public update(): void {
        if (this.game.status === GameStatus.Paused) {
            return;
        }

        // Ajusta a posição do background para que ele fique sempre acima do chão
        this.coord.y = (this.ground.coord.y - this.parallax.h) / 2;
        this.parallax.update(this.game.speed, this.coord);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.parallax.draw(ctx, this.game.renderer.w, this.coord);
    }
}
