import Emitter from "./event-emitter/emitter";
import { RendererEvents } from "./event-emitter/main/renderer.event";

export type RendererTick = { handle: RendererTickHandle };
export type RendererTickHandle = (ctx: CanvasRenderingContext2D) => void;

export default class Renderer {
    private animationFrame: number = 0;
    private ticks: RendererTick[] = [];
    private oldTime: number = 0;

    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public fps: number = 60;
    public time: number = performance.now();

    public get w() {
        return this.canvas.width;
    }
    public get h() {
        return this.canvas.height;
    }

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;

        this.resize(720, 414);
    }

    public start(element: HTMLElement) {
        element.appendChild(this.canvas);

        this.running();
    }

    public running() {
        if (this.animationFrame) {
            return;
        }

        Emitter.emit(RendererEvents.Running, undefined);

        const loop = (time: number) => {
            this.time = time - this.oldTime;
            this.fps = 1000 / this.time;
            this.oldTime = time;

            for (const tick of this.ticks) {
                tick.handle(this.ctx);
            }

            this.animationFrame = requestAnimationFrame(loop);
        };
        loop(performance.now());
    }

    public pause() {
        if (!this.animationFrame) {
            return;
        }

        cancelAnimationFrame(this.animationFrame);
        Emitter.emit(RendererEvents.Pause, undefined);
    }

    public resume() {
        if (this.animationFrame) {
            return;
        }

        Emitter.emit(RendererEvents.Resume, undefined);
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    public resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public tick(handle: RendererTickHandle) {
        this.ticks.push({ handle });
    }
}
