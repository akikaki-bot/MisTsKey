import { Client } from "../";
import { getMentionedNotesOption, searchNotesOption } from "../types";
import { Note, TimeLineMessage } from "./";
export declare class Notes {
    private client;
    constructor(client: Client);
    /**
     * # searchNotes
     *
     * 検索ワードからノートを取得します。
     *
     * @param searchQuery 検索する文字列
     * @param options オプション
     * @returns {Promise<Notes[]>} 検索結果のノートの配列
     */
    searchNotes(searchQuery: string, options?: Omit<searchNotesOption, "searchQuery">): Promise<Note[]>;
    /**
     * # getMentionedNotes
     *
     * ユーザーにメンションされたノートを取得します。
     *
     * @param options オプション
     * @returns {Promise<Notes[]>} メンションされたノートの配列
     */
    getMentionedNotes(options?: getMentionedNotesOption): Promise<Note[]>;
    /**
     * # fetch
     *
     * キャッシュとAPI双方からノートを取得します。
     *
     * キャッシュがなければ `fetch` を行うので、`.get`よりこちらが推奨されます。
     *
     * また、`Note`ではなく`TimeLineMessage`を返すのでご注意ください。
     *
     * @param id 検索するノートのID
     * @returns {Promise<TimeLineMessage>}
     */
    fetch(id: string): Promise<TimeLineMessage>;
    /**
     * # get
     *
     * キャッシュからノートを取得します。
     *
     * キャッシュで見つからなければ`null`を返します。
     *
     * @param id 検索するノートのID
     * @returns {TimeLineMessage | null }
     */
    get(id: string): TimeLineMessage | null;
}
