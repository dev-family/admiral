import React from 'react';
import { Location, RouterLocationState } from './interfaces';
interface CreateRoutesConfig {
    withAuth?: boolean;
}
export declare function createRoutesFrom(modules: any, config?: CreateRoutesConfig): () => import("react/jsx-runtime").JSX.Element;
type TopLocationContextValue = Location<RouterLocationState>;
export declare const TopLocationContext: React.Context<TopLocationContextValue>;
export declare function TopLocationContextProvider({ value, children, }: {
    value: TopLocationContextValue;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTopLocation(): TopLocationContextValue;
export {};
