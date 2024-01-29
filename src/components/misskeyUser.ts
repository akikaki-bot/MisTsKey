import { Client } from "..";
import { Follower } from "../types/follower";
import { AccessToken } from "../types/reaction";


export interface User {
    id : string
    createdAt : string
    username : string
    host : string | null
    name : string
    onlineStatus : onlineStatus
    avaterUrl : string
    avaterBlurhash : string
}

export interface Following {
    sinceId : string
    untilId : string
    limit : number
}

export type onlineStatus = "online" | "active" | "offline" | "unknown"

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
export class MisskeyUser implements User {

	id : string;
	createdAt : string;
	username : string;
	host : string | null;
	name : string;
	onlineStatus : onlineStatus;
	avaterUrl : string;
	avaterBlurhash : string;

	private client : Client;

	constructor(user : User , client ?: Client) {
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

	async getFollower( config ?: Following ) : Promise<Follower[] | []> {
		const followers = await this.client.http.GETPOST<AccessToken & Following, Follower[]>("/api/users/followers", {
			i : this.client.getAccessToken(),
			sinceId : config.sinceId,
			untilId : config.untilId,
			limit : config.limit
		});
		const UserData = followers.data;

		return UserData;
	}

	/*
    async getStatus () : Promise<UserStatus>{
        const stat = await GETPOST<{userId : string}, Status>(`/api/users/stats`, {
            userId : this.id
        })

        const StatusData = stat.data
        return new UserStatus(StatusData)
    }*/
}