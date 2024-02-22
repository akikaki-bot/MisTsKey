"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MisTsKeyError = void 0;
class MisTsKeyError extends Error {
    constructor(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super(`[${(_a = config === null || config === void 0 ? void 0 : config.code) !== null && _a !== void 0 ? _a : "Unknown Code"}] \n ${(_b = config === null || config === void 0 ? void 0 : config.message) !== null && _b !== void 0 ? _b : "Unknown Error"} \n ${(_d = (_c = config === null || config === void 0 ? void 0 : config.info) === null || _c === void 0 ? void 0 : _c.param) !== null && _d !== void 0 ? _d : "Unknown param"} <- ${(_f = (_e = config === null || config === void 0 ? void 0 : config.info) === null || _e === void 0 ? void 0 : _e.reason) !== null && _f !== void 0 ? _f : "Unknown Reason"} \n uuid : ${(_g = config === null || config === void 0 ? void 0 : config.id) !== null && _g !== void 0 ? _g : "Unknown UUID"} / kind : ${(_h = config === null || config === void 0 ? void 0 : config.kind) !== null && _h !== void 0 ? _h : "Unknown Kind"}`);
    }
}
exports.MisTsKeyError = MisTsKeyError;
