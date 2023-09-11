import { Client } from "..";
import { ServerMeta } from "./meta";
export declare class Instance {
    private client;
    constructor(client?: Client);
    getMeta(detail?: boolean): Promise<ServerMeta>;
}
