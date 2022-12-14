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
exports.NicoSearch = void 0;
const axios_1 = __importDefault(require("axios"));
let url = 'https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search';
function NicoSearch(query, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield (0, axios_1.default)({
            url,
            params: {
                q: query,
                targets: "tagsExact",
                fields: "contentId",
                _sort: "-viewCounter",
                _limit: limit,
            },
            method: "GET",
        });
        return info.data;
    });
}
exports.NicoSearch = NicoSearch;
// run('初音ミク', 10)
