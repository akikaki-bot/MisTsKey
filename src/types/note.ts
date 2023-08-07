import { 
    CreatePoll , 
    Visibility 
} from "../components"

export type NoteBody = Omit<_NoteBody, "poll"> & { poll : CreatePoll } 
export interface _NoteBody {
    /**
     * # POLL
     * 
     * See : [Misskey-hub](https://misskey-hub.net/docs/api/endpoints/notes/create.html)
     */
    poll ?: null | {
        choices : Array<string>
        multiple : boolean
        expiresAt : number
        expiredAfter : number
    } 
    visibility ?: Visibility,
    visibleUserIds ?: Array<string>,
    text ?: string | null
    cw ?: string | null,
    localOnly ?: boolean
    noExtractMentions ?: boolean
    noExtractHashtags ?: boolean
    noExtractEmojis ?: boolean
    fileIds ?: Array<string>
    mediaIds ?: Array<string>
    replyId ?: string 
    renoteId ?: string
    channelId ?: string
}