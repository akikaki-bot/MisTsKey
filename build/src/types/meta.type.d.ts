/**
 * # Type Meta
 *
 * 稼働サーバーの情報についてのベース型
 */
export interface Meta {
    maintainerName: string;
    maintainerEmail: string;
    version: string;
    name: string;
    uri: string;
    description: string;
    langs: string[];
    tosUrl: string;
    repositoryUrl: string;
    feedbackUrl: string;
    disableRegistration: boolean;
    emailRequiredForSignup: boolean;
    enableHcaptcha: boolean;
    hcaptchaSiteKey: string;
    enableRecaptcha: boolean;
    recaptchaSiteKey: string;
    enableTurnstile: boolean;
    turnstileSiteKey: string;
    swPublickey: string;
    themeColor: string;
    mascotImageUrl: string;
    bannerUrl: string;
    infoImageUrl: string;
    serverErrorImageUrl: string;
    notFoundImageUrl: string;
    iconUrl: string;
    backgroundImageUrl: string;
    logoImageUrl: string;
    maxNoteTextLength: number;
    defaultLightTheme: string;
    defaultDarkTheme: string;
    ads: Ad[];
    enableEmail: boolean;
    enableServiceWorker: boolean;
    translatorAvailable: boolean;
    serverRules: string[];
    policies: Policies;
    mediaProxy: string;
    cacheRemoteFiles: boolean;
    cacheRemoteSensitiveFiles: boolean;
    requireSetup: boolean;
    proxyAccountName: string;
    features: Features;
}
export interface Ad {
    id: string;
    url: string;
    place: Place;
    ratio: number;
    imageUrl: string;
    dayOfWeek: number;
}
export declare enum Place {
    Horizontal = "horizontal",
    HorizontalBig = "horizontal-big"
}
export interface Features {
    registration: boolean;
    emailRequiredForSignup: boolean;
    hcaptcha: boolean;
    recaptcha: boolean;
    turnstile: boolean;
    objectStorage: boolean;
    serviceWorker: boolean;
    miauth: boolean;
}
export interface Policies {
    gtlAvailable: boolean;
    ltlAvailable: boolean;
    canPublicNote: boolean;
    canCreateContent: boolean;
    canUpdateContent: boolean;
    canDeleteContent: boolean;
    canInvite: boolean;
    inviteLimit: number;
    inviteLimitCycle: number;
    inviteExpirationTime: number;
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
