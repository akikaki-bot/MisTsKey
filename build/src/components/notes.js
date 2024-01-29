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
exports.Notes = void 0;
const wsState_1 = require("../types/wsState");
const _1 = require("./");
// Client.Notes
class Notes {
    constructor(client) {
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
    searchNotes(searchQuery, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const ResData = yield this.client.http.GETPOST("/notes/search", Object.assign({ i: this.client.token }, Object.assign({ searchQuery: searchQuery }, options)));
            return ResData.data.map(v => new _1.Note(v));
        });
    }
    /**
     * # getMentionedNotes
     *
     * ユーザーにメンションされたノートを取得します。
     *
     * @param options オプション
     * @returns {Promise<Notes[]>} メンションされたノートの配列
     */
    getMentionedNotes(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const ResData = yield this.client.http.GETPOST("/notes/mentions", Object.assign({ i: this.client.token }, options));
            return ResData.data.map(v => new _1.Note(v));
        });
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
    fetch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Message = this.client.cache.get(id);
            if (!Message && (this.client.state === wsState_1.WebSocketState.connected)) {
                const RESData = yield this.client.http.GETPOST("/notes/show", {
                    i: this.client.token,
                    noteId: id
                });
                return new _1.TimeLineMessage({
                    type: "channel",
                    body: {
                        id: id,
                        type: "fetchedMessage",
                        body: RESData.data
                    }
                }, this.client);
            }
            else {
                return Message;
            }
        });
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
    get(id) {
        var _a;
        const Message = (_a = this.client.cache.get(id)) !== null && _a !== void 0 ? _a : null;
        return Message;
    }
}
exports.Notes = Notes;
