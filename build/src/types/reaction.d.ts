export interface Reaction {
    noteId: string;
    reaction: string;
}
export interface DeleteReaction {
    noteId: string;
}
export interface GlobalNoteIdParam {
    noteId: string;
}
export interface GetRenote {
    limit: number;
    sinceId: string;
    untilId: string;
}
export interface AccessToken {
    i: string;
}
