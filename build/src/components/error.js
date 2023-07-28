"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MisTsKeyError = void 0;
class MisTsKeyError extends Error {
    constructor(config) {
        super(`[${config.code}] \n ${config.message} \n uuid : ${config.id} / kind : ${config.kind}`);
    }
}
exports.MisTsKeyError = MisTsKeyError;
