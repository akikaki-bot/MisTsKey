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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPClient = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
/**
 * # HTTPClient
 *
 * 従来 `posts/post.ts` にあったメゾットをクラス化したものです。
 *
 * 従来の物よりもたぶん使いやすくなってます（しらんけど）
 */
//eslint-disable-next-line
class HTTPClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
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
    //eslint-disable-next-line
    POST(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.baseUrl}${path}`).toString();
            return axios_1.default.post(url, data)
                .catch((error) => {
                const Message = error.response.data.error;
                throw new __1.MisTsKeyError(Message);
            });
        });
    }
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
    GETPOST(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.baseUrl}${path}`).toString();
            return axios_1.default.post(url, data)
                .catch((error) => {
                const Message = error.response.data.error;
                throw new __1.MisTsKeyError(Message);
            });
        });
    }
}
exports.HTTPClient = HTTPClient;
