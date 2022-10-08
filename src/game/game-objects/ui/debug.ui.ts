import Bird from "../bird";
import GameObject from "../game-object";
import GroundObstacle from "../obstacles/ground.obstacle";
import PipesSliderObstacle from "../obstacles/pipes-slider.obstacle";

export default class DebugUI extends GameObject {
    public readonly name: string = "debug-ui";

    public zIndex: number = 1000;

    public get ground(): GroundObstacle {
        return this.find<GroundObstacle>("ground-obstacle")[0];
    }
    public get birds(): Bird[] {
        return this.find<Bird>("bird", false);
    }
    public get pipesSlider(): PipesSliderObstacle {
        return this.find<PipesSliderObstacle>("pipes-slider-obstacle", false)[0];
    }

    public create(): void {
        this.game.debug = true;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.ground.collision.draw(ctx);

        for (const bird of this.birds) {
            bird.collision.draw(ctx);
        }

        for (const pipe of this.pipesSlider.pipes) {
            pipe.up.collision.draw(ctx);
            pipe.down.collision.draw(ctx);
        }

        this.drawFPS(ctx);
    }

    private drawFPS(ctx: CanvasRenderingContext2D): void {
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "white";

        const text = `FPS: ${this.game.renderer.fps.toFixed()}`;
        const ascent = ctx.measureText(text).actualBoundingBoxAscent;

        ctx.fillText(text, this.x, this.y + ascent);
    }
}
