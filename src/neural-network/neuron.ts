import uuid from "./shared/uuid";
import sigmoid from "./functions/sigmoid";
import Synapse from "./synapse";

export enum NeuronType {
    Input = "input",
    Hidden = "hidden",
    Output = "output",
}

export default class Neuron {
    public readonly id = uuid();

    public activation: number = 0;
    public func: Function = sigmoid.activate;
    public bias: number = (Math.random() - 0.5) * 2;

    public connections: Map<string, Synapse> = new Map();

    constructor() {}

    // Ativa o neurônio, fazendo a soma ponderada dos valores de ativação dos neurônios de entrada.
    public activate(input?: number): number {
        // Se o neurônio for do tipo de entrada, ele recebe o valor de ativação diretamente.
        if (input !== undefined) {
            this.bias = 0;
            this.activation = input;

            return this.activation;
        }

        let sum = 0;
        for (const synapse of this.connections.values()) {
            sum += synapse.weight * synapse.from.activation;
        }

        this.activation = this.func(sum + this.bias);

        return this.activation;
    }

    // A projeção é utilizada para criar uma conexão entre dois neurônios.
    public project(neuron: Neuron, weight?: number) {
        const synapse = new Synapse(this, neuron, weight);

        neuron.connections.set(synapse.id, synapse);

        return synapse;
    }

    public mutate(rate: number): void {
        if (Math.random() < rate) {
            this.bias += (Math.random() - 0.5) * 2;
        }

        for (const synapse of this.connections.values()) {
            synapse.mutate(rate);
        }
    }

    // Verifica se o neurônio esta conectado a outro neurônio.
    public connected(neuron: Neuron) {
        for (const synapse of this.connections.values()) {
            if (synapse.from === neuron) {
                return true;
            }

            if (synapse.to === neuron) {
                return true;
            }
        }

        return false;
    }
}
