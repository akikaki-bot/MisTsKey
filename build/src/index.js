"use strict";
//
// API WRAPPER 
// :) Misskey.ts
//
// I Love Misskey <3
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const ws_1 = __importDefault(require("ws"));
const base_1 = require("./components/base");
const cache_1 = require("./components/cache");
const createUUID_1 = require("./utils/createUUID");
const timelineMessage_1 = require("./components/timelineMessage");
const post_1 = require("./posts/post");
const self_1 = require("./components/self");
class Client extends base_1.BaseClient {
    constructor(
    /**
    * ## token
    *
    * アクセストークンを入力してください。
    */
    token, 
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
        super(token, channelType);
        this.host = "misskey.io";
        this.cache = new cache_1.Cache();
        typeof MoreOption !== "undefined" && typeof MoreOption.host !== "undefined"
            ? this.host = MoreOption.host
            : void 0;
        this.id = (0, createUUID_1.createUuid)();
    }
    __sendHelloWorld() {
        this.emit('debug', "[Streaming / SendHelloWorld] => " + this.host + " / token : " + this.token);
        const Message = {
            type: "connect",
            body: {
                channel: this.channelType,
                id: this.id
            }
        };
        this.ws.send(JSON.stringify(Message));
    }
    destory() {
        this.emit('debug', "[Streaming / GoodbyWorld] => " + this.host + " / token : " + this.token);
        const Message = {
            type: "disconnect",
            body: {
                id: this.id
            }
        };
        this.ws.send(JSON.stringify(Message));
    }
    getAccessToken() {
        return this.accessToken;
    }
    _AccessTokenGetter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.accessToken = this.token;
        });
    }
    InitSelfUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const self = yield (0, post_1.GETPOST)(`https://${this.host}/api/i`, { i: this.token });
            this.i = new self_1.Self(self.data, this);
            this.emit('ready', () => { });
        });
    }
    /**
     * # Login
     * -> Method
     *
     *
     * ログインしよう！
     */
    login() {
        this.emit('debug', "[Streaming / Connecting] => " + this.host + " / token : " + this.token);
        this._AccessTokenGetter();
        this.ws = new ws_1.default(`wss://${this.host}/streaming?i=${this.token}`);
        this.ws.onopen = () => {
            this.__sendHelloWorld();
            this.InitSelfUser();
        };
        this.ws.onmessage = (msg) => {
            const message = JSON.parse(msg.data);
            this.emit("timelineCreate", new timelineMessage_1.TimeLineMessage(message, this));
            typeof message.body !== "undefined" ? this.cache.set(new timelineMessage_1.TimeLineMessage(message, this).message.id, new timelineMessage_1.TimeLineMessage(message, this)) : void 0;
        };
    }
}
exports.Client = Client;
