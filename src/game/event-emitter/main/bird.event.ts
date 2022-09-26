export enum BirdEvents {
    Dead = "dead",
    Score = "score",
}

export type BirdEventsArgs = {
    [BirdEvents.Dead]: { id: string };
    [BirdEvents.Score]: { id: string };
};
