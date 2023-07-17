import { BaseClient, ChannelType } from "./components/base";
import { Cache } from "./components/cache";
import { TimeLineMessage } from "./components/timelineMessage";
import { Self } from "./components/self";
/**
 * # Client
 * -> extends BaseClient
 *
 * @example
 *
 * ```ts
 * const client = new Client("AccessToken","homeTimeline")
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
    /**
     * # i
     *
     * 自分自身（アクセストークンユーザー）についてのオブジェクトです。
     *
     */
    i: Self;
    cache: Cache<string, any>;
    constructor(
    /**
    * ## token
    *
    * アクセストークンを入力してください。
    */
    token: string, 
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
    });
    get getHost(): string;
    private __sendHelloWorld;
    destory(): void;
    getAccessToken(): string;
    private _AccessTokenGetter;
    private InitSelfUser;
    /**
     * # Login
     * -> Method
     *
     *
     * ログインしよう！
     */
    login(): void;
}
export declare interface Client {
    on(event: 'debug', listener: (data: string) => void): this;
    on(event: "timelineCreate", listener: (data: TimeLineMessage) => void): this;
    on(event: "ready", listener: () => void): this;
}
