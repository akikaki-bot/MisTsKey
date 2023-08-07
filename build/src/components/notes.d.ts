import { Client } from "..";
import { getMentionedNotesOption, searchNotesOption } from "../types";
import { Note, TimeLineMessage } from "./";
export declare class Notes {
    private client;
    constructor(client: Client);
    searchNotes(searchQuery: string, options?: Omit<searchNotesOption, "searchQuery">): Promise<Note[]>;
    getMentionedNotes(options?: getMentionedNotesOption): Promise<Note[]>;
    fetch(id: string): Promise<TimeLineMessage>;
    get(id: string): TimeLineMessage | null;
}
