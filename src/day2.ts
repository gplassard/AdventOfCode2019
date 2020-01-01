import * as fs from "fs";
import {IntcodeProgram} from "./IntcodeProgram";

const Intcode = fs.readFileSync('inputs/day2.txt')
    .toString()
    .split(",") //?
    .map(i => parseInt(i));


for (let noun = 0; noun < 100; noun ++){
    for (let verb = 0; verb < 100; verb ++){
        Intcode[1] = noun;
        Intcode[2] = verb;
        const p = new IntcodeProgram(Intcode).execute();
        if (p.memory[0] == 19690720) {
            console.log(noun, verb, 100 * noun + verb)
        }
    }
}