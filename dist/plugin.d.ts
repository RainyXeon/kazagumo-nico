import { KazagumoPlugin as Plugin, Kazagumo } from 'kazagumo';
import { NicoOptions } from './types';
export declare class KazagumoPlugin extends Plugin {
    options: NicoOptions;
    private _search;
    private kazagumo;
    private readonly methods;
    constructor(nicoOptions: NicoOptions);
    load(kazagumo: Kazagumo): void;
    private search;
    private buildSearch;
    private searchTrack;
    private getTrack;
    private filterNullOrUndefined;
    private buildKazagumoTrack;
}
