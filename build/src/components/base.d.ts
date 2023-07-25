/// <reference types="node" />
import { EventEmitter } from "node:events";
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
export declare class BaseClient extends EventEmitter {
    channelType: ChannelType;
    constructor(channelType: ChannelType);
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
export type ChannelType = "globalTimeline" | "homeTimeline" | "hybirdTimeline" | "localTimeline" | "main";
