//
// API WRAPPER 
// :) Misskey.ts
//
// I Love Misskey <3

import WebSocket from "ws";
import { BaseClient, ChannelType } from "./components/base";
import { Cache } from "./components/cache";
import { HelloWorld } from "./components/helloworld";
import { createUuid } from "./utils/createUUID";
import { TimeLineMessage } from "./components/timelineMessage";
import { GoodbyWorld } from "./components/goodbyworld";

export class Client extends BaseClient {

    cache : Cache<string, any>
    private ws : WebSocket
    private host : string = "wss://misskey.io"
    private id : string 
    private accessToken : string

    constructor(        
        /**
        * ## token
        * 
        * アクセストークンを入力してください。
        */
        token : string ,
        /**
         * ## ChannelType
         * 
         *  See On : [Misskey Hub](https://misskey-hub.net/docs/api/streaming/channel/)
         */
        channelType : ChannelType , 
        /**
         * ## オプション
         * 
         * ホスト名等詳細な設定が出来ます。
         */
        MoreOption ?: {
            /**
             * # MoreOption.host 
             * Host名を決定します。
             * 
             * 
             * - Default
             * 
             * デフォルトでは wss://misskey.ioです。
             *  
             * ## 注意 
             * 
             * wss://{host} のような形式で入力してください。
             * 
             * 例 : misskey.ioに設定する場合
             * 
             * ```js
             * MoreOption : {
             *    host : "wss://misskey.io"
             * }
             * ```
             */
            host ?: string
        }
    ) {
        super(token, channelType)

        this.cache = new Cache<string, any>()
        typeof MoreOption !== "undefined" && typeof MoreOption.host !== "undefined" 
        ? this.host = MoreOption.host
        : void 0

        this.id = createUuid()
    }

    private __sendHelloWorld() {
        this.emit('debug', "[Streaming / SendHelloWorld] => "+this.host+" / token : "+this.token)

        const Message : HelloWorld = {
            type : "connect",
            body : {
                channel : this.channelType,
                id : this.id
            }
        };

        this.ws.send(
            JSON.stringify(Message)
        )
    }

    destory() {
        this.emit('debug', "[Streaming / GoodbyWorld] => "+this.host+" / token : "+this.token)

        const Message : GoodbyWorld = {
            type : "disconnect",
            body : {
                id : this.id
            }
        };

        this.ws.send(
            JSON.stringify(Message)
        )
    }

    getAccessToken() {
        return this.accessToken
    }

    private async _AccessTokenGetter(){
        this.accessToken = this.token
    }

    /**
     * # Login
     * -> Method
     * 
     * 
     * ログインしよう！
     */
    login() {
        this.emit('debug', "[Streaming / Connecting] => "+this.host+" / token : "+this.token)
        this._AccessTokenGetter()
        this.ws = new WebSocket(`${this.host}/streaming?i=${this.token}`)

        this.ws.onopen = () => {
            this.__sendHelloWorld()
        }

        this.ws.onmessage = ( msg : any ) => {
            const message = JSON.parse(msg.data)

            this.emit("timelineCreate", new TimeLineMessage(message, this))
            typeof message.body !== "undefined" ? this.cache.set(new TimeLineMessage(message, this).message.id, new TimeLineMessage(message, this)) : void 0
        }
    }

    
}


export declare interface Client {
    on(event :'debug', listener: ( data: string ) => void): this
    on(event : "timelineCreate", listener : (data : TimeLineMessage) => void) : this
}