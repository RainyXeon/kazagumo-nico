import { KazagumoPlugin as Plugin, Kazagumo, KazagumoTrack } from 'kazagumo';
export declare class KazagumoPlugin extends Plugin {
    private _search;
    private kazagumo;
    private readonly methods;
    constructor();
    load(kazagumo: Kazagumo): void;
    private search;
    private buildSearch;
    private searchTrack;
    private getTrack;
    private filterNullOrUndefined;
    private buildKazagumoTrack;
}
export interface Result {
    tracks: KazagumoTrack[];
    name?: string;
}
export interface OwnerInfo {
    id: number;
    nickname: string;
    iconUrl: string;
    channel: string | null;
    live: {
        id: string;
        title: string;
        url: string;
        begunAt: string;
        isVideoLive: boolean;
        videoLiveOnAirStartTime: string | null;
        thumbnailUrl: string | null;
    } | null;
    isVideoPublic: boolean;
    isMylistsPublic: boolean;
    videoLiveNotice: null;
    viewer: number | null;
}
interface OriginalVideoInfo {
    id: string;
    title: string;
    description: string;
    count: {
        view: number;
        comment: number;
        mylist: number;
        like: number;
    };
    duration: number;
    thumbnail: {
        url: string;
        middleUrl: string;
        largeUrl: string;
        player: string;
        ogp: string;
    };
    rating: {
        isAdult: boolean;
    };
    registerdAt: string;
    isPrivate: boolean;
    isDeleted: boolean;
    isNoBanner: boolean;
    isAuthenticationRequired: boolean;
    isEmbedPlayerAllowed: boolean;
    viewer: null;
    watchableUserTypeForPayment: string;
    commentableUserTypeForPayment: string;
    [key: string]: any;
}
export interface VideoInfo extends OriginalVideoInfo {
    owner: OwnerInfo;
}
export {};
//# sourceMappingURL=plugin.d.ts.map