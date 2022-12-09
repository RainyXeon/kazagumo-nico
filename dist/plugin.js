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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KazagumoPlugin = void 0;
const kazagumo_1 = require("kazagumo");
const getdata_1 = require("./getdata");
const search_1 = require("./search");
const REGEX = /^https?:\/\/(?:www\.|secure\.|sp\.)?nicovideo\.jp\/watch\/([a-z]{2}[0-9]+)/;
class KazagumoPlugin extends kazagumo_1.KazagumoPlugin {
    constructor(nicoOptions) {
        super();
        this.options = nicoOptions;
        this.methods = {
            track: this.getTrack.bind(this),
        };
        this.kazagumo = null;
        this._search = null;
    }
    load(kazagumo) {
        this.kazagumo = kazagumo;
        this._search = kazagumo.search.bind(kazagumo);
        kazagumo.search = this.search.bind(this);
    }
    search(query, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.kazagumo || !this._search)
                throw new kazagumo_1.KazagumoError(1, 'kazagumo-nico is not loaded yet.');
            if (!query)
                throw new kazagumo_1.KazagumoError(3, 'Query is required');
            const [, id] = REGEX.exec(query) || [];
            const isUrl = /^https?:\/\//.test(query);
            if (id) {
                try {
                    const _function = this.methods.track;
                    const result = yield _function(id, options === null || options === void 0 ? void 0 : options.requester);
                    const loadType = 'TRACK';
                    const playlistName = (_a = result.name) !== null && _a !== void 0 ? _a : undefined;
                    const tracks = result.tracks.filter(this.filterNullOrUndefined);
                    return this.buildSearch(playlistName, tracks, loadType);
                }
                catch (e) {
                    return this.buildSearch(undefined, [], 'SEARCH');
                }
            }
            else if ((options === null || options === void 0 ? void 0 : options.engine) === 'nicovideo' && !isUrl) {
                const result = yield this.searchTrack(query, options === null || options === void 0 ? void 0 : options.requester);
                return this.buildSearch(undefined, result.tracks, 'SEARCH');
            }
            return this._search(query, options);
        });
    }
    buildSearch(playlistName, tracks = [], type) {
        return {
            playlistName,
            tracks,
            type: type !== null && type !== void 0 ? type : 'TRACK',
        };
    }
    searchTrack(query, requester) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield (0, search_1.NicoSearch)(query, this.options.searchLimit);
                const res = [];
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    const info = yield (0, getdata_1.getInfo)(`https://www.nicovideo.jp/watch/${e.contentId}`);
                    res.push(info);
                }
                return {
                    tracks: res.map((track) => this.buildKazagumoTrack(track, requester)),
                };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    getTrack(id, requester) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield (0, getdata_1.getInfo)(`https://www.nicovideo.jp/watch/${id}`);
                console.log(info);
                return { tracks: [this.buildKazagumoTrack(info, requester)] };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    filterNullOrUndefined(obj) {
        return obj !== undefined && obj !== null;
    }
    buildKazagumoTrack(nicoTrack, requester) {
        return new kazagumo_1.KazagumoTrack({
            track: '',
            info: {
                sourceName: 'nicovideo',
                identifier: nicoTrack.id,
                isSeekable: true,
                author: nicoTrack.owner ? nicoTrack.owner.nickname : 'Unknown',
                length: nicoTrack.duration * 1000,
                isStream: false,
                position: 0,
                title: nicoTrack.title,
                uri: `https://www.nicovideo.jp/watch/${nicoTrack.id}`,
                thumbnail: nicoTrack.thumbnail ? nicoTrack.thumbnail.url : ''
            },
        }, requester);
    }
}
exports.KazagumoPlugin = KazagumoPlugin;
