import { Client } from "..";
import { NoteBody } from "../types/note";
import { MisskeyUser } from "./";
export interface Message {
    type: "channel";
    body: MessageBody;
}
/**
 * # MessageBody
 *
 *  メッセージデータです。
 *
 */
export interface MessageBody {
    id: string;
    type: string;
    body: Note;
}
/**
 * # Note
 *
 * ノート型。
 *
 * いろんなところに使われてるよ。
 *
 * More Info : [Misskey Hub](https://misskey-hub.net/docs/api/entity/note.html)
 *
 * ※拡張済み
 */
export interface BaseNote {
    BodyId: string;
    IsRenoteMessage: boolean;
    id: string;
    createdAt: ISO8601;
    userId: string;
    user: MisskeyUser;
    /**
     * # Notice
     * textはRenoteなど本文がない場合に `null` になります。
     */
    text: string | null;
    cw: string | null;
    visibility: Visibility;
    localOnly: boolean;
    renoteCount: number;
    repliesCount: number;
    reactions: object;
    reactionEmojis: object;
    emojis: object;
    tags: Array<any>;
    fileIds: Array<string>;
    files: Array<any>;
    replyId: any;
    renoteId: any;
    mentions: Array<any>;
    uri: string;
    url: string;
}
export type Visibility = "public" | "home" | "followers" | "specified";
export type ISO8601 = string;
export declare class Note implements BaseNote {
    BodyId: string;
    /**
     * # IsRenoteMessage
     *
     * これはリノートであるかのBooleanです。
     */
    IsRenoteMessage: boolean;
    /**
     * # id
     *
     * メッセージIDです。
     *
     */
    id: string;
    createdAt: ISO8601;
    userId: string;
    /**
     * # user
     *
     * このノートのユーザーについてのオブジェクトです。
     */
    user: MisskeyUser;
    /**
     * # Notice
     * textはRenoteなど本文がない場合に `null` になります。
     */
    text: string | null;
    cw: string | null;
    visibility: Visibility;
    localOnly: boolean;
    renoteCount: number;
    repliesCount: number;
    reactions: object;
    reactionEmojis: object;
    emojis: object;
    tags: Array<any>;
    fileIds: Array<string>;
    files: Array<any>;
    replyId: string;
    renoteId: string;
    mentions: Array<any>;
    uri: string;
    url: string;
    private client;
    constructor(note: BaseNote, client?: Client);
    /**
     * # Reply
     *
     * このノートにリプライをします。
     *
     * Config.ReplyIdは勝手に補充されるので、値を変更する必要はありません。
     * @param {string | null} text
     * @param configs
     * @returns {Promise<Note>}
     *
     *
     * @example
     * ```ts
     * await someMessage.reply('Reply Message', { visibility : "home" })
     * ```
     */
    reply(text: string | null, configs?: NoteBody): Promise<{
        createdNote: Note;
    }>;
    private CreateNoteFunction;
    /**
     * # Delete
     *
     * このノートを消去します。
     */
    delete(): Promise<void>;
}
