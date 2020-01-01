
export class IntcodeProgram {
    constructor(public code: number[], public position: number = 0, public step = 0){}

    public isDone(): Boolean {
        return this.code[this.position] == 99;
    }

    public debug() {
        console.log(this.step, this.position, JSON.stringify(this.code))
    }

    public executeStep(): IntcodeProgram {
        const instruction = this.code[this.position]
        const updatedCode = [...this.code];
        if (instruction == 1){
            updatedCode[this.code[this.position + 3]] = this.code[this.code[this.position + 1]] + this.code[this.code[this.position + 2]]
        }
        else if (instruction == 2){
            updatedCode[this.code[this.position + 3]] = this.code[this.code[this.position + 1]] * this.code[this.code[this.position + 2]]
        }
        else {
            throw `Invalid instruction : ${instruction}`
        }
        return new IntcodeProgram(updatedCode, this.position + 4, this.step + 1)
    }

    public execute(): IntcodeProgram {
        let p: IntcodeProgram = this;
        while (!p.isDone()) {
            p = p.executeStep();
        }
        return p;
    }

}
