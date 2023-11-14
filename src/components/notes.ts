import { Client } from "../";
import { GETPOST } from "../posts";
import { getMentionedNotesOption, searchNotesOption } from "../types";
import { AccessToken, GlobalNoteIdParam } from "../types/reaction";
import { WebSocketState } from "../types/wsState";
import { 
	BaseNote, 
	Note , 
	TimeLineMessage 
} from "./";

// Client.Notes
export class Notes {

	private client : Client;

	constructor(client : Client) {
		this.client = client;
	}

	/**
	 * # searchNotes
	 *
	 * 検索ワードからノートを取得します。
	 * 
	 * @param searchQuery 検索する文字列 
	 * @param options オプション
	 * @returns {Promise<Notes[]>} 検索結果のノートの配列
	 */
	async searchNotes(searchQuery : string , options ?: Omit<searchNotesOption, "searchQuery">) : Promise<Note[]>{
		const ResData = await GETPOST<AccessToken & searchNotesOption, BaseNote[]>(`https://${this.client.getHost}/notes/search`, {
			i : this.client.token,
			...Object.assign({searchQuery : searchQuery}, options)
		});
		return ResData.data.map(v => new Note(v));
	}

	/**
	 * # getMentionedNotes
	 * 
	 * ユーザーにメンションされたノートを取得します。
	 * 
	 * @param options オプション
	 * @returns {Promise<Notes[]>} メンションされたノートの配列
	 */
	async getMentionedNotes( options ?: getMentionedNotesOption ) : Promise<Note[]> {
		const ResData = await GETPOST<AccessToken & getMentionedNotesOption , BaseNote[]>(`https://${this.client.getHost}/notes/mentions`, {
			i : this.client.token,
			...options
		});
		return ResData.data.map(v => new Note(v));
	}

	/**
	 * # fetch
	 * 
	 * キャッシュとAPI双方からノートを取得します。
	 * 
	 * キャッシュがなければ `fetch` を行うので、`.get`よりこちらが推奨されます。
	 * 
	 * また、`Note`ではなく`TimeLineMessage`を返すのでご注意ください。
	 * 
	 * @param id 検索するノートのID
	 * @returns {Promise<TimeLineMessage>}
	 */
	async fetch( id : string ) : Promise<TimeLineMessage> {
		const Message = this.client.cache.get(id);
		if(!Message && (this.client.state === WebSocketState.connected)) {
			const RESData = await GETPOST<AccessToken & GlobalNoteIdParam, Note>(`https://${this.client.getHost}/notes/show`, {
				i : this.client.token,
				noteId : id
			});
			return new TimeLineMessage(
				{ 
					type : "channel", 
					body : { 
						id : id, 
						type : "fetchedMessage", 
						body : RESData.data 
					} 
				}, this.client);
		} else {
			return Message;
		}
	}

	/**
	 * # get
	 * 
	 * キャッシュからノートを取得します。
	 * 
	 * キャッシュで見つからなければ`null`を返します。
	 * 
	 * @param id 検索するノートのID
	 * @returns {TimeLineMessage | null }
	 */
	get( id : string ) : TimeLineMessage | null {
		const Message = this.client.cache.get(id) ?? null;
		return Message;
	}
}