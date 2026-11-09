import { isValidGuess } from "./validators.js";
import { evaluateGuess } from "./evaluateGuess.js";
import { addHistoryEntry } from "./history.js";

import type { GameState, HistoryEntry } from "./types.js";

export function submitGuess(state: GameState, guess: string): GameState {
    if (state.isWon) {
        return state;
    }
    if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
        return state;
    }
    const alreadyUsed = state.history.some((entry) => {
        return entry.guess.toLowerCase() === guess.toLowerCase();
    });

    if (alreadyUsed) {
        return state;
    }
    const result = evaluateGuess(state.secret, guess);

    const newEntry: HistoryEntry = {
        guess,
        bulls: result.bulls,
        cows: result.cows,
    };
    const newHistory = addHistoryEntry(state.history, newEntry);

    const isWon = result.bulls === state.settings.length;

    return { ...state, history: newHistory, isWon };
}
