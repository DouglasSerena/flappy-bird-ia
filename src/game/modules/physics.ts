import Runner from "../runner";

export enum Gravity {
    None = 0,
    Earth = 9.81,
    Moon = 1.62,
    Mars = 3.71,
    Jupiter = 24.79,
    Saturn = 10.44,
    Uranus = 8.87,
    Neptune = 11.15,
    Pluto = 0.62,
    Sun = 274,
}

export default class Physics {
    constructor(public runner: Runner) {}

    public applyGravity(gravity: number = Gravity.Earth): number {
        return gravity * (this.runner.delta / 1000);
    }
}
