import { Client } from "..";

/**
 * # Status Interface
 * 
 * ユーザーのステータスに関する型。
 */
export interface Status {
    notesCount : number
    repliesCount : number
    renotesCount : number
    repliedCount : number
    renotedCount : number
    pollVotesCount : number
    pollVotedCount : number
    localFollowingCount : number
    remoteFollowingCount : number
    localFollowersCount : number
    remoteFollowersCount : number
    followingCount : number
    followersCount : number
    sentReactionsCount : number
    noteFavoritesCount : number
    pageLikesCount : number
    pageLikedCount : number
    driveFilesCount : number
    /** 単位は `Byte` です。 */
    driveUsage : number
}

/**
 * # Status
 * 
 * ユーザーのステータスに関するクラス。
 */
export class UserStatus implements Status {
	public notesCount : number;
	public repliesCount : number;
	public renotesCount : number;
	public repliedCount : number;
	public renotedCount : number;
	public pollVotesCount : number;
	public pollVotedCount : number;
	public localFollowingCount : number;
	public remoteFollowingCount : number;
	public localFollowersCount : number;
	public remoteFollowersCount : number;
	public followingCount : number;
	public followersCount : number;
	public sentReactionsCount : number;
	public noteFavoritesCount : number;
	public pageLikesCount : number;
	public pageLikedCount : number;
	public driveFilesCount : number;
	/** 単位は `Byte` です。 */
	public driveUsage : number;

	private client : Client;

	constructor(data : Status , client ?: Client) {
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