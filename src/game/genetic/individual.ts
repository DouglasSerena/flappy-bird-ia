import Layer from "../../neural-network/layer";
import Network from "../../neural-network/network";
import { GameStatus } from "../game";
import { Bird, BirdStatus } from "../game-objects/bird";

export class Individual extends Bird {
    public network: Network;

    public get fitness(): number {
        return this.score;
    }

    constructor(network?: Network) {
        super();

        if (!network) {
            const input = new Layer(2);
            const hidden = new Layer(2);
            const output = new Layer(1);

            input.project(hidden);
            hidden.project(output);

            network = new Network({
                input: input,
                hidden: [hidden],
                output: output,
            });
        }

        this.network = network;
    }

    public update(delta: number): void {
        super.update(delta);

        if (this.game.status !== GameStatus.Running) {
            return;
        }

        if (!this.pipes) {
            return;
        }

        const x = this.pipes.x - this.x; // A distancia entre o pássaro e o cano
        const y = this.y - this.pipes.down.y + this.pipes.gap / 2; // O centro do espaço entre os canos

        const inputs = [x, y];
        const outputs = this.network.activate(inputs);

        if (Math.round(outputs[0])) {
            this.flap();
        }
    }

    public mutate(rate: number): void {
        this.network.mutate(rate);
    }

    public reset(): void {
        this.coord.x = 50;
        this.coord.y = 150;

        this.score = 0;
        this.status = BirdStatus.Alive;
    }
}
