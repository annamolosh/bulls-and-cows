import { generateSecret } from "../core/generateSecret.js";
import type { GameState } from "../core/types.js";
import { submitGuess } from "../core/game.js";
import { createDigitValidator } from "../core/validators.js";

export function createTitle(): HTMLHeadingElement {
    const title = document.createElement("h1");
    title.textContent = "Bulls and Cows";

    return title;
}

export function renderApp(): void {
    const main = createMain();
    const title = createTitle();

    // Игровой экран
    const gameSection = createGameSection();
    const guessInput = createGuessInput();
    const submitButton = createSubmitGuessButton();
    const historyList = createHistoryList();
    const gameStatus = createGameStatus();

    const attemptsCounter = document.createElement("p");
    attemptsCounter.textContent = "Attempts: 0";

    const timerDisplay = document.createElement("p");
    timerDisplay.textContent = "Time: 0 sec";

    const newGameButton = createNewGameButton();
    newGameButton.hidden = true;

    gameSection.append(
        guessInput,
        submitButton,
        attemptsCounter,
        timerDisplay,
        gameStatus,
        historyList,
        newGameButton,
    );

    gameSection.hidden = true;

    // Настройки игры
    const settingsSection = createSettingsSection();
    const settingsTitle = createSettingsTitle();
    const baseSelector = createBaseSelector();

    const binaryButton = createBaseButton("Binary (2)");
    const octalButton = createBaseButton("Octal (8)");
    const decimalButton = createBaseButton("Decimal (10)");
    const hexadecimalButton = createBaseButton("Hexadecimal (16)");

    baseSelector.append(binaryButton, octalButton, decimalButton, hexadecimalButton);

    const lengthSelector = createLengthSelector();
    const startButton = createStartButton();
    const lengthTitle = createLengthTitle();

    const lengthButtons = [2, 3, 4, 5, 6].map((length) => {
        return createLengthButton(length);
    });

    lengthSelector.append(...lengthButtons);

    let selectedLength = 4;

    lengthButtons[2]?.classList.add("selected");

    lengthButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            selectedLength = index + 2;

            lengthButtons.forEach((item) => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
        });
    });

    const baseButtons = [binaryButton, octalButton, decimalButton, hexadecimalButton];

    let selectedBase = 10;

    decimalButton.classList.add("selected");

    updateLengthButtons(lengthButtons, selectedBase);

    baseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const bases = [2, 8, 10, 16];
            const base = bases[index];

            if (base !== undefined) {
                selectedBase = base;
            }

            updateLengthButtons(lengthButtons, selectedBase);

            if (selectedLength > selectedBase) {
                selectedLength = 2;

                lengthButtons.forEach((item) => {
                    item.classList.remove("selected");
                });

                lengthButtons[0]?.classList.add("selected");
            }

            baseButtons.forEach((item) => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
        });
    });

    settingsSection.append(settingsTitle, baseSelector, lengthTitle, lengthSelector, startButton);

    let gameState: GameState | null = null;
    let timerId: number | undefined;

    // Запуск игры
    startButton.addEventListener("click", () => {
        const secret = generateSecret(selectedLength, selectedBase);

        gameState = {
            secret,
            settings: {
                length: selectedLength,
                base: selectedBase,
            },
            history: [],
            isWon: false,
            startedAt: Date.now(),
        };

        historyList.replaceChildren();
        guessInput.value = "";
        guessInput.disabled = false;
        guessInput.maxLength = selectedLength;
        submitButton.disabled = false;
        attemptsCounter.textContent = "Attempts: 0";
        timerDisplay.textContent = "Time: 0 sec";
        gameStatus.textContent = "";

        settingsSection.hidden = true;
        gameSection.hidden = false;

        if (timerId !== undefined) {
            window.clearInterval(timerId);
        }

        timerId = window.setInterval(() => {
            if (gameState === null) return;

            const elapsedSeconds = Math.floor((Date.now() - gameState.startedAt) / 1000);

            timerDisplay.textContent = `Time: ${elapsedSeconds} sec`;
        }, 1000);
    });

    // Фильтрация вводимых символов
    guessInput.addEventListener("input", () => {
        if (gameState === null) return;

        const isDigitValid = createDigitValidator(gameState.settings.base);

        guessInput.value = guessInput.value
            .split("")
            .filter(isDigitValid)
            .slice(0, gameState.settings.length)
            .join("");
    });

    // Проверка попытки
    submitButton.addEventListener("click", () => {
        if (gameState === null) return;

        const newState = submitGuess(gameState, guessInput.value);

        if (newState === gameState) return;

        gameState = newState;

        const lastEntry = gameState.history[gameState.history.length - 1];

        if (lastEntry) {
            const item = document.createElement("li");

            item.textContent = `${lastEntry.guess} — Bulls: ${lastEntry.bulls}, Cows: ${lastEntry.cows}`;

            historyList.append(item);

            attemptsCounter.textContent = `Attempts: ${gameState.history.length}`;
        }

        guessInput.value = "";

        if (gameState.isWon) {
            gameStatus.textContent = "Поздравляем! Число угадано!";

            guessInput.disabled = true;
            submitButton.disabled = true;
            newGameButton.hidden = false;

            if (timerId !== undefined) {
                window.clearInterval(timerId);
            }
        }
    });

    // Новая игра без перезагрузки
    newGameButton.addEventListener("click", () => {
        if (timerId !== undefined) {
            window.clearInterval(timerId);
            timerId = undefined;
        }

        gameState = null;

        guessInput.value = "";
        historyList.replaceChildren();

        attemptsCounter.textContent = "Attempts: 0";
        timerDisplay.textContent = "Time: 0 sec";
        gameStatus.textContent = "";

        guessInput.disabled = false;
        submitButton.disabled = false;
        newGameButton.hidden = true;

        gameSection.hidden = true;
        settingsSection.hidden = false;
    });

    // Добавление элементов на страницу
    main.append(title, settingsSection, gameSection);
    document.body.append(main);
}

export function createMain(): HTMLElement {
    const main = document.createElement("main");

    return main;
}

export function createSettingsSection(): HTMLElement {
    const section = document.createElement("section");

    section.classList.add("settings");

    return section;
}

export function createSettingsTitle(): HTMLHeadingElement {
    const title = document.createElement("h2");
    title.textContent = "Game settings";

    return title;
}

export function createBaseSelector(): HTMLDivElement {
    const selector = document.createElement("div");

    selector.classList.add("base-selector");

    return selector;
}

export function createBaseButton(label: string): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = label;

    return button;
}

export function createLengthSelector(): HTMLDivElement {
    const selector = document.createElement("div");

    selector.classList.add("length-selector");

    return selector;
}

export function createLengthTitle(): HTMLHeadingElement {
    const title = document.createElement("h3");

    title.textContent = "Secret length";

    return title;
}

export function createLengthButton(length: number): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = String(length);

    return button;
}

export function updateLengthButtons(buttons: HTMLButtonElement[], base: number): void {
    buttons.forEach((button, index) => {
        const length = index + 2;

        button.disabled = length > base;
    });
}

export function createStartButton(): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "Start Game";

    return button;
}

export function createGameSection(): HTMLElement {
    const section = document.createElement("section");

    section.classList.add("game");

    return section;
}

export function createGuessInput(): HTMLInputElement {
    const input = document.createElement("input");

    input.type = "text";
    input.placeholder = "Enter your guess";

    return input;
}

export function createSubmitGuessButton(): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "Check";

    return button;
}

export function createHistoryList(): HTMLUListElement {
    return document.createElement("ul");
}

export function createGameStatus(): HTMLParagraphElement {
    return document.createElement("p");
}

export function createNewGameButton(): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "New Game";

    return button;
}
