import { Cache } from "./types/cache";
import { WebSocketState } from "./types/wsState";
import { BaseClient, ChannelType, Notes, Visibility, Self, TimeLineMessage, Instance } from "./components";
/**
 * # Client
 *
 * ---
 *
 * extends BaseClient
 *
 * ---
 *
 * みすてぃきーへようこそ！
 *
 * Welcome to MisTsKey!
 *
 *
 * @example
 *
 * ```ts
 * const client = new Client("homeTimeline")
 *
 * client.login('Your Access Token')
 *
 * client.on('ready' , () => {
 *    console.log(`Loggined in ${client.i.username}`)
 * })
 * ```
 */
export declare class Client extends BaseClient {
    /**
     * @deprecated
     *
     * Websocket components were moved to WebSocketManager.
     *
     * it will soon deleted in next version.
     */
    private ws;
    private wsm;
    private host;
    private id;
    private accessToken;
    private maxResume;
    token: string;
    /**
     * # Notes
     *
     * ノートを取得に関する関数がそろっています。
     *
     * fetchなどgetなどは、すべてキャッシュを通し行うので一応負荷はかかりません。
     */
    notes: Notes;
    /**
     * # State
     *
     * WebSocketの状態を表します。
     *
     * enum : `WebSocketState`
     *
     */
    state: WebSocketState;
    /**
     * # i
     *
     * 自分自身（アクセストークンユーザー）についてのオブジェクトです。
     *
     */
    i: Self;
    /**
     * # cache
     *
     * TimeLineから送られてきたデータのキャッシュです。
     *
     * noteIDで取得します。
     */
    cache: Cache<string, TimeLineMessage>;
    /**
     * # defaultNoteChannelVisibility
     *
     * ノートの公開範囲を設定します。
     *
     * @readonly
     *
     */
    readonly defaultNoteChannelVisibility: Visibility;
    /**
     * # instance
     *
     * インスタンスの稼働サーバーの情報について取得します。
     */
    instance: Instance;
    constructor(
    /**
     * ## ChannelType
     *
     *  See On : [Misskey Hub](https://misskey-hub.net/docs/api/streaming/channel/)
     */
    channelType: ChannelType, 
    /**
     * ## オプション
     *
     * ホスト名等詳細な設定が出来ます。
     */
    MoreOption?: {
        /**
         * # MoreOption.host
         * Host名を決定します。
         *
         *
         * - Default
         *
         * デフォルトでは misskey.ioです。
         *
         * ## 注意
         *
         * 例 : ホストをmisskey.ioに設定する場合
         *
         * ```js
         * MoreOption : {
         *    host : "misskey.io"
         * }
         * ```
         */
        host?: string;
        /**
         * # MoreOption.defaultNoteChannel
         * デフォルトで送信するチャンネルを選択します。
         *
         * 設定がない場合、`public` となります。
         */
        defaultNoteChannel?: Visibility;
        /**
         * # MoreOption.maxResume
         * 再接続の上限を設定します。
         *
         * 設定がない場合、上限は設定されません。
         *
         * (無限に再接続される)
         */
        maxResume?: number;
    });
    get getHost(): string;
    private InitIncetance;
    private __sendHelloWorld;
    destory(): void;
    getAccessToken(): string;
    private __InitLogin;
    private InitSelfUser;
    /**
     * # Login
     * -> Method
     *
     *
     * ログインしよう！
     *
     * @param {string} token アクセストークンを入力してください。
     *
     */
    login(token: string): void;
    /**
     * @deprecated
     *
     * Websocket components are moved to WebSocketManager.
     *
     * Will soon deleted in next version.
     */
    reconnect(): void;
}
export declare interface Client {
    on<E extends keyof ClientEvents>(event: E, listener: (...args: ClientEvents[E]) => void): this;
    once<E extends keyof ClientEvents>(event: E, listener: (...args: ClientEvents[E]) => void): this;
    emit<E extends keyof ClientEvents>(event: E, ...args: ClientEvents[E]): any;
}
export interface ClientEvents {
    debug: [text: string];
    timelineCreate: [message: TimeLineMessage];
    ready: [() => void];
}
