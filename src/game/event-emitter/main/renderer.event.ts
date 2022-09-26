export enum RendererEvents {
    Running = "run",
    Pause = "pause",
    Resume = "resume",
}

export type RendererEventsArgs = {
    [RendererEvents.Running]: undefined;
    [RendererEvents.Pause]: undefined;
    [RendererEvents.Resume]: undefined;
};
