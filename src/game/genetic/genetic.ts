import Game from "../game";
import Individual from "./individual";

export default class Genetic {
    public size = 0;
    public generation = 0;
    public population: Individual[] = [];

    public get best(): Individual {
        return this.population.sort((a, b) => b.fitness - a.fitness)[0];
    }

    public constructor(public game: Game, size: number) {
        this.size = size;
    }

    public createPopulation(): void {
        this.population = [];

        for (let i = 0; i < this.size; i++) {
            const individual = new Individual();

            this.game.add(individual);
            this.population.push(individual);
        }
    }

    public nextGeneration(): void {
        this.generation++;

        const best = this.population.sort((a, b) => b.fitness - a.fitness)[0];

        if (best.fitness === 0) {
            this.createPopulation();
            return;
        }

        this.game.add(best);
        this.population = [best];

        while (this.population.length <= this.size) {
            const individual = new Individual(best.network.clone());

            this.game.add(individual);
            this.population.push(individual);
        }

        for (let i = 0; i < this.size; i++) {
            this.population[i].reset();
            this.population[i].mutate(0.5);
        }
    }
}
