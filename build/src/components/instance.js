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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = void 0;
const posts_1 = require("../posts");
const meta_1 = require("./meta");
class Instance {
    constructor(client) {
        this.client = client;
    }
    getMeta(detail = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, posts_1.GETPOST)(`https://${this.client.getHost}/api/meta`, { detail: detail });
            return new meta_1.ServerMeta(data.data, this.client);
        });
    }
}
exports.Instance = Instance;
