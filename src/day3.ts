import * as fs from "fs";

const [firstPath, secondPath] = fs
    .readFileSync('inputs/day3.txt').toString()
    .split("\n")

type Point = {x: number, y: number};
type Segment = {start: Point, end: Point};

export function segments(path: string[], origin: Point = {x: 0, y: 0}): Segment[] {
    if (path.length == 0) {
        return [];
    }
    const [head, ...rest] = path; 
    const direction = head[0];
    const amount = parseInt(head.slice(1, head.length));
    
    const deltaX = direction == 'L' ? -amount : direction == 'R' ? amount : 0; //?
    const deltaY = direction == 'D' ? -amount : direction == 'U' ? amount : 0; //?

    const end = {x: origin.x + deltaX, y: origin.y + deltaY}

    return [{start: origin, end: end }, ...segments(rest, end)];
}

// https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
export function pointOfIntersection(A: Point,B: Point,C: Point,D: Point): Point | null {
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

export function manhatanDistance(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function isOnSegment(p: Point, s: Segment) {
    const sameX = p.x == s.start.x && p.x == s.end.x;
    const betweenY = Math.min(s.start.y, s.end.y) <= p.y && p.y <= Math.max(s.start.y, s.end.y);

    const sameY = p.y == s.start.y && p.y == s.end.y;
    const betweenX = Math.min(s.start.x, s.end.x) <= p.x && p.x <= Math.max(s.start.x, s.end.x);

    return (sameX && betweenY) || (sameY && betweenX);
}

export function nbrOfSteps(p: Point, segments: Segment[]): number {
    let steps = 0;
    for (const s of segments) {
        if (isOnSegment(p, s)) {
            steps += manhatanDistance(p, s.start);
            return steps;
        }
        else {
            steps += manhatanDistance(s.start, s.end);
        }
    }
    throw "Could not find an intersection"
}

export function findIntersections(wire1: Segment[], wire2: Segment[]): Point[] {
    const intersections = [];
    for (const s1 of wire1) {
        for (const s2 of wire2) {
            const i = pointOfIntersection(s1.start, s1.end, s2.start, s2.end)
            if (i != null && !(i.x == 0 && i.y == 0)){
                intersections.push(i);
            }
        }
    }
    return intersections;
}

export function minDistance(intersections: Point[], wire1: Segment[], wire2: Segment[]): number {
    return intersections
        .map(intersection => {
            intersection
            const first = nbrOfSteps(intersection, wire1) //?
            const second = nbrOfSteps(intersection, wire2) //?
            console.log(intersection, first, second, first + second)
            return first + second
        })
        .sort((a, b) => a - b)[0];
}

const firstSegments = segments(firstPath.split(","))
const secondSegments = segments(secondPath.split(","))

const intersections = findIntersections(firstSegments, secondSegments);
const min = minDistance(intersections, firstSegments, secondSegments);

console.log(min)