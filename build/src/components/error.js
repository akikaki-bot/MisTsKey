"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MisTsKeyError = void 0;
class MisTsKeyError extends Error {
    constructor(config) {
        var _a, _b, _c, _d;
        super(`[${(_a = config.code) !== null && _a !== void 0 ? _a : "Unknown Code"}] \n ${(_b = config.message) !== null && _b !== void 0 ? _b : "Unknown Error"} \n uuid : ${(_c = config.id) !== null && _c !== void 0 ? _c : "Unknown UUID"} / kind : ${(_d = config.kind) !== null && _d !== void 0 ? _d : "Unknown Kind"}`);
    }
}
exports.MisTsKeyError = MisTsKeyError;
