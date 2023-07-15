import { Client } from "..";
import { GETPOST, POST } from "../posts/post";
import { AccessToken, DeleteReaction, GetRenote, GlobalNoteIdParam, Reaction } from "../types/reaction";
import { Message, Note } from "./message";


export class TimeLineMessage {
    
    public message : Note
    private client : Client 

    constructor(data : Message, client : Client) {
        //super(client.token, client.channelType)

        this.client = client
        this.message = data.body.body
        this.message.BodyId = data.body.id
        this.message.text === null ? this.message.IsRenoteMessage = true : this.message.IsRenoteMessage = false
    }

    /**
     * # Renote
     * 
     * このメッセージをRenoteします。
     */
    renote() {

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
    async getRenote( noteId ?: string , limit ?: number , sinceId ?: string , untilId ?: string ) {
        const NoteId = noteId ? noteId : this.message.id
        const data = await GETPOST<GlobalNoteIdParam & Partial<GetRenote> & AccessToken , Array<Note>>("https://misskey.io/api/notes/renotes", {
            i : this.client.token , 
            noteId : NoteId,
            limit : limit,
            sinceId : sinceId,
            untilId : untilId
        })
        .catch(() => {
            throw new Error('[Misskey.ts API Error]')
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
        await POST<GlobalNoteIdParam & AccessToken>("https://misskey.io/api/pages/like", {i : this.client.token , noteId : NoteId})
        .catch(() => {
            throw new Error('[Misskey.ts API Error]\n 自分自身のノートにLikeしようとしていませんか？')
        })
    }


    /**
     * # UnLike
     * 
     * このメッセージを unLike します。
     */
    async Unlike() {
        const NoteId = this.message.id
        await POST<GlobalNoteIdParam & AccessToken>("https://misskey.io/api/pages/unlike", {i : this.client.token , noteId : NoteId})
        .catch(() => {
            throw new Error('[Misskey.ts API Error]\n 自分自身のノートにunLikeしようとしていませんか？')
        })
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
        >("https://misskey.io/api/notes/reactions/create",
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
     * 
     * 
     * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/delete.html)
     */
    async reactionDelete() {
        const NoteId = this.message.id
        await POST<
        DeleteReaction & AccessToken
        >("https://misskey.io/api/notes/reactions/delete",
            {
                i : this.client.token , 
                noteId : NoteId , 
            }
        )
    }
}