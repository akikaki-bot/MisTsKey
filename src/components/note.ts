import { Client } from "..";
import { NoteBody, _NoteBody } from "../types/note";
import { AccessToken } from "../types/reaction";
import { MisskeyUser } from ".";

export interface Message {
    type : "channel",
    body : MessageBody
}
/**
 * # MessageBody
 * 
 *  メッセージデータです。
 * 
 */
export interface MessageBody {
    id : string
    type : string
    body : Note
}

/**
 * # Note
 * 
 * ノート型。
 * 
 * いろんなところに使われてるよ。
 * 
 * More Info : [Misskey Hub](https://misskey-hub.net/docs/api/entity/note.html)
 * 
 * ※拡張済み
 */
export interface BaseNote {
    BodyId : string
    IsRenoteMessage : boolean
    id : string
    createdAt : ISO8601
    userId : string
    user : MisskeyUser
    /**
     * # Notice
     * textはRenoteなど本文がない場合に `null` になります。 
     */
    text : string | null
    cw : string | null
    visibility : Visibility
    localOnly : boolean
    renoteCount : number
    repliesCount : number
    reactions : object
    reactionEmojis : object
    emojis : object
    tags : Array<any>	//eslint-disable-line
    fileIds : Array<string>,
    files : Array<any>,	//eslint-disable-line
    replyId : any	//eslint-disable-line
    renoteId : any,	//eslint-disable-line
    mentions : Array<any>	//eslint-disable-line
    uri : string
    url : string
}
export type Visibility = "public" | "home" | "followers" | "specified"
export type ISO8601 = string

export class Note implements BaseNote {
	BodyId : string;
	/**
     * # IsRenoteMessage
     * 
     * これはリノートであるかのBooleanです。
     */
	IsRenoteMessage : boolean;
	/**
     * # id
     * 
     * メッセージIDです。
     *
     */
	id : string;
	createdAt : ISO8601;
	userId : string;
	/**
     * # user
     * 
     * このノートのユーザーについてのオブジェクトです。
     */
	user : MisskeyUser;
	/**
     * # Notice
     * textはRenoteなど本文がない場合に `null` になります。 
     */
	text : string | null;
	cw : string | null;
	visibility : Visibility;
	localOnly : boolean;
	renoteCount : number;
	repliesCount : number;
	reactions : object;
	reactionEmojis : object;
	emojis : object;
	tags : Array<any>;	//eslint-disable-line
	fileIds : Array<string>;
	files : Array<any>;	//eslint-disable-line
	replyId : string;
	renoteId : string;
	mentions : Array<any>;	//eslint-disable-line
	/**
	 * 投稿され、生成されたノートのURL
	 */
	uri : string;
	/**
	 * たまにかえって来るURL。
	 * 
	 * 何なのかはわかりません、、、Githubで良ければご報告ください、、、。
	 */
	url : string;
	/**
	 * どこのインスタンスから来たか
	 */
	comefrom : string;

	private client : Client;

	constructor(note : BaseNote, client ?: Client) {
		this.BodyId = note.BodyId;
		this.IsRenoteMessage = note.IsRenoteMessage;
		this.id = note.id;
		this.createdAt = note.createdAt;
		this.userId = note.userId;
		this.user = new MisskeyUser(note.user , client);
		this.text = note.text;
		this.cw = note.cw;
		this.visibility = note.visibility;
		this.localOnly = note.localOnly;
		this.renoteCount = note.renoteCount;
		this.repliesCount = note.repliesCount;
		this.reactions = note.reactions;
		this.reactionEmojis = note.reactionEmojis;
		this.emojis = note.emojis;
		this.tags = note.tags;
		this.fileIds = note.fileIds;
		this.files = note.files;
		this.replyId = note.replyId;
		this.renoteId = note.renoteId;
		this.mentions = note.mentions;
		this.uri = note.uri;
		this.url = note.url;
		this.client = client;
		this.comefrom = typeof client === "object" && ( typeof note.uri === "undefined" ? client.getHost : note.uri.split("/")[2] );
	}
    
	/**
     * # Reply
     * 
     * このノートにリプライをします。
     * 
     * Config.ReplyIdは勝手に補充されるので、値を変更する必要はありません。
     * @param {string | null} text 
     * @param configs 
     * @returns {Promise<Note>}
     * 
     * 
     * @example
     * ```ts
     * await someMessage.reply('Reply Message', { visibility : "home" })
     * ```
     */
	async reply( text : string | null , configs ?: NoteBody) { 
		configs.replyId = this.replyId;
		const conf = this.CreateNoteFunction(text , configs);

		const Response = await this.client.http.GETPOST<_NoteBody & AccessToken, { createdNote : BaseNote }>(
			"/api/notes/create",
			Object.assign(
				conf,
				{i : this.client.token}
			)
		);
		return new Note(Response.data.createdNote, this.client);
	}

	private CreateNoteFunction( text : string , body : NoteBody ) : _NoteBody {
		if(typeof body === "undefined") {
			return {
				text : text,
				visibility : this.client.defaultNoteChannelVisibility,
				visibleUserIds : [],
				cw : null,
				localOnly : false,
				noExtractMentions : false,
				noExtractEmojis : false,
				noExtractHashtags : false,
				replyId : null,
				renoteId : null,
				channelId : null,
				poll : null
			};
		}
		return {
			text : text,
			visibility : body.visibility ?? this.client.defaultNoteChannelVisibility,
			visibleUserIds : body.visibleUserIds ?? [],
			cw : body.cw ?? null,
			localOnly : body.localOnly ?? false,
			noExtractMentions : body.noExtractMentions ?? false,
			noExtractEmojis : body.noExtractEmojis ?? false,
			noExtractHashtags : body.noExtractHashtags ?? false,
			fileIds : body.fileIds,
			mediaIds : body.mediaIds,
			replyId : body.replyId ?? null,
			renoteId : body.renoteId ?? null,
			channelId : body.channelId ?? null,
			poll : body.poll.toJSON() ?? null
		};
	}

	/**
       * # Delete
	   * @returns `Promise<void>`
       * 
       * このノートを消去します。
       */
	async delete() {
		await this.client.http.POST<AccessToken & { noteId : string }>("/api/notes/delete",
			{ i : this.client.token , noteId : this.id}
		);
	}

	/**
	 * # getChildren
	 * @returns `Promise<Note[] | []>`
	 * 
	 */
	async getChildren({ limit = 10 , sinceId , untilId } : { limit ?: number , sinceId ?: string, untilId ?: string }) {
		const Response = await this.client.http.GETPOST<{ noteId : string , limit : number , sinceId : string, untilId : string} , BaseNote[]>("/api/notes/children",
			{ noteId : this.id , limit : limit, sinceId : sinceId, untilId : untilId }
		);

		return Response.data.length > 0 
			? Response.data.map(v => new Note(v , this.client)) 
			: [];
	}
}
