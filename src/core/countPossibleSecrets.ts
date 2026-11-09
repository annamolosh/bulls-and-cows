const cache = new Map<string, number>()

export function countPossibleSecrets (length: number, base: number): number {
    if(length < 1 || base <1 ){
        return 0
    }
    if(length > base) {
        return 0
    }

    const key = `${length},${base}`
    const cacheResult = cache.get(key)

    if (cacheResult !== undefined) {
        return cacheResult
    }

    let result: number
    if (length === 1){
        result = base
    } else {
        result = base * countPossibleSecrets(length-1, base -1)
    }
    
    cache.set(key,result)
    return result
}