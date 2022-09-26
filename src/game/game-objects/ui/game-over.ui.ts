import { GameStatus } from "../../game";
import Sprite from "../../modules/sprite";
import GameObject from "../game-object";

export default class GameOverUI extends GameObject {
    public readonly name: string = "game-over-ui";

    public zIndex: number = 1000;

    public readonly sprite = new Sprite();

    public async create(): Promise<void> {
        this.sprite.load("/assets/sprites/ui/game-over.png");
    }

    public update(delta: number) {
        this.coord.y = (this.game.renderer.h - this.sprite.h) / 2;
        this.coord.x = (this.game.renderer.w - this.sprite.w) / 2;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.game.status === GameStatus.GameOver) {
            this.sprite.draw(ctx, this.coord);
        }
    }
}
