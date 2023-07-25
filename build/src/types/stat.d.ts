import { Client } from "..";
/**
 * # Status Interface
 *
 * ユーザーのステータスに関する型。
 */
export interface Status {
    notesCount: number;
    repliesCount: number;
    renotesCount: number;
    repliedCount: number;
    renotedCount: number;
    pollVotesCount: number;
    pollVotedCount: number;
    localFollowingCount: number;
    remoteFollowingCount: number;
    localFollowersCount: number;
    remoteFollowersCount: number;
    followingCount: number;
    followersCount: number;
    sentReactionsCount: number;
    noteFavoritesCount: number;
    pageLikesCount: number;
    pageLikedCount: number;
    driveFilesCount: number;
    /** 単位は `Byte` です。 */
    driveUsage: number;
}
/**
 * # Status
 *
 * ユーザーのステータスに関するクラス。
 */
export declare class UserStatus implements Status {
    notesCount: number;
    repliesCount: number;
    renotesCount: number;
    repliedCount: number;
    renotedCount: number;
    pollVotesCount: number;
    pollVotedCount: number;
    localFollowingCount: number;
    remoteFollowingCount: number;
    localFollowersCount: number;
    remoteFollowersCount: number;
    followingCount: number;
    followersCount: number;
    sentReactionsCount: number;
    noteFavoritesCount: number;
    pageLikesCount: number;
    pageLikedCount: number;
    driveFilesCount: number;
    /** 単位は `Byte` です。 */
    driveUsage: number;
    private client;
    constructor(data: Status, client?: Client);
}
