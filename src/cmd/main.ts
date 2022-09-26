import Emitter from "../game/event-emitter/emitter";
import { GameEvents } from "../game/event-emitter/main/game.event";
import { Game, GameStatus } from "../game/game";
import { Bird } from "../game/game-objects/bird";
import { BackgroundLayer } from "../game/game-objects/layers/background.layer";
import { GroundObstacle } from "../game/game-objects/obstacles/ground.obstacle";
import { PipesSliderObstacle } from "../game/game-objects/obstacles/pipes-slider.obstacle";
import { DebugUI } from "../game/game-objects/ui/debug.ui";
import GameOverUI from "../game/game-objects/ui/game-over.ui";
import GetReadyUI from "../game/game-objects/ui/get-ready.ui";
import ScoreUI from "../game/game-objects/ui/score.ui";
import TapUI from "../game/game-objects/ui/tap.ui";
import { Genetic } from "../game/genetic/genetic";
import { KeyCode } from "../game/shared/constants/key-code";

declare var window: any;

async function main() {
    const game = new Game();
    const genetic = new Genetic(game, 2000);

    window["game"] = game; // Para debugar no console

    game.runner.start();
    game.renderer.start(document.querySelector("body")!);

    // const bird = new Bird();

    game.add(new TapUI());
    game.add(new ScoreUI());
    game.add(new DebugUI());
    game.add(new GameOverUI());
    game.add(new GetReadyUI());

    game.add(new GroundObstacle());
    game.add(new BackgroundLayer());
    game.add(new PipesSliderObstacle());

    genetic.createPopulation();

    Emitter.on(GameEvents.GameOver, () => {
        game.ready();
        genetic.nextGeneration();
        console.log(`Criado uma nova geração sendo a ${genetic.generation} geração.`);

        setTimeout(() => {
            game.start();
        }, 1000);
    });

    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case KeyCode.KeyP:
                if (game.status === GameStatus.Paused) {
                    game.resume();
                } else {
                    game.pause();
                }
            case KeyCode.Space:
                if (game.status === GameStatus.GetReady) {
                    game.start();
                } else if (game.status === GameStatus.GameOver) {
                    game.ready();

                    game.add(new Bird());
                } else {
                    for (const bird of game.findByName<Bird>("bird")) {
                        bird.flap();
                    }
                }
                break;
        }
    });
}

main();
