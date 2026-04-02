import React from 'react';
export interface Options {
    navigateMode?: 'push' | 'replace';
}
type UrlState = Record<string, any>;
declare const useUrlState: <S extends UrlState = UrlState>(initialState?: S | (() => S), options?: Options) => readonly [Partial<{ [key in keyof S]: any; }>, (s: React.SetStateAction<Partial<{ [key in keyof S]: any; }>>) => void];
export default useUrlState;
