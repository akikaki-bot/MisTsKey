type uuid = string;
export interface BaseMisTskeyError {
    message: string;
    code: string;
    id: uuid;
    kind: string;
    info: {
        param: string;
        reason: string;
    };
}
export declare class MisTsKeyError extends Error {
    constructor(config: BaseMisTskeyError);
}
export {};
