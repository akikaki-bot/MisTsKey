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
const _1 = require(".");
class Note {
    constructor(note, client) {
        this.BodyId = note.BodyId;
        this.IsRenoteMessage = note.IsRenoteMessage;
        this.id = note.id;
        this.createdAt = note.createdAt;
        this.userId = note.userId;
        this.user = new _1.MisskeyUser(note.user, client);
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
        this.comefrom = typeof client === "object" && (typeof note.uri === "undefined" ? client.getHost : note.uri.split("/")[2]);
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
            configs.replyId = this.replyId;
            const conf = this.CreateNoteFunction(text, configs);
            const Response = yield this.client.http.GETPOST("/api/notes/create", Object.assign(conf, { i: this.client.token }));
            return new Note(Response.data.createdNote, this.client);
        });
    }
    CreateNoteFunction(text, body) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (typeof body === "undefined") {
            return {
                text: text,
                visibility: this.client.defaultNoteChannelVisibility,
                visibleUserIds: [],
                cw: null,
                localOnly: false,
                noExtractMentions: false,
                noExtractEmojis: false,
                noExtractHashtags: false,
                replyId: null,
                renoteId: null,
                channelId: null,
                poll: null
            };
        }
        return {
            text: text,
            visibility: (_a = body.visibility) !== null && _a !== void 0 ? _a : this.client.defaultNoteChannelVisibility,
            visibleUserIds: (_b = body.visibleUserIds) !== null && _b !== void 0 ? _b : [],
            cw: (_c = body.cw) !== null && _c !== void 0 ? _c : null,
            localOnly: (_d = body.localOnly) !== null && _d !== void 0 ? _d : false,
            noExtractMentions: (_e = body.noExtractMentions) !== null && _e !== void 0 ? _e : false,
            noExtractEmojis: (_f = body.noExtractEmojis) !== null && _f !== void 0 ? _f : false,
            noExtractHashtags: (_g = body.noExtractHashtags) !== null && _g !== void 0 ? _g : false,
            fileIds: body.fileIds,
            mediaIds: body.mediaIds,
            replyId: (_h = body.replyId) !== null && _h !== void 0 ? _h : null,
            renoteId: (_j = body.renoteId) !== null && _j !== void 0 ? _j : null,
            channelId: (_k = body.channelId) !== null && _k !== void 0 ? _k : null,
            poll: (_l = body.poll.toJSON()) !== null && _l !== void 0 ? _l : null
        };
    }
    /**
       * # Delete
       * @returns `Promise<void>`
       *
       * このノートを消去します。
       */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.http.POST("/api/notes/delete", { i: this.client.token, noteId: this.id });
        });
    }
    /**
     * # getChildren
     * @returns `Promise<Note[] | []>`
     *
     */
    getChildren({ limit = 10, sinceId, untilId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const Response = yield this.client.http.GETPOST("/api/notes/children", { noteId: this.id, limit: limit, sinceId: sinceId, untilId: untilId });
            return Response.data.length > 0
                ? Response.data.map(v => new Note(v, this.client))
                : [];
        });
    }
}
exports.Note = Note;
