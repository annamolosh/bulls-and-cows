export function generateSecret(
    length: number,
    base: number,
    random: () => number = Math.random,
): string {
    const availableDigits = "0123456789abcdef".slice(0, base).split("");
    let secret = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(random() * availableDigits.length); // выбор случайного символа
        const digit = availableDigits[randomIndex];

        secret += digit; // добавление его в секрет
        availableDigits.splice(randomIndex, 1); // удаление из доступных
    }
    return secret;
}
