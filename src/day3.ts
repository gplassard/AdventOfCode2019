import * as fs from "fs";

const [firstPath, secondPath] = fs
    .readFileSync('inputs/day3.txt').toString()
    .split("\n")

type Point = {x: number, y: number};
type Segment = {start: Point, end: Point};

function segments(path: string[], origin: Point = {x: 0, y: 0}): Segment[] {
    if (path.length == 0) {
        return [];
    }
    const [head, ...rest] = path; 
    const [direction, ...amount] = head;
    const amountInt = parseInt(amount as any as string); //WTF typescript
    
    const deltaX = direction == 'L' ? -amountInt : direction == 'R' ? amountInt : 0; //?
    const deltaY = direction == 'D' ? -amountInt : direction == 'U' ? amountInt : 0; //?

    const end = {x: origin.x + deltaX, y: origin.y + deltaY}

    return [{start: origin, end: end }, ...segments(rest, end)];
}

// https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
function pointOfIntersection(A: Point,B: Point,C: Point,D: Point): Point | null {
    const [p0_x, p0_y] = [A.x, A.y];
    const [p1_x, p1_y] = [B.x, B.y];
    const [p2_x, p2_y] = [C.x, C.y];
    const [p3_x, p3_y] = [D.x, D.y];
    let s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;     s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     s2_y = p3_y - p2_y;

    let s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return {x: p0_x + (t * s1_x), y: p0_y + (t * s1_y)};
    }

    
    return null; // No collision
}


function manhatanDistance(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const firstSegments = segments(firstPath.split(","))
const secondSegments = segments(secondPath.split(","))

const intersections = [];
for (const s1 of firstSegments) {
    for (const s2 of secondSegments) {
        const i = pointOfIntersection(s1.start, s1.end, s2.start, s2.end)
        if (i != null){
            intersections.push(i);
        }
    }
}

const distances = intersections
    .map(p => manhatanDistance(p, {x: 0, y: 0}))
    .sort();

console.log(JSON.stringify(distances[0]))