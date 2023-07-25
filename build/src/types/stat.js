"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
/**
 * # Status
 *
 * ユーザーのステータスに関するクラス。
 */
class UserStatus {
    constructor(data, client) {
        this.notesCount = data.notesCount;
        this.repliesCount = data.repliesCount;
        this.renotesCount = data.renotesCount;
        this.repliedCount = data.repliedCount;
        this.renotedCount = data.renotedCount;
        this.pollVotesCount = data.pollVotesCount;
        this.pollVotedCount = data.pollVotedCount;
        this.localFollowingCount = data.localFollowingCount;
        this.remoteFollowingCount = data.remoteFollowingCount;
        this.localFollowersCount = data.localFollowersCount;
        this.remoteFollowersCount = data.remoteFollowersCount;
        this.followingCount = data.followingCount;
        this.followersCount = data.followersCount;
        this.sentReactionsCount = data.sentReactionsCount;
        this.noteFavoritesCount = data.noteFavoritesCount;
        this.pageLikesCount = data.pageLikesCount;
        this.pageLikedCount = data.pageLikedCount;
        this.driveFilesCount = data.driveFilesCount;
        this.driveUsage = data.driveUsage;
        this.client = client;
    }
}
exports.UserStatus = UserStatus;
