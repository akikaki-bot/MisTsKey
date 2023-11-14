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
exports.MisskeyUser = void 0;
const posts_1 = require("../posts");
/**
 * ## MisskeyUser
 * -> implements User
 *
 * ---
 *
 * ユーザーについてのクラス。（簡易）
 *
 * もっと詳しいことが書いてあるのは Self だと思います。
 */
class MisskeyUser {
    constructor(user, client) {
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.username = user.username;
        this.host = user.host;
        this.name = user.name;
        this.onlineStatus = user.onlineStatus;
        this.avaterUrl = user.avaterUrl;
        this.avaterBlurhash = user.avaterBlurhash;
        this.client = client;
    }
    getFollower(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const followers = yield (0, posts_1.GETPOST)(`https://${this.client.getHost}/api/users/followers`, {
                i: this.client.getAccessToken(),
                sinceId: config.sinceId,
                untilId: config.untilId,
                limit: config.limit
            });
            const UserData = followers.data;
            return UserData;
        });
    }
}
exports.MisskeyUser = MisskeyUser;
