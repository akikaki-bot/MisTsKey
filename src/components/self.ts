import { Client } from "../";
import { EmeraldObjectVaildater } from "../@emerald";
import { 
	Achievement, 
	BadgeRole, 
	Emojis, 
	MeDetailed, 
	Policies, 
	Role 
} from "../types/me";
import {
	NoteBody,
	_NoteBody
} from "../types/note";
import { AccessToken } from "../types/reaction";
import { Note, Visibility } from "./";

/**
 * ## Self
 * -> implements MeDetailed
 * 
 * ---
 * 
 * ユーザー、どちらかと言えば詳細な自分の情報。
 * 
 */
export class Self implements MeDetailed {
	id:                              string;
	name:                            string | null;
	username:                        string;
	host:                            string | null;
	avatarUrl:                       string;
	avatarBlurhash:                  string | null;
	isBot:                           boolean;
	isCat:                           boolean;
	emojis:                          Emojis[];
	onlineStatus:                    string;
	badgeRoles:                      BadgeRole[];
	url:                             string | null;
	uri:                             string | null;
	movedTo:                         string | null;
	alsoKnownAs:                     string | null;
	createdAt:                       Date;
	updatedAt:                       Date;
	lastFetchedAt:                   string | null;
	bannerUrl:                       string | null;
	bannerBlurhash:                  string | null;
	isLocked:                        boolean;
	isSilenced:                      boolean;
	isSuspended:                     boolean;
	description:                     string | null;
	location:                        string | null;
	birthday:                        string | null;
	lang:                            string | null;
	//eslint-disable-next-line
	fields:                          any[];
	followersCount:                  number;
	followingCount:                  number;
	notesCount:                      number;
	//eslint-disable-next-line
	pinnedNoteIds:                   any[];
	//eslint-disable-next-line
	pinnedNotes:                     any[];
	pinnedPageId:                    string | null;
	pinnedPage:                      string | null;
	publicReactions:                 boolean;
	ffVisibility:                    string;
	twoFactorEnabled:                boolean;
	usePasswordLessLogin:            boolean;
	securityKeys:                    boolean;
	roles:                           Role[];
	memo:                            string | null;
	avatarId:                        string | null;
	bannerId:                        string | null;
	isModerator:                     boolean;
	isAdmin:                         boolean;
	injectFeaturedNote:              boolean;
	receiveAnnouncementEmail:        boolean;
	alwaysMarkNsfw:                  boolean;
	autoSensitive:                   boolean;
	carefulBot:                      boolean;
	autoAcceptFollowed:              boolean;
	noCrawle:                        boolean;
	preventAiLearning:               boolean;
	isExplorable:                    boolean;
	isDeleted:                       boolean;
	hideOnlineStatus:                boolean;
	hasUnreadSpecifiedNotes:         boolean;
	hasUnreadMentions:               boolean;
	hasUnreadAnnouncement:           boolean;
	hasUnreadAntenna:                boolean;
	hasUnreadChannel:                boolean;
	hasUnreadNotification:           boolean;
	hasPendingReceivedFollowRequest: boolean;
	mutedWords:                      any[];	//eslint-disable-line
	mutedInstances:                  any[];	//eslint-disable-line
	mutingNotificationTypes:         any[];	//eslint-disable-line
	emailNotificationTypes:          string[];
	achievements:                    Achievement[];
	loggedInDays:                    number;
	policies:                        Policies;
	private client :                 Client; 
	private defaultNote : EmeraldObjectVaildater<_NoteBody>;

	constructor(user : MeDetailed, client ?: Client) {
		this.client = client;
		this.id = user.id;
		this.name = user.name;
		this.username = user.username;
		this.host = user.host;
		this.avatarUrl = user.avatarUrl;
		this.avatarBlurhash = user.avatarBlurhash;
		this.isBot = user.isBot;
		this.isCat = user.isCat;
		this.emojis = user.emojis;
		this.onlineStatus = user.onlineStatus;
		this.badgeRoles = user.badgeRoles;
		this.uri = user.uri;
		this.uri = user.uri;
		this.movedTo = user.movedTo;
		this.alsoKnownAs = user.alsoKnownAs;
		this.createdAt = new Date(user.createdAt);
		this.updatedAt = new Date(user.updatedAt);
		this.lastFetchedAt = user.lastFetchedAt;
		this.bannerUrl = user.bannerUrl; 
		this.bannerBlurhash = user.bannerBlurhash;
		this.isLocked = user.isLocked;
		this.isSilenced = user.isSilenced;
		this.isSuspended = user.isSuspended;
		this.description = user.description;
		this.location = user.location;
		this.birthday = user.birthday;
		this.lang = user.lang;
		this.fields = user.fields;
		this.followersCount = user.followersCount;
		this.followingCount = user.followingCount;
		this.notesCount = user.notesCount;
		this.pinnedNoteIds = user.pinnedNoteIds;
		this.pinnedNotes = user.pinnedNotes;
		this.pinnedPageId = user.pinnedPageId;
		this.pinnedPage = user.pinnedPage;
		this.publicReactions = user.publicReactions;
		this.ffVisibility = user.ffVisibility;
		this.twoFactorEnabled = user.twoFactorEnabled;
		this.usePasswordLessLogin = user.usePasswordLessLogin;
		this.securityKeys = user.securityKeys;
		this.roles = user.roles;
		this.memo = user.memo;
		this.avatarId = user.avatarId;
		this.bannerId = user.bannerId;
		this.isModerator = user.isModerator;
		this.isAdmin = user.isAdmin;
		this.injectFeaturedNote = user.injectFeaturedNote;
		this.receiveAnnouncementEmail = user.receiveAnnouncementEmail;
		this.alwaysMarkNsfw = user.alwaysMarkNsfw;
		this.autoSensitive = user.autoSensitive;
		this.carefulBot = user.carefulBot;
		this.autoAcceptFollowed = user.autoAcceptFollowed;
		this.noCrawle = user.noCrawle;
		this.preventAiLearning = user.preventAiLearning;
		this.isExplorable = user.isExplorable;
		this.isDeleted = user.isDeleted;
		this.hideOnlineStatus = user.hideOnlineStatus;
		this.hasUnreadSpecifiedNotes = user.hasUnreadSpecifiedNotes;
		this.hasUnreadMentions = user.hasUnreadMentions;
		this.hasUnreadAnnouncement = user.hasUnreadAnnouncement;
		this.hasUnreadAntenna = user.hasUnreadAntenna;
		this.hasUnreadChannel = user.hasUnreadChannel;
		this.hasUnreadNotification = user.hasUnreadNotification;
		this.hasPendingReceivedFollowRequest = user.hasPendingReceivedFollowRequest;
		this.mutedWords = user.mutedWords;
		this.mutedInstances = user.mutedInstances;
		this.mutingNotificationTypes = user.mutingNotificationTypes;
		this.emailNotificationTypes = user.emailNotificationTypes;
		this.achievements = user.achievements;
		this.loggedInDays = user.loggedInDays;
		this.policies = user.policies;
		this.defaultNote = new EmeraldObjectVaildater<_NoteBody>({
			text : null,
			visibility : this.client.defaultNoteChannelVisibility,
			visibleUserIds : [],
			cw : null,
			localOnly : false,
			noExtractMentions : false,
			noExtractEmojis : false,
			noExtractHashtags : false,
			replyId : null,
			renoteId : null,
			channelId : null,
			poll : null
		});
	}

	async note( text : string | null , configs ?: NoteBody ) : Promise<Note> { 

		const conf = this.CreateNoteFunction(text ,configs);
		const Response = await this.client.http.GETPOST<_NoteBody & AccessToken, { createdNote : Note }>(
			"/api/notes/create",
			Object.assign(
				conf,
				{i : this.client.token}
			)
		);
		return new Note(Response.data.createdNote);
	}

	private CreateNoteFunction( text : string , body : NoteBody ) : _NoteBody {
		
		if(typeof body === "undefined") {
			this.defaultNote.merge<{ text : string }>({ text : text });
			return this.defaultNote.Object;
		}

		this.defaultNote.mergeNullValue<{ visibility : Visibility }, "visibility">(
			"visibility", 
			body.visibility , 
			this.client.defaultNoteChannelVisibility
		);
		this.defaultNote.mergeNullValue<{ visibleUserIds : string[] }, "visibleUserIds">(
			"visibleUserIds",
			body.visibleUserIds , 
			[]
		);
		this.defaultNote.mergeNullValue<{ cw : string }, "cw">(
			"cw", 
			body.cw ,
			null
		);
		this.defaultNote.mergeNullValue<{ localOnly : boolean }, "localOnly">(
			"localOnly", 
			body.localOnly , 
			false
		);
		this.defaultNote.mergeNullValue<{ noExtractMentions : boolean }, "noExtractMentions">(
			"noExtractMentions", 
			body.noExtractMentions , 
			false
		);
		this.defaultNote.mergeNullValue<{ noExtractEmojis : boolean }, "noExtractEmojis">(
			"noExtractEmojis", 
			body.noExtractEmojis , 
			false
		);
		this.defaultNote.mergeNullValue<{ noExtractHashtags : boolean }, "noExtractHashtags">(
			"noExtractHashtags", 
			body.noExtractHashtags , 
			false
		);
		this.defaultNote.mergeNullValue<{ fileIds : string[] }, "fileIds">(
			"fileIds", 
			body.fileIds , 
			[]
		);
		this.defaultNote.mergeNullValue<{ mediaIds : string[] }, "mediaIds">(
			"mediaIds", 
			body.mediaIds , 
			[]
		);
		this.defaultNote.mergeNullValue<{ replyId : string }, "replyId">(
			"replyId", 
			body.replyId , 
			null
		);
		this.defaultNote.mergeNullValue<{ renoteId : string }, "renoteId">(
			"renoteId", 
			body.replyId , 
			null
		);
		this.defaultNote.mergeNullValue<{ channelId : string }, "channelId">(
			"channelId", 
			body.replyId , 
			null
		);
		this.defaultNote.mergeNullObject<{ poll : { choices : Array<string>, multiple : boolean, expiresAt : number, expiredAfter : number }  }>(
			{ poll : body.poll.toJSON() }, 
			null
		);

		return this.defaultNote.Object;
	}

	async getRecommendation( limit ?: number , offset ?: number ) : Promise<MeDetailed[]> {
		const Response = await this.client.http.GETPOST<AccessToken & { limit : number , offset : number }, MeDetailed[]>("/api/users/recommend",
			{ i : this.client.token, limit : limit , offset : offset }
		);

		return Response.data;
	}

	/*
	async getStatus () : Promise<UserStatus>{
		const stat = await this.client.http.GETPOST<{userId : string}, Status>("/api/users/stats", {
			userId : this.id
		})

		const StatusData = stat.data
		return new UserStatus(StatusData)
	}*/
}