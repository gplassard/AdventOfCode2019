import _ from "lodash";

export function isValidPassword(number: number): boolean {
    const asString = number.toString()
    if (asString.length != 6) {
        return false;
    }
    const offBy1 = ["", ...Array.from(asString)]

    const sameNeighbors = _.zip(offBy1, Array.from(asString))
        .filter(([left, right]) => left === right)
        .map(([left]) => left)

    const hasValidAdjacent = Object.entries(_.groupBy(sameNeighbors, a => a))
        .map(([digit, digits]) => digits.length)
        .some((length) => length == 1)

    const hasDecrease = _.zip(Array.from(asString), offBy1)
        .some(([left, right]) => parseInt(left!) < parseInt(right!))

    return hasValidAdjacent && !hasDecrease
}

const min = 367479
const max = 893698
let count = 0
for (let i = min; i<= max; i++) {
    if (isValidPassword(i)) {
        console.log(i)
        count += 1
    }
}
console.log(count)