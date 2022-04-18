import React from 'react';
import { DataProvider } from './interfaces';
export declare const DataProviderContext: React.Context<DataProvider>;
export declare const DataProviderContextProvider: React.FC<{
    value: DataProvider;
}>;
export declare function useDataProvider(): DataProvider;
