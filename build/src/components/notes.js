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
const posts_1 = require("../posts");
const wsState_1 = require("../types/wsState");
const _1 = require("./");
// Client.Notes
class Notes {
    constructor(client) {
        this.client = client;
    }
    searchNotes(searchQuery, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const ResData = yield (0, posts_1.GETPOST)(`https://${this.client.getHost}/notes/search`, Object.assign({ i: this.client.token }, Object.assign({ searchQuery: searchQuery }, options)));
            return ResData.data.map(v => new _1.Note(v));
        });
    }
    getMentionedNotes(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const ResData = yield (0, posts_1.GETPOST)(`https://${this.client.getHost}/notes/mentions`, Object.assign({ i: this.client.token }, options));
            return ResData.data.map(v => new _1.Note(v));
        });
    }
    fetch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Message = this.client.cache.get(id);
            if (!Message && (this.client.state === wsState_1.WebSocketState.connected)) {
                const RESData = yield (0, posts_1.GETPOST)(`https://${this.client.getHost}/notes/show`, {
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
    get(id) {
        var _a;
        const Message = (_a = this.client.cache.get(id)) !== null && _a !== void 0 ? _a : null;
        return Message;
    }
}
exports.Notes = Notes;
