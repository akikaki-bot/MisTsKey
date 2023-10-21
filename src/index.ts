//
// API WRAPPER 
// :) MisTsKey
//
// I Love Misskey <3

import WebSocket from "ws";
import { Cache } from "./types/cache";
import { HelloWorld } from "./types/helloworld";
import { createUuid } from "./utils/createUUID";
import { GoodbyWorld } from "./types/goodbyworld";
import { GETPOST } from "./posts/post";
import { AccessToken } from "./types/reaction";
import { MeDetailed } from "./types/me";
import { WebSocketState } from "./types/wsState";
import { WebSocketManager } from "../@ws/build";
import {
	BaseClient, 
	ChannelType , 
	Notes , 
	Visibility , 
	Self , 
	TimeLineMessage,
	Instance
} from "./components";
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
export class Client extends BaseClient {

	/**
	 * @deprecated
	 * 
	 * Websocket components were moved to WebSocketManager.
	 *
	 * it will soon deleted in next version.
	 */
	private ws : WebSocket;
	private wsm : WebSocketManager;
	private host : string = "misskey.io";
	private id : string; 
	private accessToken : string;
	private maxResume : number | null;

	public token : string;
	/**
     * # Notes
     * 
     * ノートを取得に関する関数がそろっています。
     * 
     * fetchなどgetなどは、すべてキャッシュを通し行うので一応負荷はかかりません。
     */
	public notes : Notes;
	/**
     * # State
     * 
     * WebSocketの状態を表します。
     * 
     * enum : `WebSocketState`
     * 
     */
	public state : WebSocketState;
	/**
     * # i
     * 
     * 自分自身（アクセストークンユーザー）についてのオブジェクトです。
     * 
     */
	public i : Self;
	/**
     * # cache
     * 
     * TimeLineから送られてきたデータのキャッシュです。
     * 
     * noteIDで取得します。
     */
	public cache : Cache<string, TimeLineMessage>;
	/**
     * # defaultNoteChannelVisibility
     * 
     * ノートの公開範囲を設定します。
     * 
     * @readonly
     * 
     */
	public readonly defaultNoteChannelVisibility : Visibility = "public";

	/**
	 * # instance
	 * 
	 * インスタンスの稼働サーバーの情報について取得します。
	 */
	public instance : Instance;


	constructor(        
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
            host ?: string
            /**
             * # MoreOption.defaultNoteChannel
             * デフォルトで送信するチャンネルを選択します。
             * 
             * 設定がない場合、`public` となります。
             */
            defaultNoteChannel ?: Visibility
			/**
			 * # MoreOption.maxResume
			 * 再接続の上限を設定します。
			 * 
			 * 設定がない場合、上限は設定されません。
			 * 
			 * (無限に再接続される)
			 */
			maxResume ?: number
        }
	) {
		super(channelType);
		this.maxResume = null;
		this.notes = new Notes(this);
		this.cache = new Cache<string, TimeLineMessage>();
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

        

		this.id = createUuid();
	}

	get getHost() {
		return this.host;
	}

	private InitIncetance() {
		this.instance = new Instance(this);
	}

	private __sendHelloWorld() {
		this.emit("debug", "[Streaming / SendHelloWorld] => "+this.host+" / token : "+this.token);

		const Message : HelloWorld = {
			type : "connect",
			body : {
				channel : this.channelType,
				id : this.id
			}
		};

		this.wsm.send(
			JSON.stringify(Message)
		);
	}

	destory() {
		this.emit("debug", "[Streaming / GoodbyWorld] => "+this.host+" / token : "+this.token);

		const Message : GoodbyWorld = {
			type : "disconnect",
			body : {
				id : this.id
			}
		};

		this.wsm.send(
			JSON.stringify(Message)
		);
	}

	getAccessToken() {
		return this.accessToken;
	}

	private __InitLogin( token : string ) {
		this.token = token;
		this.accessToken = token;
		this.state = WebSocketState.init;
	}

	private async InitSelfUser() {
		this.emit("debug", "[API / Getting] Client User [HOST] => "+this.host+" / token : "+this.token);

		GETPOST<AccessToken, MeDetailed>(`https://${this.host}/api/i`, {i : this.token}).then((self) => {
			this.i = new Self(self.data, this);
			this.emit("ready", () => {});
			this.state = WebSocketState.connected;
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
	login(token : string) {
		this.__InitLogin(token);

		this.emit("debug", "[Streaming / Connecting] => "+this.host+" / token : "+this.token);
		
		this.wsm = new WebSocketManager(`wss://${this.host}/streaming?i=${this.token}`, {
			setMaxResume : this.maxResume
		});

		this.wsm.on("debug", (debug) => {
			console.log(debug);
		});

		this.wsm.on("ready", () => {
			this.state = WebSocketState.connecting;
			this.emit("debug", `[Streaming / Successfully] => ${this.host} / Successfully connect!`);
			this.__sendHelloWorld();
			this.InitSelfUser();
			this.InitIncetance();
		});

		//eslint-disable-next-line
		this.wsm.on("message", (msg : any) => {
			const message = JSON.parse(msg.data);
			const MessageClass = new TimeLineMessage(message, this);
			if(typeof MessageClass.message.text !== "string") return;

			this.emit("timelineCreate", MessageClass);
			typeof message.body !== "undefined" ? this.cache.set(MessageClass.message.id, MessageClass) : void 0;
		});

		this.wsm.on("reconnect", () => {
			this.emit("debug" , "[Streaming / ReConnecting] => Reconnect...");
			this.state = WebSocketState.reconnecting;
		});

		this.wsm.on("disconnect", ( cause ) => {
			this.emit("debug" , `[Streaming / Disconnect] => Disconnect from server because : ${cause}`);
		});

	}

	/**
	 * @deprecated
	 * 
	 * Websocket components are moved to WebSocketManager.
	 * 
	 * Will soon deleted in next version.
	 */
	reconnect()  {
		this.ws = new WebSocket(`wss://${this.host}/streaming?i=${this.token}`);
	}

}
// eslint-disable-next-line
export declare interface Client {

	on<E extends keyof ClientEvents>(
		event : E,
		listener : (...args : ClientEvents[E]) => void
	): this

	once<E extends keyof ClientEvents>(
		event : E,
		listener : (...args : ClientEvents[E]) => void
	): this

	emit<E extends keyof ClientEvents>(
		event : E,
		...args : ClientEvents[E]
	)

}

export interface ClientEvents {
	debug : [text : string];
	timelineCreate : [message : TimeLineMessage];
	ready : [() => void];
}