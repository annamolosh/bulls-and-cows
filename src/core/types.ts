export type GuessResult = {
    bulls: number;
    cows: number;
};

export type HistoryEntry = {
    guess: string;
    bulls: number;
    cows: number;
};

export type GameSettings = {
    length: number;
    base: number;
};

export type GameState = {
    secret: string;
    settings: GameSettings;
    history: HistoryEntry[];
    isWon: boolean;
    startedAt: number;
};
