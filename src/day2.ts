import * as fs from "fs";
import {IntcodeProgram} from "./IntcodeProgram";

const Intcode = fs.readFileSync('inputs/day2.txt')
    .toString()
    .split(",") //?
    .map(i => parseInt(i));

Intcode[1] = 12;
Intcode[2] = 2;
const p = new IntcodeProgram(Intcode).execute();
console.log(p.code[0]);