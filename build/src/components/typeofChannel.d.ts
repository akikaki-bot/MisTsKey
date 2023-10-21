import { Client } from "..";
export declare class TypeofChannel<T> {
    private component;
    private client;
    constructor(component: T, client?: Client);
    host(host: string): boolean;
    localOnly(): boolean;
}
