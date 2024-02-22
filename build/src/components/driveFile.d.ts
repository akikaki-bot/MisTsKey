import { MisskeyUser } from ".";
export interface DriveFileCreate {
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
        /**
         * @Recursive
         */
        parent: object;
    };
    userId: string | null;
    user: MisskeyUser;
}
export declare class DriveFile implements DriveFileCreate {
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
    constructor(data: DriveFile);
}
