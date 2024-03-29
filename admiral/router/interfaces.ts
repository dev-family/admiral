export interface Location<S = LocationState> {
    pathname: Pathname
    search: Search
    state: S
    hash: Hash
    key?: LocationKey | undefined
}
export interface RouterLocationState {
    nextPathname?: string
    nextSearch?: string
    background?: Location<RouterLocationState>
    routeWithBackground?: string
    update?: { dataTable?: boolean }
    scrollTop?: boolean
}

export type Pathname = string
export type Search = string
export type Hash = string
export type LocationState = unknown
export type LocationKey = string

export interface LocationDescriptorObject<S = LocationState> {
    pathname?: Pathname | undefined
    search?: Search | undefined
    state?: S | undefined
    hash?: Hash | undefined
    key?: LocationKey | undefined
}
