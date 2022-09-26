import Emitter from "./event-emitter/emitter";
import { RunnerEvents } from "./event-emitter/main/runner.event";

export type RunnerTick = { handle: (delta: number) => void };
export type RunnerTickHandle = (delta: number) => void;

export default class Runner {
    private animationFrame: number = 0;
    private ticks: RunnerTick[] = [];
    private oldTime: number = 0;

    public delta: number = 0;

    constructor() {}

    public start() {
        this.running();
    }

    public running() {
        if (this.animationFrame) {
            return;
        }

        Emitter.emit(RunnerEvents.Running, undefined);

        const loop = (time: number) => {
            this.delta = time - this.oldTime;
            this.oldTime = time;

            for (const tick of this.ticks) {
                tick.handle(this.delta);
            }

            requestAnimationFrame(loop);
        };
        loop(performance.now());
    }

    public pause() {
        if (!this.animationFrame) {
            return;
        }

        cancelAnimationFrame(this.animationFrame);
        Emitter.emit(RunnerEvents.Pause, undefined);
    }

    public resume() {
        if (this.animationFrame) {
            return;
        }

        Emitter.emit(RunnerEvents.Resume, undefined);
    }

    public tick(handle: RunnerTickHandle) {
        this.ticks.push({ handle });
    }
}
