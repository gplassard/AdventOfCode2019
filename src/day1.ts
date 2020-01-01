import * as fs from "fs";

function computeFuel(mass: number): number {
    const amount = Math.floor(mass / 3) - 2;
    if (amount < 0) {
        return 0;
    }
    return amount + computeFuel(amount);
}


const result = fs
    .readFileSync('inputs/day1.txt').toString()
    .split("\n")
    .filter(l => l.length > 0)
    .map(parseFloat)
    .map(computeFuel)
    .reduce((a, b) => a + b, 0);

console.log(result);