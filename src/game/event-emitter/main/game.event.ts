export enum GameEvents {
    Paused = "pause",
    Running = "run",
    GetReady = "resume",
    GameOver = "over",
}

export type GameEventsArgs = {
    [GameEvents.Paused]: undefined;
    [GameEvents.GetReady]: undefined;
    [GameEvents.Running]: undefined;
    [GameEvents.GameOver]: undefined;
};
