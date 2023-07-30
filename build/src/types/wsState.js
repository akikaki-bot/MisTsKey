"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketState = void 0;
var WebSocketState;
(function (WebSocketState) {
    WebSocketState[WebSocketState["init"] = 0] = "init";
    WebSocketState[WebSocketState["connecting"] = 1] = "connecting";
    WebSocketState[WebSocketState["connected"] = 2] = "connected";
    WebSocketState[WebSocketState["reconnecting"] = 3] = "reconnecting";
})(WebSocketState || (exports.WebSocketState = WebSocketState = {}));
