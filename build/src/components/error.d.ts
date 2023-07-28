type uuid = string;
export interface BaseMisTskeyError {
    message: string;
    code: string;
    id: uuid;
    kind: string;
}
export declare class MisTsKeyError extends Error implements BaseMisTskeyError {
    message: string;
    code: string;
    id: string;
    kind: string;
    constructor(config: BaseMisTskeyError);
}
export {};
