import React from 'react';
type DataTableValueType = {
    refresh: () => void;
};
export declare const DataTableContext: React.Context<DataTableValueType>;
export declare function DataTableContextProvider({ value, children, }: {
    value: DataTableValueType;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useDataTable(): DataTableValueType;
export {};
