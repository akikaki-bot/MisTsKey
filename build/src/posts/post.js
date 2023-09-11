"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETPOST = exports.POST = void 0;
const axios_1 = __importDefault(require("axios"));
const error_1 = require("../components/error");
//eslint-disable-next-line
function POST(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default.post(path, data)
            .catch((error) => {
            const Message = error.response.data.error;
            throw new error_1.MisTsKeyError(Message);
        });
    });
}
exports.POST = POST;
function GETPOST(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default.post(path, data)
            .catch((error) => {
            const Message = error.response.data.error;
            throw new error_1.MisTsKeyError(Message);
        });
    });
}
exports.GETPOST = GETPOST;
