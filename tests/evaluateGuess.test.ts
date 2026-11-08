import { evaluateGuess } from "../src/core/evaluateGuess.js";
import { describe, it, expect } from  "vitest";

describe ("evaluateGuess", ()=> {
    it("should count bulls when digits are in the correct positions", () => {
        const result = evaluateGuess("4271", "4273");
        
        expect(result).toEqual({
            bulls: 3,
            cows: 0,
        });
    });
    it("should count cows when digits are correct but positions are wrong", () => {
        const result = evaluateGuess("4271", "1273");
        
        expect(result).toEqual({
            bulls: 2,
            cows: 1,
        });
    });
    it("should return all bulls when the guess matches the secret", () => {
        const result = evaluateGuess("4271", "4271");
        
        expect(result).toEqual({
            bulls: 4,
            cows: 0,
        });
    });
    it("should return zero bulls and cows when there are no matching digits", () => {
        const result = evaluateGuess("4271", "5836");
        
        expect(result).toEqual({
            bulls: 0,
            cows: 0,
        });
    });
});