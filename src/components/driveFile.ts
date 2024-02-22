import { MisskeyUser } from ".";

export interface DriveFileCreate {
	id: string
	createAt: string
	name: string
	type: string
	md5: string
	size: number
	isSensitive: boolean
	blurhash: string | null
	properties: {
		width: number
		height: number
		orientation: number
		avgColor: string
	}
	url: string
	thumbnailUrl: string | null
	comment: string | null
	folderId: string | null
	folder: {
		id: string
		createAt: string
		name: string
		parentId: string | null
		foldersCount: number
		filesCount: number
		/**
		 * @Recursive
		 */
		parent: object
	}
	userId: string | null
	user: MisskeyUser
}

export class DriveFile implements DriveFileCreate {
	id: string;
	createAt: string;
	name: string;
	type: string;
	md5: string;
	size: number;
	isSensitive: boolean;
	blurhash: string | null;
	properties: {
		width: number;
		height: number;
		orientation: number;
		avgColor: string;
	};
	url: string;
	thumbnailUrl: string | null;
	comment: string | null;
	folderId: string | null;
	folder: {
		id: string;
		createAt: string;
		name: string;
		parentId: string | null;
		foldersCount: number;
		filesCount: number;
		parent: object;
	};
	userId: string | null;
	user: MisskeyUser;

	constructor(data: DriveFile) {
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