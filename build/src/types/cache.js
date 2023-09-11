"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
//eslint-disable-next-line
class Cache extends Map {
    constructor() {
        super();
        this.Cache = new Map();
    }
}
exports.Cache = Cache;
