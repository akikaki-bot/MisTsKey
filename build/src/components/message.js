"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const post_1 = require("../posts/post");
const user_1 = require("./user");
class Note {
    constructor(note, client) {
        this.BodyId = note.BodyId;
        this.IsRenoteMessage = note.IsRenoteMessage;
        this.id = note.id;
        this.createdAt = note.createdAt;
        this.userId = note.userId;
        this.user = new user_1.MisskeyUser(note.user, client);
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
    reply(text, configs) {
        return __awaiter(this, void 0, void 0, function* () {
            // これはIf文つかえよ私
            typeof configs !== "undefined" ?
                typeof configs.visibility === "undefined" ?
                    configs.visibility = this.client.defaultNoteChannelVisibility
                    : configs.visibility
                : void 0;
            //ReplyIdの自動設定
            configs.replyId = this.replyId;
            //投票関連の汚いコード
            const poll = configs.poll.toJSON();
            const NewConfig = configs;
            delete NewConfig["poll"];
            const conf = Object.assign(NewConfig, { poll: poll }, { text: text });
            //ここまで 
            const Response = yield (0, post_1.GETPOST)(`https://${this.client.getHost}/api/notes/create`, Object.assign(conf, { i: this.client.token }));
            return Response.data;
        });
    }
    /**
     * # Delete
     *
     * このノートを消去します。
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, post_1.POST)(`https://${this.client.getHost}/api/notes/delete`, { i: this.client.token, noteId: this.id }).catch(() => {
                throw new Error('[Misskey.ts API Error] \n 削除できませんでした。');
            });
        });
    }
}
exports.Note = Note;
