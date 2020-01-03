import { segments, findIntersections, minDistance } from "./day3"

describe('Day3', () => {
    it('Part 2 sample 1', () => {
        const wire1 = segments("R75,D30,R83,U83,L12,D49,R71,U7,L72".split(","))
        const wire2 = segments("U62,R66,U55,R34,D71,R55,D58,R83".split(","))

        const intersections = findIntersections(wire1, wire2);

        console.log(intersections);

        const min = minDistance(intersections, wire1, wire2);

        expect(min).toEqual(610)
    })
})