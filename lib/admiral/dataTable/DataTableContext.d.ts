import React from 'react';
declare type DataTableValueType = {
    refresh: () => void;
};
export declare const DataTableContext: React.Context<DataTableValueType>;
export declare const DataTableContextProvider: React.FC<{
    value: DataTableValueType;
}>;
export declare function useDataTable(): DataTableValueType;
export {};
