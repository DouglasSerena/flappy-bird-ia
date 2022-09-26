import Neuron from "./neuron";
import SynapseLayer from "./synapse-layer";

export default class Layer {
    public readonly size: number;
    public readonly neurons: Neuron[] = [];
    public readonly connectedTo: Map<string, SynapseLayer> = new Map();

    constructor(size: number) {
        this.size = size ?? 0;

        for (let i = 0; i < size; i++) {
            this.neurons.push(new Neuron());
        }
    }

    public activate(inputs?: number[]) {
        if (inputs !== undefined && inputs.length !== this.size) {
            throw new Error("O número de entradas deve ser igual ao número de neurônios na camada.");
        }

        const activations = this.neurons.map((neuron, index) => neuron.activate(inputs?.[index]));

        return activations;
    }

    public project(layer: Layer, weights?: number[]): SynapseLayer {
        const synapse = new SynapseLayer(this, layer, weights);

        this.connectedTo.set(synapse.id, synapse);

        return synapse;
    }

    public mutate(rate: number): void {
        for (const neuron of this.neurons) {
            neuron.mutate(rate);
        }
    }
}
