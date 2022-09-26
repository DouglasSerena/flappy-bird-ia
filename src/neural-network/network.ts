import clone from "../game/shared/helpers/clone";
import Layer from "./layer";
import SynapseLayer from "./synapse-layer";

export type Layers = {
    input: Layer;
    hidden: Layer[];
    output: Layer;
};

export default class Network {
    public readonly layers: Layers;

    constructor(layers: Layers) {
        this.layers = {
            input: layers.input ?? null,
            hidden: layers.hidden ?? [],
            output: layers.output ?? null,
        };
    }

    public activate(input: number[]): number[] {
        this.layers.input.activate(input);

        for (var i = 0; i < this.layers.hidden.length; i++) {
            this.layers.hidden[i].activate();
        }

        return this.layers.output.activate();
    }

    public project(network: Network, weights: number[]): SynapseLayer {
        return this.layers.output.project(network.layers.input, weights);
    }

    public mutate(rate: number): void {
        this.layers.input.mutate(rate);

        for (var i = 0; i < this.layers.hidden.length; i++) {
            this.layers.hidden[i].mutate(rate);
        }

        this.layers.output.mutate(rate);
    }

    public clone() {
        return clone(this);
    }
}
