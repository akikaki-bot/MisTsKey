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
exports.Self = void 0;
const posts_1 = require("../posts");
/**
 * ## Self
 * -> implements MeDetailed
 *
 * ---
 *
 * ユーザー、どちらかと言えば詳細な自分の情報。
 *
 */
class Self {
    constructor(user, client) {
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
    }
    note(text, configs) {
        return __awaiter(this, void 0, void 0, function* () {
            const conf = this.CreateNoteFunction(text, configs);
            const Response = yield (0, posts_1.GETPOST)(`https://${this.client.getHost}/api/notes/create`, Object.assign(conf, { i: this.client.token }));
            return Response.data.createdNote;
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
}
exports.Self = Self;
