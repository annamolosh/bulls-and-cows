import { countPossibleSecrets } from "../src/core/countPossibleSecrets.js";
import { describe, it, expect } from "vitest";

describe("countPossibleSecrets", () => {
    it("should count possible secrets with unique digits", () => {
        expect(countPossibleSecrets(2, 10)).toBe(90);
    });
    it("should count possible secrets in binary system", () => {
        expect(countPossibleSecrets(2, 2)).toBe(2);
    });
    it("should count possible secrets in decimal system", () => {
        expect(countPossibleSecrets(3, 10)).toBe(720);
    });
    it("should count possible secrets when length equals base", () => {
        expect(countPossibleSecrets(3, 3)).toBe(6);
    });
    it("should count possible secrets in octal system", () => {
        expect(countPossibleSecrets(3, 8)).toBe(336);
    });
    it("should count possible secrets in hexadecimal system", () => {
        expect(countPossibleSecrets(3, 16)).toBe(3360);
    });
    it("should count possible secrets with length 1", () => {
        expect(countPossibleSecrets(1, 16)).toBe(16);
    });
    it("should count possible secrets with maximum game length", () => {
        expect(countPossibleSecrets(6, 10)).toBe(151200);
    });
    it("should return 0 when length is greater than base", () => {
        expect(countPossibleSecrets(3, 2)).toBe(0);
    });
    it("should return 0 for negative length", () => {
        expect(countPossibleSecrets(-1, 10)).toBe(0);
    });
    it("should return 0 for invalid base", () => {
        expect(countPossibleSecrets(2, -10)).toBe(0);
    });
});
