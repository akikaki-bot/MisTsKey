import { Client } from "..";
import { Achievement, BadgeRole, Emojis, MeDetailed, Policies, Role } from "../types/me";



export class Self implements MeDetailed {
    id:                              string;
    name:                            string | null;
    username:                        string;
    host:                            string | null;
    avatarUrl:                       string;
    avatarBlurhash:                  string | null;
    isBot:                           boolean;
    isCat:                           boolean;
    emojis:                          Emojis;
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
    fields:                          any[];
    followersCount:                  number;
    followingCount:                  number;
    notesCount:                      number;
    pinnedNoteIds:                   any[];
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
    mutedWords:                      any[];
    mutedInstances:                  any[];
    mutingNotificationTypes:         any[];
    emailNotificationTypes:          string[];
    achievements:                    Achievement[];
    loggedInDays:                    number;
    policies:                        Policies;
    private client :                 Client 

    constructor(user : MeDetailed, client ?: Client) {
        this.client = client
        this.id = user.id
        this.name = user.name
        this.username = user.username
        this.host = user.host
        this.avatarUrl = user.avatarUrl
        this.avatarBlurhash = user.avatarBlurhash
        this.isBot = user.isBot
        this.isCat = user.isCat
        this.emojis = user.emojis
        this.onlineStatus = user.onlineStatus
        this.badgeRoles = user.badgeRoles
        this.uri = user.uri
        this.uri = user.uri
        this.movedTo = user.movedTo
        this.alsoKnownAs = user.alsoKnownAs
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
        this.lastFetchedAt = user.lastFetchedAt
        this.bannerUrl = user.bannerUrl 
        this.bannerBlurhash = user.bannerBlurhash
        this.isLocked = user.isLocked
        this.isSilenced = user.isSilenced
        this.isSuspended = user.isSuspended
        this.description = user.description
        this.location = user.location
        this.birthday = user.birthday
        this.lang = user.lang
        this.fields = user.fields
        this.followersCount = user.followersCount
        this.followingCount = user.followingCount
        this.notesCount = user.notesCount
        this.pinnedNoteIds = user.pinnedNoteIds
        this.pinnedNotes = user.pinnedNotes
        this.pinnedPageId = user.pinnedPageId
        this.pinnedPage = user.pinnedPage
        this.publicReactions = user.publicReactions
        this.ffVisibility = user.ffVisibility
        this.twoFactorEnabled = user.twoFactorEnabled
        this.usePasswordLessLogin = user.usePasswordLessLogin
        this.securityKeys = user.securityKeys
        this.roles = user.roles
        this.memo = user.memo
        this.avatarId = user.avatarId
        this.bannerId = user.bannerId
        this.isModerator = user.isModerator
        this.isAdmin = user.isAdmin
        this.injectFeaturedNote = user.injectFeaturedNote
        this.receiveAnnouncementEmail = user.receiveAnnouncementEmail
        this.alwaysMarkNsfw = user.alwaysMarkNsfw
        this.autoSensitive = user.autoSensitive
        this.carefulBot = user.carefulBot
        this.autoAcceptFollowed = user.autoAcceptFollowed
        this.noCrawle = user.noCrawle
        this.preventAiLearning = user.preventAiLearning
        this.isExplorable = user.isExplorable
        this.isDeleted = user.isDeleted
        this.hideOnlineStatus = user.hideOnlineStatus
        this.hasUnreadSpecifiedNotes = user.hasUnreadSpecifiedNotes
        this.hasUnreadMentions = user.hasUnreadMentions
        this.hasUnreadAnnouncement = user.hasUnreadAnnouncement
        this.hasUnreadAntenna = user.hasUnreadAntenna
        this.hasUnreadChannel = user.hasUnreadChannel
        this.hasUnreadNotification = user.hasUnreadNotification
        this.hasPendingReceivedFollowRequest = user.hasPendingReceivedFollowRequest
        this.mutedWords = user.mutedWords
        this.mutedInstances = user.mutedInstances
        this.mutingNotificationTypes = user.mutingNotificationTypes
        this.emailNotificationTypes = user.emailNotificationTypes
        this.achievements = user.achievements
        this.loggedInDays = user.loggedInDays
        this.policies = user.policies
    }
}