"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveFile = void 0;
class DriveFile {
    constructor(data) {
        this.id = data.id;
        this.createAt = data.createAt;
        this.name = data.name;
        this.type = data.type;
        this.md5 = data.md5;
        this.size = data.size;
        this.isSensitive = data.isSensitive;
        this.blurhash = data.blurhash;
        this.properties = data.properties;
        this.url = data.url;
        this.thumbnailUrl = data.thumbnailUrl;
        this.comment = data.comment;
        this.folderId = data.folderId;
        this.folder = data.folder;
        this.userId = data.userId;
        this.user = data.user;
    }
}
exports.DriveFile = DriveFile;
