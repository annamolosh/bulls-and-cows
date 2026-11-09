import {describe, it, expect}from "vitest"
import {submitGuess} from "../src/core/game.js"
import type { GameState } from "../src/core/types.js"

describe("submitGuess", ()=> {
    const state: GameState ={secret:"1234", settings:{length:4, base:10}, history:[], isWon: false, startedAt: 1000}
    it ("should add a valid guess to history", ()=> {
        const result = submitGuess(state, "5671");
        expect (result.history).toHaveLength(1)
        expect (result.history[0]).toEqual({
            guess: "5671",
            bulls: 0,
            cows: 1,
        })
        expect(result.isWon).toBe(false)
    })

    it("should ignore an invalid guess", ()=>{
        const result = submitGuess(state, "12x4")

        expect(result).toBe(state)
        expect(result.history).toHaveLength(0)
    })

    it("should finish the game when the guess is correct", ()=>{
        const result = submitGuess(state, "1234");
        expect(result.isWon).toBe(true)
        expect (result.history[0]).toEqual({guess: "1234", bulls: 4, cows: 0})
    })

    it("should ignore guesses after winning", ()=> {
        const wonState: GameState = {...state, isWon: true}
        const result = submitGuess(wonState, "5678")
        
        expect(result).toBe(wonState)
        expect(result.history).toHaveLength(0)
    })

})