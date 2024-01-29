"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePoll = void 0;
/**
 * # CreatePoll
 *
 * 投票を作成します。
 *
 * @example
 * ```ts
 * import { CreatePoll } from "mistskey"
 *
 * const poll = new CreatePoll();
 * poll.addChoice("ねこ").addChoice("いぬ")
 *
 * await client.user.note("いぬ派？ねこ派？", { poll : poll })
 */
class CreatePoll {
    constructor() {
        this.choices = [];
        this.multiple = false;
        this.expiresAt = null;
        this.expiredAfter = null;
    }
    addChoice(value) {
        this.choices.push(value);
        return this;
    }
    setMultiple(multiple = true) {
        this.multiple = multiple;
        return this;
    }
    setExpiresAt(expiresAt) {
        const Date = expiresAt.getTime();
        this.expiresAt = Math.floor(Date / 1000);
        return this;
    }
    setExpiresAfter(sec) {
        this.expiredAfter = sec;
        return this;
    }
    toJSON() {
        var _a, _b;
        return {
            choices: this.choices,
            multiple: this.multiple,
            expiresAt: (_a = this.expiresAt) !== null && _a !== void 0 ? _a : null,
            expiredAfter: (_b = this.expiredAfter) !== null && _b !== void 0 ? _b : null
        };
    }
}
exports.CreatePoll = CreatePoll;
