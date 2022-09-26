export enum RunnerEvents {
    Running = "run",
    Pause = "pause",
    Resume = "resume",
}

export type RunnerEventsArgs = {
    [RunnerEvents.Running]: undefined;
    [RunnerEvents.Pause]: undefined;
    [RunnerEvents.Resume]: undefined;
};
