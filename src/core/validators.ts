export function createDigitValidator(base: number) {
    const allowedDigits = "0123456789abcdef".slice(0, base);

    function validateDigit(char: string): boolean {
        const normalizedChar = char.toLowerCase();

        if (normalizedChar.length !== 1) {
            return false;
        }
        if (allowedDigits.includes(normalizedChar)) {
            return true;
        } else {
            return false;
        }
    }
    return validateDigit;
}

export function isValidGuess(guess: string, length: number, base: number): boolean {
    if (guess.length !== length) {
        return false;
    }

    const isValidDigit = createDigitValidator(base);
    const digits = guess.split("");
    const hasOnlyValidDigits = digits.every((digit) => {
        return isValidDigit(digit);
    });
    if (!hasOnlyValidDigits) {
        return false;
    }

    const normalizedGuess = guess.toLowerCase();
    const uniqueDigits = new Set(normalizedGuess);
    if (uniqueDigits.size !== length) {
        return false;
    }
    return true;
}
