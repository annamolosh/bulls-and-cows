import type { GuessResult } from "./types.js";

export function evaluateGuess (secret: string, guess: string):GuessResult {
    const normalizedSecret = secret.toLowerCase().split("");
    const normalizedGuess = guess.toLowerCase().split("");

    const comparisons = normalizedGuess.map((digit, index) => {
        return digit === normalizedSecret[index];
    })

    const matchingPositions = comparisons.filter((result) => {
        return result === true;
    })

    const bulls = matchingPositions.length;

    const matchingDigits = normalizedGuess.filter((digit) => {
        return normalizedSecret.includes(digit)
    })

    const cows = matchingDigits.length - bulls

    return { bulls, cows, }
}