import {generateSecret} from "../src/core/generateSecret.js";
import {describe, it, expect} from "vitest";

describe("generateSecret", ()=> {
    it ("should generate a secret with the requested length", ()=> {
        const secret = generateSecret(4, 10);

        expect(secret.length).toBe(4);
    })
    it ("should generate a secret with unique digits", ()=> {
        const secret = generateSecret(4, 10);
        const uniqueDigits = new Set(secret);

        expect(uniqueDigits.size).toBe(secret.length);
    })
    it ("should generate a secret with valid digits for the given base", ()=> {
        const secret = generateSecret(4, 8);
        const validDigits = "01234567";

        for (const digit of secret) {
            expect(validDigits).toContain(digit);
        }
    })
    it ("should preserve a leading zero", ()=> {
        const secret = generateSecret(4,10, ()=> 0);
        expect(secret).toBe("0123")
    })
    it ("should generate a secret with the minimum length", ()=> {
        const secret = generateSecret(2, 10);
        expect(secret.length).toBe(2)
    })
     it ("should generate a secret with the maximum length", ()=> {
        const secret = generateSecret(6, 16);
        expect(secret.length).toBe(6)
    })
})