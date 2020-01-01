import * as fs from "fs";

const result = fs
    .readFileSync('inputs/day1.txt').toString()
    .split("\n")
    .filter(l => l.length > 0)
    .map(i => Math.floor(parseFloat(i) / 3) - 2)
    .reduce((a, b) => a + b, 0);

console.log(result);