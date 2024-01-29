import { AxiosResponse } from "axios";
import { BaseMisTskeyError } from "..";
/**
 * # HTTPClient
 *
 * 従来 `posts/post.ts` にあったメゾットをクラス化したものです。
 *
 * 従来の物よりもたぶん使いやすくなってます（しらんけど）
 */
export declare class HTTPClient {
    private baseUrl;
    constructor(baseUrl: string);
    /**
     * @type {T}
     *
     *
     *
     * @summary
     * **指定PATHに`POST`をします。**
     *
     * @param {string} path ポストする先のPATH
     * @param {T} data ポストするデータ
     * @returns {Promise<AxiosResponse<any>>}
     */
    POST<T>(path: string, data?: T): Promise<AxiosResponse<any>>;
    /**
     * @type {T}
     * @type {R}
     *
     *
     *
     * @summary
     * **指定PATHに`POST`をし、そのあとに帰ってくるデータを`Promise<R>`で返します。**
     *
     * @param {string} path POSTする先のURI
     * @param {T} data POSTするデータ
     *
     * @returns {Promise<AxiosResponse<R, MisTsKeyError>>}
     */
    GETPOST<T, R>(path: string, data?: T): Promise<AxiosResponse<R, BaseMisTskeyError>>;
}
