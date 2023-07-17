import { Client } from "..";
import { Follower } from "../types/follower";
export interface User {
    id: string;
    createdAt: string;
    username: string;
    host: string | null;
    name: string;
    onlineStatus: onlineStatus;
    avaterUrl: string;
    avaterBlurhash: string;
}
export interface Following {
    sinceId: string;
    untilId: string;
    limit: number;
}
export type onlineStatus = "online" | "active" | "offline" | "unknown";
/**
 * ## MisskeyUser
 * -> implements User
 *
 * ############################
 *
 * ユーザーについてのクラス。（簡易）
 *
 * もっと詳しいことが書いてあるのは Self だと思います。
 */
export declare class MisskeyUser implements User {
    id: string;
    createdAt: string;
    username: string;
    host: string | null;
    name: string;
    onlineStatus: onlineStatus;
    avaterUrl: string;
    avaterBlurhash: string;
    private client;
    constructor(user: User, client?: Client);
    getFollower(config?: Following): Promise<Follower[] | []>;
}
