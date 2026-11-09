import { createDigitValidator, isValidGuess } from "../src/core/validators.js";
import { describe, it, expect } from "vitest";

describe("createDigitValidator", () => {
    it("should accept only 0 and 1 in binary system", () => {
        const isValidDigit = createDigitValidator(2);

        expect(isValidDigit("0")).toBe(true);
        expect(isValidDigit("1")).toBe(true);
        expect(isValidDigit("2")).toBe(false);
        expect(isValidDigit("9")).toBe(false);

        expect(isValidDigit("-")).toBe(false);
        expect(isValidDigit("+")).toBe(false);
        expect(isValidDigit("/")).toBe(false);
        expect(isValidDigit(" ")).toBe(false);
        expect(isValidDigit("@")).toBe(false);
    });
    it("should accept only 0 and 7 in octal system", () => {
        const isValidDigit = createDigitValidator(8);

        expect(isValidDigit("0")).toBe(true);
        expect(isValidDigit("1")).toBe(true);
        expect(isValidDigit("2")).toBe(true);
        expect(isValidDigit("3")).toBe(true);
        expect(isValidDigit("4")).toBe(true);
        expect(isValidDigit("5")).toBe(true);
        expect(isValidDigit("6")).toBe(true);
        expect(isValidDigit("7")).toBe(true);
        expect(isValidDigit("8")).toBe(false);

        expect(isValidDigit("-")).toBe(false);
        expect(isValidDigit("+")).toBe(false);
        expect(isValidDigit("/")).toBe(false);
        expect(isValidDigit(" ")).toBe(false);
        expect(isValidDigit("@")).toBe(false);
    });
    it("should accept only 0 and 9 in decimal system", () => {
        const isValidDigit = createDigitValidator(10);

        expect(isValidDigit("0")).toBe(true);
        expect(isValidDigit("1")).toBe(true);
        expect(isValidDigit("2")).toBe(true);
        expect(isValidDigit("3")).toBe(true);
        expect(isValidDigit("4")).toBe(true);
        expect(isValidDigit("5")).toBe(true);
        expect(isValidDigit("6")).toBe(true);
        expect(isValidDigit("7")).toBe(true);
        expect(isValidDigit("8")).toBe(true);
        expect(isValidDigit("9")).toBe(true);

        expect(isValidDigit("-")).toBe(false);
        expect(isValidDigit("+")).toBe(false);
        expect(isValidDigit("/")).toBe(false);
        expect(isValidDigit(" ")).toBe(false);
        expect(isValidDigit("@")).toBe(false);
    });
    it("should accept hexadecimal digits from 0 to 9 and a to f", () => {
        const isValidDigit = createDigitValidator(16);

        expect(isValidDigit("0")).toBe(true);
        expect(isValidDigit("1")).toBe(true);
        expect(isValidDigit("2")).toBe(true);
        expect(isValidDigit("3")).toBe(true);
        expect(isValidDigit("4")).toBe(true);
        expect(isValidDigit("5")).toBe(true);
        expect(isValidDigit("6")).toBe(true);
        expect(isValidDigit("7")).toBe(true);
        expect(isValidDigit("8")).toBe(true);
        expect(isValidDigit("9")).toBe(true);
        expect(isValidDigit("a")).toBe(true);
        expect(isValidDigit("b")).toBe(true);
        expect(isValidDigit("c")).toBe(true);
        expect(isValidDigit("d")).toBe(true);
        expect(isValidDigit("e")).toBe(true);
        expect(isValidDigit("f")).toBe(true);
        expect(isValidDigit("g")).toBe(false);

        expect(isValidDigit("A")).toBe(true);
        expect(isValidDigit("B")).toBe(true);
        expect(isValidDigit("F")).toBe(true);
        expect(isValidDigit("G")).toBe(false);

        expect(isValidDigit("-")).toBe(false);
        expect(isValidDigit("+")).toBe(false);
        expect(isValidDigit("/")).toBe(false);
        expect(isValidDigit(" ")).toBe(false);
        expect(isValidDigit("@")).toBe(false);
    });
    it("should reject strings with more than one character", () => {
        const isValidDigit = createDigitValidator(16);

        expect(isValidDigit("10")).toBe(false);
        expect(isValidDigit("ab")).toBe(false);
    });
});

describe("isValidGuess", () => {
    it("should accept a guess with the requested length", () => {
        expect(isValidGuess("4271", 4, 10)).toBe(true);
    });
    it("should reject a guess with an incorrect length", () => {
        expect(isValidGuess("427", 4, 10)).toBe(false);
        expect(isValidGuess("42715", 4, 10)).toBe(false);
    });
    it("should reject a guess with invalid digits", () => {
        expect(isValidGuess("42a1", 4, 10)).toBe(false);
        expect(isValidGuess("4281", 4, 8)).toBe(false);
        expect(isValidGuess("42-1", 4, 10)).toBe(false);
    });
    it("should reject a guess with duplicate digits", () => {
        expect(isValidGuess("4221", 4, 10)).toBe(false);
        expect(isValidGuess("1123", 4, 10)).toBe(false);
    });
    it("should accept a guess with a leading zero", () => {
        expect(isValidGuess("0123", 4, 10)).toBe(true);
    });
    it("should accept uppercase hexadecimal digits", () => {
        expect(isValidGuess("A2F3", 4, 16)).toBe(true);
    });
    it("should reject duplicate hexadecimal digits regardless of case", () => {
        expect(isValidGuess("aAF3", 4, 16)).toBe(false);
    });
});
