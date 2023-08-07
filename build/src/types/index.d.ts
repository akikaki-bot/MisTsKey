import { Visibility } from "../components";
export interface getMentionedNotesOption {
    following: boolean;
    limit: number;
    sinceId?: string;
    untilId?: string;
    visibility?: Visibility;
}
export interface searchNotesOption {
    searchQuery: string;
    sinceId?: string;
    untilId?: string;
    limit: number;
    offset: number;
    host: string | null;
    userId: string | null;
    channelId: string | null;
}
