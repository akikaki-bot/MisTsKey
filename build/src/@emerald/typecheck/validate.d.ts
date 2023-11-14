/**
 * ## Emerald - BasedObject
 *
 * 基礎となるオブジェクトのユーティリティー関数を実装している部分。
 *
 */
export declare class BasedObject<T = unknown> {
    private _object;
    constructor(object: T);
    merge<U extends T>(value: U): T & U;
    mergeNullValue<U extends T, M extends keyof U>(value: M extends string ? M : never, newer: U[M] | null, isNull: U[M]): T & {
        [x: string]: U[M];
    };
    mergeNullObject<U extends T>(value: U, isNull: U): T & U;
    remove(key: string): T;
    get Object(): T;
}
/**
 * ## Emerald - ObjectVaildater
 *
 * オブジェクトを正しい形へと導くエメラルドパッケージ。
 *
 * `Emerald BasedObject`を親にしています。
 */
export declare class EmeraldObjectVaildater<T = unknown> extends BasedObject<T> {
    private defaultValue;
    constructor(object: T);
    default(value: T): void;
    parse(value: T | undefined): T;
}
