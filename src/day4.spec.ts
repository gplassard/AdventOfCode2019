import { isValidPassword } from "./day4"

describe('Day4', () => {
    it('Part 1 sample 1', () => {
        expect(isValidPassword('111111')).toBeTruthy()
    })

    it('Part 1 sample 2', () => {
        expect(isValidPassword('223450')).toBeFalsy()
    })

    it('Part 1 sample 3', () => {
        expect(isValidPassword('223450')).toBeFalsy()
    })
})