import Emitter from "../event-emitter/emitter";
import { BirdEvents } from "../event-emitter/main/bird.event";
import { GameStatus } from "../game";
import Animation from "../modules/animation";
import CollisionCircle from "../modules/collision/collision-circle";
import Physics, { Gravity } from "../modules/physics";
import Vector2 from "../shared/vector2";
import GameObject from "./game-object";
import GroundObstacle from "./obstacles/ground.obstacle";
import PipesSliderObstacle from "./obstacles/pipes-slider.obstacle";
import PipesObstacle from "./obstacles/pipes.obstacle";

export enum BirdStatus {
    Alive,
    Dead,
}

export type BirdColor = "blue" | "red" | "yellow" | "orange";
export const birdColors: BirdColor[] = ["blue", "red", "yellow", "orange"];

export default class Bird extends GameObject {
    public name: string = "bird";

    public score: number = 0;
    public radian: number = 0;
    public thrust: number = 3.6;
    public status: BirdStatus = BirdStatus.Alive;
    public color: BirdColor = birdColors[Math.floor(Math.random() * birdColors.length)];
    public pipes: PipesObstacle | null = null;

    public readonly velocity: Vector2 = new Vector2(0, 0);
    public readonly animation: Animation = new Animation(60);
    public readonly physics: Physics = new Physics(this.game.runner);
    public readonly collision: CollisionCircle = new CollisionCircle(this);

    public get ground(): GroundObstacle {
        return this.find<GroundObstacle>("ground-obstacle")[0];
    }
    public get pipesSlider(): PipesSliderObstacle {
        return this.find<PipesSliderObstacle>("pipes-slider-obstacle", false)[0];
    }

    public get w(): number {
        return this.r * 2;
    }
    public get h(): number {
        return this.animation.h;
    }

    // O radio do pássaro
    public get r(): number {
        return this.h / 2;
    }

    constructor(color?: BirdColor) {
        super();

        this.color = color ?? this.color;
    }

    public async create(): Promise<void> {
        this.coord.x = 50;
        this.coord.y = this.game.renderer.h / 4;

        await this.animation.load([
            `/assets/sprites/birds/${this.color}/0.png`,
            `/assets/sprites/birds/${this.color}/1.png`,
            `/assets/sprites/birds/${this.color}/2.png`,
            `/assets/sprites/birds/${this.color}/1.png`,
        ]);
    }

    public update(delta: number): void {
        this.animation.update(delta);

        // Esperar o jogo começar deixando o pássaro parado caso ele esteja vivo
        if (this.game.status !== GameStatus.Running && this.status === BirdStatus.Alive) {
            this.animation.frameRate = 120;
            return;
        }
        this.animation.frameRate = 60; // Voltar a velocidade normal

        // Caso esteja morto, fazer o pássaro ir para fora da tela para ser destroçado kkkkk
        if (this.status === BirdStatus.Dead) {
            this.coord.subX(this.game.speed);

            if (this.coord.x < -this.w) {
                // Remover o pássaro do jogo quando ele sair da tela
                this.game.remove(this);
            }

            return;
        }

        if (!this.pipes && this.pipesSlider.first) {
            this.pipes = this.pipesSlider.first;
        }

        if (this.pipes) {
            if (this.pipes.checkCollision(this.collision)) {
                return this.kill();
            }

            if (this.x - this.pipes.w > this.pipes.x) {
                this.pipes = this.pipes.next;
                Emitter.emit(BirdEvents.Score, { id: this.id });
            }
        }

        // Aplicar gravidade no eixo y
        this.velocity.addY(this.physics.applyGravity(Gravity.Earth));

        // Aplicar velocidade no eixo y
        this.coord.addY(this.velocity.y);

        // Não deixar o pássaro sair da tela
        this.coord.clampY(0, this.game.renderer.h - this.r);
        this.coord.clampX(0, this.game.renderer.w - this.r);

        if (this.collision.checkCollision(this.ground.collision)) {
            this.coord.y = this.ground.y - this.r;

            if (this.status === BirdStatus.Alive) {
                this.kill();
            }

            return;
        }

        // Rotacionar o pássaro caso esteja subindo
        if (this.velocity.y > 0) {
            const degrees = Math.min(90, (90 * this.velocity.y) / (this.thrust * 2));

            this.radian = (degrees * Math.PI) / 180; // Convertendo graus para radianos
        }

        // Rotacionar o pássaro caso esteja caindo
        if (this.velocity.y <= 0) {
            const degrees = Math.max(-25, (-25 * this.velocity.y) / (-1 * this.thrust));

            this.radian = (degrees * Math.PI) / 180; // Convertendo graus para radianos
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (!this.animation.sprite) {
            return;
        }

        const x = this.coord.x;
        const y = this.coord.y;

        ctx.translate(x, y);
        ctx.rotate(this.radian);
        ctx.drawImage(this.animation.sprite, -this.r - 4, -this.r); // O -4 é para centralizar o pássaro
    }

    public flap(): void {
        this.velocity.y = -this.thrust; // Reseta a velocidade e aplica o impulso
    }

    public kill(): void {
        if (this.status === BirdStatus.Dead) {
            return;
        }

        // Salvar o score do pássaro
        this.score = this.game.score;

        // Mudar o status do pássaro para morto e notificar o jogo
        this.status = BirdStatus.Dead;
        Emitter.emit(BirdEvents.Dead, { id: this.id });
    }
}
