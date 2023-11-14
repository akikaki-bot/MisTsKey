"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmeraldObjectVaildater = exports.BasedObject = void 0;
/**
 * ## Emerald - BasedObject
 *
 * 基礎となるオブジェクトのユーティリティー関数を実装している部分。
 *
 */
class BasedObject {
    constructor(object) {
        this._object = object;
    }
    merge(value) {
        return Object.assign(this._object, value);
    }
    mergeNullValue(value, newer, isNull) {
        return Object.assign(this._object, newer !== null ? { [`${value}`]: newer } : { [`${value}`]: isNull });
    }
    mergeNullObject(value, isNull) {
        return Object.assign(this._object, value !== null && value !== void 0 ? value : isNull);
    }
    remove(key) {
        delete this._object[key];
        return this._object;
    }
    get Object() {
        return this._object;
    }
}
exports.BasedObject = BasedObject;
/**
 * ## Emerald - ObjectVaildater
 *
 * オブジェクトを正しい形へと導くエメラルドパッケージ。
 *
 * `Emerald BasedObject`を親にしています。
 */
class EmeraldObjectVaildater extends BasedObject {
    constructor(object) {
        super(object);
        this.defaultValue = undefined;
    }
    default(value) {
        this.defaultValue = value;
    }
    parse(value) {
        return typeof value === "undefined" ? this.defaultValue : value;
    }
}
exports.EmeraldObjectVaildater = EmeraldObjectVaildater;
