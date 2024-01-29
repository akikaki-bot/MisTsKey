import { Client } from "..";
import { Paths } from "../http/paths";
import { 
	AccessToken, 
	DeleteReaction, 
	GetRenote, 
	GlobalNoteIdParam, 
	GlobalReNoteIdParam, 
	Reaction 
} from "../types/reaction";
import { 
	BaseMisTskeyError ,
	Message, 
	Note,
	TypeofChannel
} from "./";


export class TimeLineMessage {
	
	/**
	 * ## message
	 * 
	 * メッセージ（Note）についてのやつ
	 */
	public message : Note;
	private client : Client; 
	/**
	 * ## 条件分岐クラス
	 * 
	 * 条件分岐に関するクラスです。
	 * グローバルタイムラインを使用し、なおかつホストフィルター等を利用する場合はこれを利用してください。
	 * 
	 * @example
	 * if(TimeLineMessage.typeof.host("misskey.io")) {
	 * 		console.log('this message was sent from misskey.io <3')
	 * }
	 */
	public typeof : TypeofChannel<Note>;

	constructor(data : Message, client : Client) {
		this.client = client;
		this.message = new Note(data.body.body, client);
		this.message.BodyId = data.body.id;
		this.message.text === null ? this.message.IsRenoteMessage = true : this.message.IsRenoteMessage = false;
		this.typeof = new TypeofChannel<Note>(this.message, this.client);
	}

	/**
	 * # Renote
	 * 
	 * このメッセージ、または指定メッセージをRenoteします。
	 * 
	 * @param {Partial<{ noteId : string}>} config
	 */
	async renote(config ?: Partial<{ noteId : string }>) : Promise<Note> {
		const NoteId = config ? config.noteId ? config.noteId : this.message.id : this.message.id;
		const data = await this.client.http.GETPOST<GlobalReNoteIdParam & AccessToken , { createdNote : Note , error ?: BaseMisTskeyError }>(Paths.Renote, {
			i : this.client.token,
			renoteId : NoteId
		});
		return data.data.createdNote;
	}

	/**
	 * # unRenote
	 * 
	 * このメッセージ、または指定メッセージをunRenoteします。
	 * 
	 * @param {Partial<{ noteId : string}>} config
	 */
	async unRenote(config ?: Partial<{ noteId : string }>) : Promise<void> {
		const NoteId = config ? config.noteId ? config.noteId : this.message.id : this.message.id;
		await this.client.http.POST<GlobalReNoteIdParam & AccessToken>(Paths.UnRenote, {
			i : this.client.token,
			renoteId : NoteId
		});
	}

	/**
	 * # GetRenote
	 * 
	 * このメッセージ、または指定メッセージのRenote情報を取得します。
	 * 
	 * @param {string} noteId 
	 * @param {number} limit 
	 * @param {string} sinceId 
	 * @param {string} untilId 
	 * @returns {Array<Note>} 
	 * 
	 * * Arr Length : limit
	 */
	async getRenote(config ?: Partial<{noteId : string , limit : number , sinceId : string , untilId : string}> ) {
		const NoteId = config.noteId ? config.noteId : this.message.id;
		const data = await this.client.http.GETPOST<GlobalNoteIdParam & Partial<GetRenote> & AccessToken , Array<Note>>(Paths.GetRenote, {
			i : this.client.token , 
			noteId : NoteId,
			limit : config.limit,
			sinceId : config.sinceId,
			untilId : config.untilId
		});

		return data.data;
	}

	/**
	 * # favoriteCreate
	 * 
	 * このメッセージをお気に入りにします。
	 */
	async favoriteCreate() {
		const NoteId = this.message.id;
		await this.client.http.POST<GlobalNoteIdParam & AccessToken>(Paths.favoritesCreate, {i : this.client.token , noteId : NoteId });
	}

	/**
	 * # favoriteDelete
	 * 
	 * このメッセージのお気に入りを解除します。
	 */
	async favoriteDelete() {
		const NoteId = this.message.id;
		await this.client.http.POST<GlobalNoteIdParam & AccessToken>(Paths.favoritesDelete, {i : this.client.token , noteId : NoteId});
	}


	/**
	 * # Reaction
	 * このメッセージにリアクションをします。
	 * 
	 * @param {string} reactionEmoji リアクションする絵文字
	 * 
	 * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/create.html)
	 */
	async reaction(reactionEmoji : string) {
		const NoteId = this.message.id;
		await this.client.http.POST<
		Reaction & AccessToken
		>(Paths.NoteReactionsCreate,
			{
				i : this.client.token , 
				noteId : NoteId , 
				reaction : reactionEmoji
			}
		);
	}

	/**
	 * # Reaction
	 * このメッセージのリアクションをすべて消します。
	 * 
	 * もしあなたがリアクションをしていなければ、エラーがThrowされます。
	 * 
	 * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/delete.html)
	 */
	async reactionDelete() {
		const NoteId = this.message.id;
		await this.client.http.POST<
		DeleteReaction & AccessToken
		>("/api/notes/reactions/delete",
			{
				i : this.client.token , 
				noteId : NoteId , 
			}
		);
	}

}