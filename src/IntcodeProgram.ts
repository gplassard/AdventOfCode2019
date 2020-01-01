
export class IntcodeProgram {
    constructor(public memory: number[], public pointer: number = 0, public step = 0){}

    public isDone(): Boolean {
        return this.memory[this.pointer] == 99;
    }

    public debug() {
        console.log(this.step, this.pointer, JSON.stringify(this.memory))
    }

    public executeStep(): IntcodeProgram {
        const instruction = this.memory[this.pointer]
        const updatedCode = [...this.memory];
        if (instruction == 1){
            updatedCode[this.memory[this.pointer + 3]] = this.memory[this.memory[this.pointer + 1]] + this.memory[this.memory[this.pointer + 2]]
        }
        else if (instruction == 2){
            updatedCode[this.memory[this.pointer + 3]] = this.memory[this.memory[this.pointer + 1]] * this.memory[this.memory[this.pointer + 2]]
        }
        else {
            throw `Invalid instruction : ${instruction}`
        }
        return new IntcodeProgram(updatedCode, this.pointer + 4, this.step + 1)
    }

    public execute(): IntcodeProgram {
        let p: IntcodeProgram = this;
        while (!p.isDone()) {
            p = p.executeStep();
        }
        return p;
    }

}
