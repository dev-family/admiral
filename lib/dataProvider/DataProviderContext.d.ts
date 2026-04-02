import React from 'react';
import { DataProvider } from './interfaces';
export declare const DataProviderContext: React.Context<DataProvider>;
export declare function DataProviderContextProvider({ value, children, }: {
    value: DataProvider;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useDataProvider(): DataProvider;
