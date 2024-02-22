/// <reference types="node" />
type PsBfResolve = string | Buffer;
export declare class CreateAttachment {
    private __file;
    constructor();
    /**
     * # set
     *
     * 画像もしくは添付するファイルをセットします。
     *
     * @param {PsBfResolve} data ファイルのパス もしくは Buffer
     * @returns {Promise<string>} アップロードされた画像のID
     */
    set(data: PsBfResolve, config?: uploadConfig): this;
    toObject(): {
        file: Buffer;
    } & uploadConfig;
}
export interface uploadConfig {
    name?: string | null;
    comment?: string | null;
    isSensitive?: boolean;
    force?: boolean;
}
export {};
