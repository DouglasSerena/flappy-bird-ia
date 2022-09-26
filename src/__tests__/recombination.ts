import { writeFile, writeFileSync } from "fs";
import Layer from "../neural-network/layer";
import Network from "../neural-network/network";

async function main() {
    const input = new Layer(2);
    const hidden = new Layer(3);
    const output = new Layer(1);

    input.project(hidden);
    hidden.project(output);

    const network = new Network({
        input: input,
        hidden: [hidden],
        output: output,
    });

    const input2 = new Layer(2);
    const hidden2 = new Layer(3);
    const output2 = new Layer(1);

    input2.project(hidden2);
    hidden2.project(output2);

    const otherNetwork = new Network({
        input: input2,
        hidden: [hidden2],
        output: output2,
    });

    writeFileSync("network.json", JSON.stringify(network.toJson(), null, 4));
    writeFileSync("other-network.json", JSON.stringify(otherNetwork.toJson(), null, 4));

    const offspring = network.crossover(otherNetwork);

    writeFileSync("offspring.json", JSON.stringify(offspring.toJson(), null, 4));
}

main();
