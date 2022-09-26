import uuid from "./shared/uuid";
import Neuron from "./neuron";

export default class Synapse {
    public readonly id = uuid();
    public readonly to: Neuron;
    public readonly from: Neuron;

    public weight: number;

    constructor(from: Neuron, to: Neuron, weight?: number) {
        this.to = to;
        this.from = from;
        this.weight = weight ?? (Math.random() - 0.5) * 2;
    }

    public mutate(rate: number): void {
        if (Math.random() < rate) {
            this.weight += (Math.random() - 0.5) * 2;
        }
    }
}
