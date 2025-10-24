export interface Location<S = LocationState> {
    pathname: Pathname;
    search: Search;
    state: S;
    hash: Hash;
    key?: LocationKey | undefined;
}
export interface RouterLocationState {
    nextPathname?: string;
    nextSearch?: string;
    background?: Location<RouterLocationState>;
    routeWithBackground?: string;
    update?: {
        dataTable?: boolean;
    };
    scrollTop?: boolean;
    from?: Location<RouterLocationState>;
}
export declare type Pathname = string;
export declare type Search = string;
export declare type Hash = string;
export declare type LocationState = unknown;
export declare type LocationKey = string;
export interface LocationDescriptorObject<S = LocationState> {
    pathname?: Pathname | undefined;
    search?: Search | undefined;
    state?: S | undefined;
    hash?: Hash | undefined;
    key?: LocationKey | undefined;
}
