"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerMeta = void 0;
class ServerMeta {
    constructor(data, client) {
        this.maintainerName = data.maintainerName;
        this.maintainerEmail = data.maintainerEmail;
        this.version = data.version;
        this.uri = data.uri;
        this.description = data.description;
        this.langs = data.langs;
        this.tosUrl = data.tosUrl;
        this.repositoryUrl = data.repositoryUrl;
        this.feedbackUrl = data.feedbackUrl;
        this.disableRegistration = data.disableRegistration;
        this.emailRequiredForSignup = data.emailRequiredForSignup;
        this.enableHcaptcha = data.enableHcaptcha;
        this.hcaptchaSiteKey = data.hcaptchaSiteKey;
        this.enableRecaptcha = data.enableRecaptcha;
        this.recaptchaSiteKey = data.recaptchaSiteKey;
        this.enableTurnstile = data.enableTurnstile;
        this.swPublickey = data.swPublickey;
        this.themeColor = data.themeColor;
        this.mascotImageUrl = data.mascotImageUrl;
        this.bannerUrl = data.bannerUrl;
        this.infoImageUrl = data.infoImageUrl;
        this.serverErrorImageUrl = data.serverErrorImageUrl;
        this.notFoundImageUrl = data.notFoundImageUrl;
        this.iconUrl = data.iconUrl;
        this.backgroundImageUrl = data.backgroundImageUrl;
        this.logoImageUrl = data.logoImageUrl;
        this.maxNoteTextLength = data.maxNoteTextLength;
        this.defaultDarkTheme = data.defaultDarkTheme;
        this.defaultLightTheme = data.defaultLightTheme;
        this.ads = data.ads;
        this.enableEmail = data.enableEmail;
        this.enableServiceWorker = data.enableServiceWorker;
        this.translatorAvailable = data.translatorAvailable;
        this.serverRules = data.serverRules;
        this.policies = data.policies;
        this.mediaProxy = data.mediaProxy;
        this.cacheRemoteFiles = data.cacheRemoteFiles;
        this.cacheRemoteSensitiveFiles = data.cacheRemoteSensitiveFiles;
        this.requireSetup = data.requireSetup;
        this.proxyAccountName = data.proxyAccountName;
        this.features = data.features;
        this.client = client;
    }
}
exports.ServerMeta = ServerMeta;
