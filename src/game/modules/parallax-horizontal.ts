import Vector2 from "../shared/vector2";
import Sprite from "./sprite";

export default class ParallaxHorizontal {
    public sprite?: HTMLImageElement;

    public get w() {
        return this.sprite?.width ?? 0;
    }
    public get h() {
        return this.sprite?.height ?? 0;
    }

    constructor(public speedModifier: number = 1) {}

    public async load(src: string) {
        this.sprite = await Sprite.load(src);
    }

    public update(speed: number, coord: Vector2) {
        // Esperar a sprite terminar de carregar
        if (!this.sprite) {
            return;
        }

        // Definir a velocidade do parallax
        coord.subX((speed / 3) * this.speedModifier);

        // Se a imagem sair da tela, reposicionar
        coord.modX(this.sprite.width);
    }

    public draw(ctx: CanvasRenderingContext2D, width: number, coord: Vector2) {
        if (!this.sprite) {
            return;
        }

        // Calculando a quantidade de imagen que terão que ser desenhada.
        // Desenhando uma ao lado da outra varias vezes para criar o efeito de parallax
        const size = Math.ceil(width / this.sprite.width) + 1;

        for (let i = 0; i < size; i++) {
            ctx.drawImage(this.sprite, coord.x + i * this.sprite.width, coord.y);
        }
    }
}
