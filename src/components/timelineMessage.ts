import { Client } from "..";
import { GETPOST, POST } from "../posts/post";
import { AccessToken, DeleteReaction, GetRenote, GlobalNoteIdParam, GlobalReNoteIdParam, Reaction } from "../types/reaction";
import { BaseMisTskeyError, MisTsKeyError } from "./error";
import { Message, Note } from "./message";


export class TimeLineMessage {
    
    /**
     * ## message
     * 
     * メッセージ（Note）についてのやつ
     */
    public message : Note
    private client : Client 

    constructor(data : Message, client : Client) {
        this.client = client
        this.message = new Note(data.body.body, client)
        this.message.BodyId = data.body.id
        this.message.text === null ? this.message.IsRenoteMessage = true : this.message.IsRenoteMessage = false
    }

    /**
     * # Renote
     * 
     * このメッセージ、または指定メッセージをRenoteします。
     * 
     * @param {Partial<{ noteId : string}>} config
     */
    async renote(config ?: Partial<{ noteId : string }>) : Promise<Note> {
        const NoteId = config ? config.noteId ? config.noteId : this.message.id : this.message.id
        const data = await GETPOST<GlobalReNoteIdParam & AccessToken , { createdNote : Note , error ?: BaseMisTskeyError }>(`https://${this.client.getHost}/api/notes/create`, {
            i : this.client.token,
            renoteId : NoteId
        })
        return data.data.createdNote
    }

    /**
     * # unRenote
     * 
     * このメッセージ、または指定メッセージをunRenoteします。
     * 
     * @param {Partial<{ noteId : string}>} config
     */
    async unRenote(config ?: Partial<{ noteId : string }>) : Promise<void> {
        const NoteId = config ? config.noteId ? config.noteId : this.message.id : this.message.id
        await POST<GlobalReNoteIdParam & AccessToken>(`https://${this.client.getHost}/api/notes/unrenote`, {
            i : this.client.token,
            renoteId : NoteId
        })
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
        const NoteId = config.noteId ? config.noteId : this.message.id
        const data = await GETPOST<GlobalNoteIdParam & Partial<GetRenote> & AccessToken , Array<Note>>(`https://${this.client.getHost}/api/notes/renotes`, {
            i : this.client.token , 
            noteId : NoteId,
            limit : config.limit,
            sinceId : config.sinceId,
            untilId : config.untilId
        })

        return data.data
    }

    /**
     * # Like
     * 
     * このメッセージをLikeします。
     */
    async like() {
        const NoteId = this.message.id
        await POST<GlobalNoteIdParam & AccessToken>(`https://${this.client.getHost}/api/pages/like`, {i : this.client.token , noteId : NoteId})
    }

    /**
     * # unLike
     * 
     * このメッセージを unLike します。
     */
    async unLike() {
        const NoteId = this.message.id
        await POST<GlobalNoteIdParam & AccessToken>(`https://${this.client.getHost}/api/pages/unlike`, {i : this.client.token , noteId : NoteId})
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
        const NoteId = this.message.id
        await POST<
        Reaction & AccessToken
        >(`https://${this.client.getHost}/api/notes/reactions/create`,
            {
                i : this.client.token , 
                noteId : NoteId , 
                reaction : reactionEmoji
            }
        )
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
        const NoteId = this.message.id
        await POST<
        DeleteReaction & AccessToken
        >(`https://${this.client.getHost}/api/notes/reactions/delete`,
            {
                i : this.client.token , 
                noteId : NoteId , 
            }
        )
    }

}