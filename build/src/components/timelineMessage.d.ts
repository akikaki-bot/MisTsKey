import { Client } from "..";
import { Message, Note } from "./";
export declare class TimeLineMessage {
    /**
     * ## message
     *
     * メッセージ（Note）についてのやつ
     */
    message: Note;
    private client;
    constructor(data: Message, client: Client);
    /**
     * # Renote
     *
     * このメッセージ、または指定メッセージをRenoteします。
     *
     * @param {Partial<{ noteId : string}>} config
     */
    renote(config?: Partial<{
        noteId: string;
    }>): Promise<Note>;
    /**
     * # unRenote
     *
     * このメッセージ、または指定メッセージをunRenoteします。
     *
     * @param {Partial<{ noteId : string}>} config
     */
    unRenote(config?: Partial<{
        noteId: string;
    }>): Promise<void>;
    /**
     * # GetRenote
     *
     * このメッセージ、または指定メッセージのRenote情報を取得します。
     *
     * @param {string} noteId
     * @param {number} limit
     * @param {string} sinceId
     * @param {string} untilId
     * @returns {Array<Note>}
     *
     * * Arr Length : limit
     */
    getRenote(config?: Partial<{
        noteId: string;
        limit: number;
        sinceId: string;
        untilId: string;
    }>): Promise<Note[]>;
    /**
     * # favoriteCreate
     *
     * このメッセージをお気に入りにします。
     */
    favoriteCreate(): Promise<void>;
    /**
     * # favoriteDelete
     *
     * このメッセージのお気に入りを解除します。
     */
    favoriteDelete(): Promise<void>;
    /**
     * # Reaction
     * このメッセージにリアクションをします。
     *
     * @param {string} reactionEmoji リアクションする絵文字
     *
     * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/create.html)
     */
    reaction(reactionEmoji: string): Promise<void>;
    /**
     * # Reaction
     * このメッセージのリアクションをすべて消します。
     *
     * もしあなたがリアクションをしていなければ、エラーがThrowされます。
     *
     * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/delete.html)
     */
    reactionDelete(): Promise<void>;
}
