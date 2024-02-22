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
const _emerald_1 = require("../@emerald");
const createUUID_1 = require("../utils/createUUID");
const _1 = require("./");
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
        this.defaultNote = new _emerald_1.EmeraldObjectVaildater({
            text: null,
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
            poll: null,
            files: [],
        });
    }
    note(text, configs) {
        return __awaiter(this, void 0, void 0, function* () {
            const conf = this.CreateNoteFunction(text, configs);
            if (conf.files.length > 0) {
                const Ids = yield Promise.all(conf.files.map((v) => __awaiter(this, void 0, void 0, function* () { return this.upload(v.toObject().file, v.toObject()); })));
                delete conf.files;
                conf.fileIds = Ids.map(v => v.id);
            }
            this.client.emit("debug", `[Note] Attachments : ${conf.fileIds.length} isDeletedProperty : ${typeof conf.files}`);
            const Response = yield this.client.http.GETPOST("/api/notes/create", Object.assign(conf, { i: this.client.token }));
            return new _1.Note(Response.data.createdNote);
        });
    }
    /**
     * ### self.upload
     *
     * ドライブにアップロードします。
     *
     * @param {Buffer} file
     * @param {uploadConfig} cfg
     * @returns {Promise<DriveFile>}
     */
    upload(file, cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.emit("debug", `[BufftoString] : <Buffer string> size : ${Buffer.from(file).byteLength}byte , nsfw : ${JSON.stringify(cfg.isSensitive)}`);
            const fd = new FormData();
            fd.append("i", this.client.token);
            fd.append("file", new Blob([file]));
            Object.keys(cfg).forEach(v => {
                var _a;
                fd.append(v, (_a = cfg[v]) !== null && _a !== void 0 ? _a : null);
            });
            if (cfg.name === null)
                fd.append("name", (0, createUUID_1.createUuid)());
            const data = yield this.client.http.POSTFormData("/api/drive/files/create", fd);
            return data.data;
        });
    }
    CreateNoteFunction(text, body) {
        if (typeof body === "undefined") {
            this.defaultNote.merge({ text: text });
            return this.defaultNote.Object;
        }
        this.defaultNote.merge({ text: text });
        this.defaultNote.mergeNullValue("visibility", body.visibility, this.client.defaultNoteChannelVisibility);
        this.defaultNote.mergeNullValue("visibleUserIds", body.visibleUserIds, []);
        this.defaultNote.mergeNullValue("cw", body.cw, null);
        this.defaultNote.mergeNullValue("localOnly", body.localOnly, false);
        this.defaultNote.mergeNullValue("noExtractMentions", body.noExtractMentions, false);
        this.defaultNote.mergeNullValue("noExtractEmojis", body.noExtractEmojis, false);
        this.defaultNote.mergeNullValue("noExtractHashtags", body.noExtractHashtags, false);
        this.defaultNote.mergeNullValue("fileIds", body.fileIds, []);
        this.defaultNote.mergeNullValue("mediaIds", body.mediaIds, []);
        this.defaultNote.mergeNullValue("replyId", body.replyId, null);
        this.defaultNote.mergeNullValue("renoteId", body.replyId, null);
        this.defaultNote.mergeNullValue("channelId", body.replyId, null);
        this.defaultNote.mergeNullObject({ poll: typeof body.poll !== "undefined" ? body.poll.toJSON() : null }, null);
        this.defaultNote.mergeNullObject({
            files: body.files
        }, null);
        return this.defaultNote.Object;
    }
    getRecommendation(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const Response = yield this.client.http.GETPOST("/api/users/recommend", { i: this.client.token, limit: limit, offset: offset });
            return Response.data;
        });
    }
}
exports.Self = Self;
