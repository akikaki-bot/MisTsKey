import { Client } from ".."
import { GETPOST, POST } from "../posts/post"
import { NoteBody } from "../types/note"
import { AccessToken } from "../types/reaction"
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
    IsRenoteMessage : boolean
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
     * @param text 
     * @param configs 
     * @returns 
     */
    async reply( text : string | null , configs ?: Partial<{
      visibility : Visibility,
      visibleUserIds : Array<string>,
      cw : string | null,
      localOnly : boolean
      noExtractMentions : boolean
      noExtractHashtags : boolean
      noExtractEmojis : boolean
      fileIds : Array<string>
      mediaIds : Array<string>
      replyId : string 
      renoteId : string
      channelId : string
      /**
       * # POLL
       * 
       * See : [Misskey-hub](https://misskey-hub.net/docs/api/endpoints/notes/create.html)
       */
      poll : {
          choices : Array<string>
          multiple : boolean
          expiresAt : number
          expiredAfter : number
      }
  }>) { 
      configs.replyId = this.id
      const Response = await GETPOST<Partial<NoteBody> & AccessToken, Note>(
          `https://${this.client.getHost}/api/notes/create`,
          Object.assign(configs, { text : text }, {i : this.client.token})
      )

      return Response.data
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
