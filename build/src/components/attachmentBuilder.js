"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttachment = void 0;
//import { Client } from "..";
const fs_1 = require("fs");
class CreateAttachment {
    constructor() {
    }
    /**
     * # set
     *
     * 画像もしくは添付するファイルをセットします。
     *
     * @param {PsBfResolve} data ファイルのパス もしくは Buffer
     * @returns {Promise<string>} アップロードされた画像のID
     */
    set(data, config) {
        if (data instanceof Buffer) {
            this.__file = Object.assign({ file: data }, config);
        }
        else {
            const file = (0, fs_1.readFileSync)(data);
            this.__file = Object.assign({ file: file }, config);
        }
        return this;
    }
    toObject() {
        return this.__file;
    }
}
exports.CreateAttachment = CreateAttachment;
