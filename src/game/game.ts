import { GameEvents } from "./event-emitter/main/game.event";
import Emitter from "./event-emitter/emitter";
import Renderer from "./renderer";
import Runner from "./runner";
import GameObject from "./game-objects/game-object";
import  Bird, { BirdStatus } from "./game-objects/bird";
import { BirdEvents } from "./event-emitter/main/bird.event";
import { debounce } from "lodash";

export enum GameStatus {
    GetReady,
    GameOver,
    Transition,
    Running,
    Paused,
}

export default class Game {
    public status: GameStatus = GameStatus.GetReady;

    public runner: Runner = new Runner();
    public renderer: Renderer = new Renderer();

    public objects: GameObject[] = [];

    public score: number = 0;
    public speed: number = 2;

    constructor(public debug: boolean = true) {
        GameObject.game = this; // Este é um hack(igual gambiara) para contornar a dependência circular

        this.runner.tick((delta) => {
            // Se o pássaro morrer, o jogo acaba
            if (!this.findByName<Bird>("bird").some((bird) => bird.status === BirdStatus.Alive)) {
                this.gameOver();
            }

            for (const object of this.objects) {
                object.update?.(delta);
            }
        });

        this.renderer.tick((ctx) => {
            for (const object of this.objects) {
                if (object.draw) {
                    ctx.save();
                    object.draw(ctx);
                    ctx.restore();
                }
            }
        });

        Emitter.on(
            BirdEvents.Score,
            debounce(() => {
                this.score++;
            })
        );
    }

    public run() {
        this.start();
    }

    public start() {
        if (this.status === GameStatus.Running) {
            return;
        }

        this.status = GameStatus.Running;
        Emitter.emit(GameEvents.Running, undefined);
    }

    public ready() {
        if (this.status === GameStatus.GetReady) {
            return;
        }

        this.status = GameStatus.GetReady;
        Emitter.emit(GameEvents.GetReady, undefined);
    }

    public resume() {
        if (this.status !== GameStatus.Paused) {
            return;
        }

        this.status = GameStatus.Running;
        Emitter.emit(GameEvents.Running, undefined);
    }

    public pause() {
        if (this.status === GameStatus.Paused) {
            return;
        }

        this.status = GameStatus.Paused;
        Emitter.emit(GameEvents.Paused, undefined);
    }

    public gameOver() {
        if (this.status === GameStatus.GameOver) {
            return;
        }

        this.score = 0;
        this.status = GameStatus.GameOver;
        Emitter.emit(GameEvents.GameOver, undefined);
    }

    public add(gameObject: GameObject) {
        if (this.contains(gameObject)) {
            return;
        }

        this.objects.push(gameObject);
        this.objects.sort((a, b) => a.zIndex - b.zIndex);

        gameObject.create?.();
    }

    public remove(gameObject: GameObject) {
        const index = this.objects.findIndex((object) => object.id === gameObject.id);

        if (index > -1) {
            this.objects.splice(index, 1);
            gameObject.destroy?.();
        }
    }

    public contains(gameObject: GameObject) {
        return this.findById(gameObject.id) !== undefined;
    }

    public findById<T extends GameObject>(id: string): T {
        return this.objects.find((object) => object.id === id) as T;
    }

    public findByName<T extends GameObject>(name: string): T[] {
        return this.objects.filter((object) => object.name === name) as T[];
    }
}
