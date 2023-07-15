export interface MeDetailed {
    id: string;
    name: string | null;
    username: string;
    host: string | null;
    avatarUrl: string;
    avatarBlurhash: string | null;
    isBot: boolean;
    isCat: boolean;
    emojis: Emojis;
    onlineStatus: string;
    badgeRoles: BadgeRole[];
    url: string | null;
    uri: string | null;
    movedTo: string | null;
    alsoKnownAs: string | null;
    createdAt: Date;
    updatedAt: Date;
    lastFetchedAt: string | null;
    bannerUrl: string | null;
    bannerBlurhash: string | null;
    isLocked: boolean;
    isSilenced: boolean;
    isSuspended: boolean;
    description: string | null;
    location: string | null;
    birthday: string | null;
    lang: string | null;
    fields: any[];
    followersCount: number;
    followingCount: number;
    notesCount: number;
    pinnedNoteIds: any[];
    pinnedNotes: any[];
    pinnedPageId: string | null;
    pinnedPage: string | null;
    publicReactions: boolean;
    ffVisibility: string;
    twoFactorEnabled: boolean;
    usePasswordLessLogin: boolean;
    securityKeys: boolean;
    roles: Role[];
    memo: string | null;
    avatarId: string | null;
    bannerId: string | null;
    isModerator: boolean;
    isAdmin: boolean;
    injectFeaturedNote: boolean;
    receiveAnnouncementEmail: boolean;
    alwaysMarkNsfw: boolean;
    autoSensitive: boolean;
    carefulBot: boolean;
    autoAcceptFollowed: boolean;
    noCrawle: boolean;
    preventAiLearning: boolean;
    isExplorable: boolean;
    isDeleted: boolean;
    hideOnlineStatus: boolean;
    hasUnreadSpecifiedNotes: boolean;
    hasUnreadMentions: boolean;
    hasUnreadAnnouncement: boolean;
    hasUnreadAntenna: boolean;
    hasUnreadChannel: boolean;
    hasUnreadNotification: boolean;
    hasPendingReceivedFollowRequest: boolean;
    mutedWords: any[];
    mutedInstances: any[];
    mutingNotificationTypes: any[];
    emailNotificationTypes: string[];
    achievements: Achievement[];
    loggedInDays: number;
    policies: Policies;
}
export interface Achievement {
    name: string;
    unlockedAt: number;
}
export interface BadgeRole {
    name: string;
    iconUrl: string;
    displayOrder: number;
}
export interface Emojis {
}
export interface Policies {
    gtlAvailable: boolean;
    ltlAvailable: boolean;
    canPublicNote: boolean;
    canInvite: boolean;
    canManageCustomEmojis: boolean;
    canSearchNotes: boolean;
    canHideAds: boolean;
    driveCapacityMb: number;
    alwaysMarkNsfw: boolean;
    pinLimit: number;
    antennaLimit: number;
    wordMuteLimit: number;
    webhookLimit: number;
    clipLimit: number;
    noteEachClipsLimit: number;
    userListLimit: number;
    userEachUserListsLimit: number;
    rateLimitFactor: number;
}
export interface Role {
    id: string;
    name: string;
    color: string;
    iconUrl: string | null;
    description: string;
    isModerator: boolean;
    isAdministrator: boolean;
    displayOrder: number;
}
