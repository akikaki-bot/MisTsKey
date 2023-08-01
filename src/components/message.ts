import { Client } from ".."
import { GETPOST, POST } from "../posts/post"
import { NoteBody, _NoteBody } from "../types/note"
import { AccessToken } from "../types/reaction"
import { CreatePoll } from "./createpoll"
import { MisskeyUser, User } from "./user"

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
    /** @deprecated Will be deleted */
    //IsRenoteMessage : boolean
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
    tags : Array<any>
    fileIds : Array<string>,
    files : Array<any>,
    replyId : any
    renoteId : any,
    mentions : Array<any>
    uri : string
    url : string
}
export type Visibility = "public" | "home" | "followers" | "specified"
export type ISO8601 = string

export class Note implements BaseNote {
    BodyId : string
    /**
     * # IsRenoteMessage
     * 
     * これはリノートであるかのBooleanです。
     */
    IsRenoteMessage : boolean
    /**
     * # id
     * 
     * メッセージIDです。
     *
     */
    id : string
    createdAt : ISO8601
    userId : string
    /**
     * # user
     * 
     * このノートのユーザーについてのオブジェクトです。
     */
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
    tags : Array<any>
    fileIds : Array<string>
    files : Array<any>
    replyId : string
    renoteId : string
    mentions : Array<any>
    uri : string
    url : string

    private client : Client

    constructor(note : BaseNote, client ?: Client) {
        this.BodyId = note.BodyId
        this.IsRenoteMessage = note.IsRenoteMessage
        this.id = note.id
        this.createdAt = note.createdAt
        this.userId = note.userId
        this.user = new MisskeyUser(note.user , client)
        this.text = note.text
        this.cw = note.cw
        this.visibility = note.visibility
        this.localOnly = note.localOnly
        this.renoteCount = note.renoteCount
        this.repliesCount = note.repliesCount
        this.reactions = note.reactions
        this.reactionEmojis = note.reactionEmojis
        this.emojis = note.emojis
        this.tags = note.tags
        this.fileIds = note.fileIds
        this.files = note.files
        this.replyId = note.replyId
        this.renoteId = note.renoteId
        this.mentions = note.mentions
        this.uri = note.uri
        this.url = note.url
        this.client = client
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
        configs.replyId = this.replyId
        const conf = this.CreateNoteFunction(text , configs)

        const Response = await GETPOST<_NoteBody & AccessToken, { createdNote : Note }>(
            `https://${this.client.getHost}/api/notes/create`,
            Object.assign(
                conf,
                {i : this.client.token}
            )
        )
      return Response.data
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
            }
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
        }
    }

      /**
       * # Delete
       * 
       * このノートを消去します。
       */
    async delete() {
        await POST<AccessToken & { noteId : string }>(`https://${this.client.getHost}/api/notes/delete`,
        { i : this.client.token , noteId : this.id}
        ).catch(() => {
            throw new Error('[Misskey.ts API Error] \n 削除できませんでした。')
        })
    }


}
