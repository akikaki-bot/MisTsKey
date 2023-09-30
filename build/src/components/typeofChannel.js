"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeofChannel = void 0;
const _1 = require(".");
class TypeofChannel {
    constructor(component, client) {
        this.component = component;
        this.client = client;
    }
    host(host) {
        if (this.component instanceof _1.Note) {
            if (typeof this.component.uri === "undefined")
                return this.client.getHost === host;
            if (this.component.uri.includes("https://")) {
                const arr = this.component.uri.split("/");
                return arr[2] === host;
            }
        }
    }
    localOnly() {
        if (this.component instanceof _1.Note) {
            return this.component.localOnly;
        }
        else {
            return false;
        }
    }
}
exports.TypeofChannel = TypeofChannel;
