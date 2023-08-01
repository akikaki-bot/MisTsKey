import { Client } from "..";
import { TimeLineMessage } from "./timelineMessage";
export declare class Notes {
    private client;
    constructor(client: Client);
    fetch(id: string): Promise<TimeLineMessage>;
    get(id: string): TimeLineMessage | null;
}
