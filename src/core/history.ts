import { HistoryEntry } from "./types.js";

export function addHistoryEntry(history:HistoryEntry[], entry:HistoryEntry):HistoryEntry[]{
    return [...history, entry]
}