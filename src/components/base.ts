import { EventEmitter } from "node:events"


/**
 * # BaseClient
 * 
 * ---
 * 
 * extends EventEmitter
 * 
 * ---
 * 
 * みすてぃきーのベース！だよ！
 */

export class BaseClient extends EventEmitter {
    public token : string
    public channelType : ChannelType

    constructor(token : string, channelType : ChannelType) {
        super()
        this.token = token
        this.channelType = channelType
    }
}

/**
 *  ## Misskey Streaming API
 *  -> Types : ChannelType
 * 
 * 
 * 
 *  接続するチャンネルを選択します。
 *  
 *  More Info : [Docs](https://misskey-hub.net/docs/api/streaming/channel/)
 *  */
export type ChannelType = 
| "globalTimeline" 
| "homeTimeline"
| "hybirdTimeline"
| "localTimeline"
| "main"