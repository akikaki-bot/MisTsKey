"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const node_events_1 = require("node:events");
class BaseClient extends node_events_1.EventEmitter {
    constructor(token, channelType) {
        super();
        this.token = token;
        this.channelType = channelType;
    }
}
exports.BaseClient = BaseClient;
