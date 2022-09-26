import { ICollision } from "../../modules/collision/collision";
import Vector2 from "../../shared/vector2";
import GameObject from "../game-object";
import { PipeObstacle } from "./pipe.obstacle";

export class PipesObstacle extends GameObject {
    public readonly name: string = "pipes-obstacle";

    public gap: number = 100;
    public zIndex: number = 1;
    public position: number = 0;

    public up: PipeObstacle;
    public down: PipeObstacle;
    public next: PipesObstacle | null = null;

    public get w() {
        return this.up.w;
    }
    public get h() {
        return this.up.h + this.down.h + this.gap;
    }

    constructor(coord: Vector2) {
        super(coord);

        // As propriedades up e down estão invertidas, porque o cano de baixo é o que fica em cima e vice-versa
        this.up = new PipeObstacle("down");
        this.down = new PipeObstacle("up");

        this.update(); // Atualizar a posição dos canos filhos para que eles sejam desenhados na posição correta
    }

    public create(): void {
        this.up.create();
        this.down.create();
    }

    public update(): void {
        const x = this.x;

        // Não deixar o cano sair da tela
        const y = Math.max(Math.min(this.y, this.game.renderer.h - this.gap - 117), 28);

        // Atualizar a posição do cano de cima
        this.up.coord.x = x;
        this.up.coord.y = y - this.up.h;

        // Atualizar a posição do cano de baixo
        this.down.coord.x = x;
        this.down.coord.y = y + this.gap;

        // Atualizar os canos
        this.up.update();
        this.down.update();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.up.draw(ctx);
        this.down.draw(ctx);
    }

    public checkCollision(collision: ICollision): boolean {
        return (
            this.up.collision.checkCollision(collision) ||
            this.down.collision.checkCollision(collision)
        );
    }
}
