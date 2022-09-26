import { GameStatus } from "../../game";
import Sprite from "../../modules/sprite";
import GameObject from "../game-object";

export default class ScoreUI extends GameObject {
    public readonly name: string = "score-ui";

    public zIndex: number = 1000;

    public sprites: HTMLImageElement[] = [];

    public async create(): Promise<void> {
        this.sprites = await Sprite.chuck([
            "/assets/sprites/ui/numbers/0.png",
            "/assets/sprites/ui/numbers/1.png",
            "/assets/sprites/ui/numbers/2.png",
            "/assets/sprites/ui/numbers/3.png",
            "/assets/sprites/ui/numbers/4.png",
            "/assets/sprites/ui/numbers/5.png",
            "/assets/sprites/ui/numbers/6.png",
            "/assets/sprites/ui/numbers/7.png",
            "/assets/sprites/ui/numbers/8.png",
            "/assets/sprites/ui/numbers/9.png",
        ]);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.game.status !== GameStatus.Running && this.game.status !== GameStatus.Paused) {
            return;
        }

        const numbers = `${this.game.score}`.split("").map((n) => parseInt(n, 10));

        const sprites = numbers.map((n) => this.sprites[n]);
        const width = sprites.reduce((a, b) => a + b.width, 0);

        // Refazer essa parte para ficar mais legível
        let widthLetter = width;
        let i = sprites.length - 1;
        for (; i >= 0; i--) {
            const sprite = sprites[i];

            widthLetter -= sprite.width;
            const x = this.game.renderer.w / 2 + widthLetter - width / 2;
            ctx.drawImage(sprite, x, 50);
        }
    }
}
