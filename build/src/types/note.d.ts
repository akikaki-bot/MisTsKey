import { Visibility } from "../components/message";
export interface NoteBody {
    visibility: Visibility;
    visibleUserIds: Array<string>;
    text: string | null;
    cw: string | null;
    localOnly: boolean;
    noExtractMentions: boolean;
    noExtractHashtags: boolean;
    noExtractEmojis: boolean;
    fileIds: Array<string>;
    mediaIds: Array<string>;
    replyId: string;
    renoteId: string;
    channelId: string;
    /**
     * # POLL
     *
     * See : [Misskey-hub](https://misskey-hub.net/docs/api/endpoints/notes/create.html)
     */
    poll: {
        choices: Array<string>;
        multiple: boolean;
        expiresAt: number;
        expiredAfter: number;
    };
}
