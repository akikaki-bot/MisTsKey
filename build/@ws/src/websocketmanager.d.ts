/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter, MessageEvent } from "ws";
export interface IWebSocketManagerOptions {
    /**
     * ## setMaxResult
     *
     * ---
     *
     * Set the resume counts.
     *
     * By the default : `None`
     *
     * If the server is down, reconnecting will be **useless**.
     *
     * Also, since reconnection becomes a considerable load,
     *
     * WebSocketManager will stop the WebSocket if this number of times is exceeded.
     *
     * ---
     *
     * 再試行回数を設定します。
     *
     * デフォルト : `なし`
     *
     * もしインスタンスがダウンしている場合、再接続は**無駄な処理**となってしまいます。
     *
     * なので、負荷防止＆プロセスの軽量化のためにWebSocketManagerはWebSocketをこの回数を越えた場合に
     *
     * 再接続動作を停止します。
     */
    setMaxResume: number;
    /**
     * ## resumeScond
     *
     * ---
     *
     * Set the resume secound.
     *
     * By the default : `10`(s)
     *
     * Resume Second will take longer and longer depending on the number of times you retry.
     *
     * ---
     *
     * 再試行する間隔の秒数を定義します。
     *
     * デフォルト : `10`(秒)
     *
     * 再試行する間隔は、再試行する回数に応じてどんどん伸びていきます。
     */
    resumeSecond: number;
}
export declare class WebSocketManager extends EventEmitter {
    private url;
    private websocket;
    private resumeSecond;
    private isReconnect;
    private maxResume;
    private resumeCound;
    constructor(url: URL | string, websocketOptions?: Partial<IWebSocketManagerOptions>);
    private reconnect;
    private run;
    send(anyMessage: BufferLike): void;
    private traseLog;
}
export declare interface WebSocketManager {
    on<E extends keyof ClientEvents>(event: E, listener: (...args: ClientEvents[E]) => void): this;
    once<E extends keyof ClientEvents>(event: E, listener: (...args: ClientEvents[E]) => void): this;
    emit<E extends keyof ClientEvents>(event: E, ...args: ClientEvents[E]): any;
}
export interface ClientEvents {
    debug: [message: string];
    reconnect: [() => void];
    ready: [() => void];
    disconnect: [cause: Cause];
    message: [message: MessageEvent];
}
export type Cause = "Error" | "Disconnect" | "Connect";
export type BufferLike = string | Buffer | DataView | number | ArrayBufferView | Uint8Array | ArrayBuffer | SharedArrayBuffer | ReadonlyArray<any> | ReadonlyArray<number> | {
    valueOf(): ArrayBuffer;
} | {
    valueOf(): SharedArrayBuffer;
} | {
    valueOf(): Uint8Array;
} | {
    valueOf(): ReadonlyArray<number>;
} | {
    valueOf(): string;
} | {
    [Symbol.toPrimitive](hint: string): string;
};
