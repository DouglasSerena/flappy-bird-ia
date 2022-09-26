import GameObject from "../game-object";
import { GameStatus } from "../../game";
import { PipesObstacle } from "./pipes.obstacle";
import Vector2 from "../../shared/vector2";

export class PipesSliderObstacle extends GameObject {
    public readonly name: string = "pipes-slider-obstacle";

    public zIndex: number = 1;
    public pipes: PipesObstacle[] = [];

    public get first(): PipesObstacle {
        return this.pipes[0];
    }
    public get last(): PipesObstacle {
        return this.pipes[this.pipes.length - 1];
    }

    public create(): void {}

    public update(): void {
        if (this.game.status === GameStatus.Paused) {
            return;
        }

        // Não criar novos canos se o jogo não estiver começado
        if (this.game.status === GameStatus.GameOver || this.game.status === GameStatus.GetReady) {
            // Remover todos os canos caso o jogo não esteja mais rodando
            if (this.pipes.length > 0) {
                this.pipes = [];
            }

            return;
        }

        // Mover os canos para a esquerda
        for (const pipe of this.pipes) {
            pipe.coord.subX(this.game.speed);

            if (pipe.x + pipe.w < 0) {
                this.remove(pipe);
            } else {
                pipe.update();
            }
        }

        // Adicionar um novo cano
        if (this.pipes.length === 0 || this.last.coord.x < this.game.renderer.w - 200) {
            const x = this.game.renderer.w;
            const y = (this.game.renderer.h - 112) * Math.random();

            const pipe = new PipesObstacle(new Vector2(x, y));

            if (this.last) {
                this.last.next = pipe;
            }

            this.pipes.push(pipe);
            this.last.create();
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (const pipe of this.pipes) {
            pipe.draw(ctx);
        }
    }

    public remove(pipe: PipesObstacle): void {
        const index = this.pipes.indexOf(pipe);

        if (index > -1) {
            this.pipes.splice(index, 1);
        }
    }
}
