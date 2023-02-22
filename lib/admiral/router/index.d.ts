import React from 'react';
import { Location, RouterLocationState } from './interfaces';
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
