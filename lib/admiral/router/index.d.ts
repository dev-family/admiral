import React from 'react';
import { RouterLocationState } from './interfaces';
import type { Location } from 'history';
interface CreateRoutesConfig {
    withAuth?: boolean;
}
export declare function createRoutesFrom(modules: any, config?: CreateRoutesConfig): () => JSX.Element;
declare type TopLocationContextValue = Location<RouterLocationState>;
export declare const TopLocationContext: React.Context<TopLocationContextValue>;
export declare const TopLocationContextProvider: React.FC<{
    value: TopLocationContextValue;
}>;
export declare function useTopLocation(): TopLocationContextValue;
export {};
