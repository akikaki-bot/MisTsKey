

export class Cache<T = string , Q = any> extends Map {

    private Cache : Map<T, Q> = new Map<T, Q>()

    constructor() {
        super()
    }

    set(key: T, value: Q): this {
        this.Cache.set(key, value)
        return this
    }
}