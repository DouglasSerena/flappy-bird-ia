export enum ObjectEvents {
    Destroy = "destroy",
}

export type ObjectEventsArgs = {
    [ObjectEvents.Destroy]: { id: string };
};
