import { Cache } from "./types/cache";
import { WebSocketState } from "./types/wsState";
import { BaseClient, ChannelType, Notes, Visibility, Self, TimeLineMessage } from "./components";
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
    private ws;
    private host;
    private id;
    private accessToken;
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
    });
    get getHost(): string;
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
    reconnect(): void;
}
export declare interface Client {
    on(event: 'debug', listener: (data: string) => void): this;
    on(event: "timelineCreate", listener: (data: TimeLineMessage) => void): this;
    /**
     * @deprecated
     * このイベントは１回だけでなく複数回実行される可能性があります。
     *
     * よって、もしあなたが一度きりの実行にしたい場合は`.once`イベントを使用してください。
     *
     * ---
     *
     * The event may be emitted not just once, but multiple times—twice or more.
     *
     * Therefore, if you do not want the event to be emitted more than twice, please make use of the `.once` event.
     */
    on(event: "ready", listener: () => void): this;
    once(event: "ready", listener: () => void): this;
}
