export declare class CreatePoll {
    choices?: Array<string>;
    multiple?: boolean;
    expiresAt?: number;
    expiredAfter?: number;
    constructor();
    addChoice(value: string): this;
    setMultiple(multiple?: boolean): this;
    setExpiresAt(expiresAt: Date): this;
    setExpiresAfter(sec: number): this;
    toJSON(): Poll;
}
export interface Poll {
    choices: string[];
    multiple: boolean;
    expiresAt: number | null;
    expiredAfter: number | null;
}
