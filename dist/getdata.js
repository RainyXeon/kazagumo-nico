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
exports.getInfo = void 0;
const node_html_parser_1 = require("node-html-parser");
const node_fetch_1 = __importDefault(require("node-fetch"));
const headers_1 = require("./headers");
function getInfo(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoSiteDom = (0, node_html_parser_1.parse)(yield (yield (0, node_fetch_1.default)(url, { headers: headers_1.headers })).text());
        const matchResult = videoSiteDom
            .querySelectorAll('div')
            .filter((a) => a.rawAttributes.id === 'js-initial-watch-data');
        if (matchResult.length === 0) {
            throw Error('Failed get video site html...');
        }
        const patterns = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#x27;': "'",
            '&#x60;': '`',
        };
        const fixedString = matchResult[0].rawAttributes['data-api-data'].replace(/&(lt|gt|amp|quot|#x27|#x60);/g, function (match) {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return patterns[match];
        });
        let data = JSON.parse(fixedString);
        return Object.assign(data.video, {
            owner: data.owner,
        });
    });
}
exports.getInfo = getInfo;
