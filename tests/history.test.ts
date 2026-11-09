import {describe,it,expect} from "vitest";
import { addHistoryEntry } from "../src/core/history.js"
import type { HistoryEntry } from "../src/core/types.js";

describe("addHistoryEntry", ()=>{
    it("should add a new entry history", ()=> {
        const history: HistoryEntry[]=[{guess: "1234", bulls:1, cows:2}]
        const entry: HistoryEntry ={guess:"5678", bulls: 0, cows: 1}

        const result = addHistoryEntry(history, entry)
        expect(result).toEqual([{guess: "1234", bulls:1, cows:2}, {guess:"5678", bulls: 0, cows: 1}])
    })
    it("should not mutate the original history", ()=> {
        const history: HistoryEntry[]=[{guess: "1234", bulls:1, cows:2}]
        const entry: HistoryEntry ={guess:"5678", bulls: 0, cows: 1}

        const result = addHistoryEntry(history, entry)
        expect(history).toHaveLength(1)
        expect(result).not.toBe(history)
    })
    it("should add an entry to an empty history", ()=> {
        const history: HistoryEntry[]=[]
        const entry: HistoryEntry ={guess:"1234", bulls: 0, cows: 1}

        const result = addHistoryEntry(history, entry)
        expect (result).toEqual([entry])
    })
})