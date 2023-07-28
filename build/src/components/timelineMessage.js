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
exports.TimeLineMessage = void 0;
const post_1 = require("../posts/post");
const message_1 = require("./message");
class TimeLineMessage {
    constructor(data, client) {
        this.client = client;
        this.message = new message_1.Note(data.body.body, client);
        this.message.BodyId = data.body.id;
        this.message.text === null ? this.message.IsRenoteMessage = true : this.message.IsRenoteMessage = false;
    }
    /**
     * # Renote
     *
     * このメッセージ、または指定メッセージをRenoteします。
     *
     * @param {Partial<{ noteId : string}>} config
     */
    renote(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = config.noteId ? config.noteId : this.message.id;
            const data = yield (0, post_1.GETPOST)(`https://${this.client.getHost}/api/notes/create`, {
                i: this.client.token,
                noteId: NoteId
            });
            return data.data.createdNote;
        });
    }
    /**
     * # unRenote
     *
     * このメッセージ、または指定メッセージをunRenoteします。
     *
     * @param {Partial<{ noteId : string}>} config
     */
    unRenote(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = config.noteId ? config.noteId : this.message.id;
            yield (0, post_1.POST)(`https://${this.client.getHost}/api/notes/unrenote`, {
                i: this.client.token,
                noteId: NoteId
            });
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
    getRenote(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = config.noteId ? config.noteId : this.message.id;
            const data = yield (0, post_1.GETPOST)(`https://${this.client.getHost}/api/notes/renotes`, {
                i: this.client.token,
                noteId: NoteId,
                limit: config.limit,
                sinceId: config.sinceId,
                untilId: config.untilId
            });
            return data.data;
        });
    }
    /**
     * # Like
     *
     * このメッセージをLikeします。
     */
    like() {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = this.message.id;
            yield (0, post_1.POST)(`https://${this.client.getHost}/api/pages/like`, { i: this.client.token, noteId: NoteId });
        });
    }
    /**
     * # unLike
     *
     * このメッセージを unLike します。
     */
    unLike() {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = this.message.id;
            yield (0, post_1.POST)(`https://${this.client.getHost}/api/pages/unlike`, { i: this.client.token, noteId: NoteId });
        });
    }
    /**
     * # Reaction
     * このメッセージにリアクションをします。
     *
     * @param {string} reactionEmoji リアクションする絵文字
     *
     * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/create.html)
     */
    reaction(reactionEmoji) {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = this.message.id;
            yield (0, post_1.POST)(`https://${this.client.getHost}/api/notes/reactions/create`, {
                i: this.client.token,
                noteId: NoteId,
                reaction: reactionEmoji
            });
        });
    }
    /**
     * # Reaction
     * このメッセージのリアクションをすべて消します。
     *
     *
     *
     * More Detail [Docs](https://misskey-hub.net/docs/api/endpoints/notes/reactions/delete.html)
     */
    reactionDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            const NoteId = this.message.id;
            yield (0, post_1.POST)(`https://${this.client.getHost}/api/notes/reactions/delete`, {
                i: this.client.token,
                noteId: NoteId,
            });
        });
    }
}
exports.TimeLineMessage = TimeLineMessage;
