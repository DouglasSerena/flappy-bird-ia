import { BirdEvents } from "./main/bird.event";
import { GameEvents } from "./main/game.event";
import { RendererEvents } from "./main/renderer.event";
import { RunnerEvents } from "./main/runner.event";
import { ObjectEvents } from "./main/object.event";

export type Events = RunnerEvents | RendererEvents | GameEvents | BirdEvents | ObjectEvents;

export type EventsHandle = (data: any) => void;

export default class Emitter {
    private static events: Map<Events, EventsHandle[]> = new Map();

    private constructor() {}

    public static on(event: Events, handle: EventsHandle) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        this.events.get(event)!.push(handle);
    }

    public static emit(event: Events, data: any) {
        const handles = this.events.get(event);

        if (handles) {
            for (const handle of handles) {
                handle(data);
            }
        }
    }
}
