"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MisTsKeyError = void 0;
class MisTsKeyError extends Error {
    constructor(config) {
        var _a, _b, _c, _d, _e, _f;
        super(`[${(_a = config.code) !== null && _a !== void 0 ? _a : "Unknown Code"}] \n ${(_b = config.message) !== null && _b !== void 0 ? _b : "Unknown Error"} \n ${(_c = config.info.param) !== null && _c !== void 0 ? _c : "Unknown param"} <- ${(_d = config.info.reason) !== null && _d !== void 0 ? _d : "Unknown Reason"} \n uuid : ${(_e = config.id) !== null && _e !== void 0 ? _e : "Unknown UUID"} / kind : ${(_f = config.kind) !== null && _f !== void 0 ? _f : "Unknown Kind"}`);
    }
}
exports.MisTsKeyError = MisTsKeyError;
