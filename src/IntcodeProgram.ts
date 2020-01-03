export type Immediate = 1;
export type Position = 0;
export type Mode = Immediate | Position

export function isImmediate(input: number | Mode): input is Immediate {
    return input === 1;
}
export function isPosition(input: number | Mode): input is Position {
    return input === 0;
}

export class IntcodeProgram {
    constructor(public memory: number[], public pointer: number = 0, public step = 0){}

    public isDone(): Boolean {
        return this.memory[this.pointer] == 99;
    }

    public debug() {
        console.log(this.step, this.pointer, JSON.stringify(this.memory))
    }

    public addition(p1: number, p2: number, outputIndex: number): IntcodeProgram {
        const updatedCode = [...this.memory];
        updatedCode[outputIndex] = p1 + p2
        return new IntcodeProgram(updatedCode, this.pointer + 4, this.step + 1)
    }

    public multiplication(p1: number, p2: number, outputIndex: number): IntcodeProgram {
        const updatedCode = [...this.memory];
        updatedCode[outputIndex] = p1 * p2
        return new IntcodeProgram(updatedCode, this.pointer + 4, this.step + 1)
    }

    public executeStep(): IntcodeProgram {
        const instructionAndMode = this.memory[this.pointer]
        const instruction = instructionAndMode % 100;
        const mode1 = Math.floor(instructionAndMode / 100) as Mode
        const mode2 = Math.floor(instructionAndMode / 1000) as Mode
        const mode3 = Math.floor(instructionAndMode / 10000) as Mode

        if (instruction == 1 || instruction == 2){
            const p1 = isImmediate(mode1) ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]]
            const p2 = isImmediate(mode2) ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]]
            const outputIndex = this.memory[this.pointer + 3]
            if (instruction == 1) {
                return this.addition(p1, p2, outputIndex)
            }
            else {
                return this.multiplication(p1, p2, outputIndex)
            }
        }
        else {
            throw `Invalid instruction : ${instruction}`
        }
    }

    public execute(): IntcodeProgram {
        let p: IntcodeProgram = this;
        while (!p.isDone()) {
            p = p.executeStep();
        }
        return p;
    }

}
