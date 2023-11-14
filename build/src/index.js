"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
//
// API WRAPPER 
// :) MisTsKey
//
// I Love Misskey <3
const cache_1 = require("./types/cache");
const createUUID_1 = require("./utils/createUUID");
const post_1 = require("./posts/post");
const wsState_1 = require("./types/wsState");
const mistskey_websocket_manager_1 = require("mistskey-websocket-manager");
const components_1 = require("./components");
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
// eslint-disable-next-line
class Client extends components_1.BaseClient {
    constructor(
    /**
     * ## ChannelType
     *
     *  See On : [Misskey Hub](https://misskey-hub.net/docs/api/streaming/channel/)
     */
    channelType, 
    /**
     * ## オプション
     *
     * ホスト名等詳細な設定が出来ます。
     */
    MoreOption) {
        super(channelType);
        this.host = "misskey.io";
        /**
         * # defaultNoteChannelVisibility
         *
         * ノートの公開範囲を設定します。
         *
         * @readonly
         *
         */
        this.defaultNoteChannelVisibility = "public";
        this.maxResume = null;
        this.notes = new components_1.Notes(this);
        this.cache = new cache_1.Cache();
        typeof MoreOption !== "undefined" && typeof MoreOption.host !== "undefined"
            ? this.host = MoreOption.host
            : void 0;
        //Issue #3
        typeof this.defaultNoteChannelVisibility !== "undefined" ?
            this.defaultNoteChannelVisibility = MoreOption.defaultNoteChannel :
            this.defaultNoteChannelVisibility = "public";
        typeof MoreOption !== "undefined" && typeof MoreOption.maxResume !== "undefined"
            ? this.maxResume = MoreOption.maxResume
            : void 0;
        this.id = (0, createUUID_1.createUuid)();
    }
    get getHost() {
        return this.host;
    }
    InitIncetance() {
        this.instance = new components_1.Instance(this);
    }
    __sendHelloWorld() {
        this.emit("debug", "[Streaming / SendHelloWorld] => " + this.host + " / token : " + this.token);
        const Message = {
            type: "connect",
            body: {
                channel: this.channelType,
                id: this.id
            }
        };
        this.wsm.send(JSON.stringify(Message));
    }
    destory() {
        this.emit("debug", "[Streaming / GoodbyWorld] => " + this.host + " / token : " + this.token);
        const Message = {
            type: "disconnect",
            body: {
                id: this.id
            }
        };
        this.wsm.send(JSON.stringify(Message));
    }
    getAccessToken() {
        return this.accessToken;
    }
    __InitLogin(token) {
        this.token = token;
        this.accessToken = token;
        this.state = wsState_1.WebSocketState.init;
    }
    InitSelfUser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("debug", "[API / Getting] Client User [HOST] => " + this.host + " / token : " + this.token);
            (0, post_1.GETPOST)(`https://${this.host}/api/i`, { i: this.token }).then((self) => {
                this.i = new components_1.Self(self.data, this);
                this.emit("ready", () => { });
                this.state = wsState_1.WebSocketState.connected;
            });
        });
    }
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
    login(token) {
        this.__InitLogin(token);
        this.emit("debug", "[Streaming / Connecting] => " + this.host + " / token : " + this.token);
        this.wsm = new mistskey_websocket_manager_1.WebSocketManager(`wss://${this.host}/streaming?i=${this.token}`, {
            setMaxResume: this.maxResume
        });
        this.wsm.on("debug", (debug) => {
            console.log(debug);
        });
        this.wsm.on("ready", () => {
            this.state = wsState_1.WebSocketState.connecting;
            this.emit("debug", `[Streaming / Successfully] => ${this.host} / Successfully connect!`);
            this.__sendHelloWorld();
            this.InitSelfUser();
            this.InitIncetance();
        });
        //eslint-disable-next-line
        this.wsm.on("message", (msg) => {
            const message = JSON.parse(msg.data);
            const MessageClass = new components_1.TimeLineMessage(message, this);
            if (typeof MessageClass.message.text !== "string")
                return;
            this.emit("timelineCreate", MessageClass);
            typeof message.body !== "undefined" ? this.cache.set(MessageClass.message.id, MessageClass) : void 0;
        });
        this.wsm.on("reconnect", () => {
            this.emit("debug", "[Streaming / ReConnecting] => Reconnect...");
            this.state = wsState_1.WebSocketState.reconnecting;
        });
        this.wsm.on("disconnect", (cause) => {
            this.emit("debug", `[Streaming / Disconnect] => Disconnect from server because : ${cause}`);
        });
    }
    /**
     * @deprecated
     *
     * Websocket components are moved to WebSocketManager.
     *
     * Will soon deleted in next version.
     */
    reconnect() {
    }
}
exports.Client = Client;
