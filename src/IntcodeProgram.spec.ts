import { IntcodeProgram } from "./IntcodeProgram";

describe('Intcode day 2', () => {
    it('first example', () => {
        const p = new IntcodeProgram([1,0,0,0,99]).execute()
        expect(p.code).toEqual([2,0,0,0,99]);
    })
    it('second example', () => {
        const p = new IntcodeProgram([2,3,0,3,99]).execute()
        expect(p.code).toEqual([2,3,0,6,99]);
    })
    it('third example', () => {
        const p = new IntcodeProgram([2,4,4,5,99,0]).execute()
        expect(p.code).toEqual([2,4,4,5,99,9801]);
    })
    it('fourth example', () => {
        const p = new IntcodeProgram([1,1,1,4,99,5,6,0,99]).execute()
        expect(p.code).toEqual([30,1,1,4,2,5,6,0,99]);
    })
});