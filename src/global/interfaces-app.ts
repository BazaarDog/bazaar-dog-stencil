
export interface Map<T> {
    [key: string]: T;
}

export interface SearchProvider {
    id: string,
    name: string,
    logo: string,
    listings: string,
    reports: string,
    torlistings: string,
    enabled: boolean,
    cors: boolean
}


export interface Gateway {
    id: string,
    name: string,
    url: string,
    port: number,
    enabled: boolean,
    cors: boolean
}


export interface PaginationInterface {
    p: number,
    total: number,
    ps: number,
    more: boolean
}
export interface SearchOptionItems {
    label: string,
    default: boolean,
    checked: boolean,
    value: any
}


export interface SearchOptionInterface {
    label: string,
    type: string,
    options: Array<SearchOptionItems>,
}

export interface SortByItems {
    label: string,
    selected: boolean,
    default: boolean,
}

