import React from 'react';
import { CrudIndexPageValueType } from './IndexPageContext/interfaces';
export declare const CrudIndexPageContext: React.Context<CrudIndexPageValueType>;
export declare function CrudIndexPageContextProvider({ filterFields, children, }: {
    filterFields?: React.JSX.Element;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useCrudIndex(): CrudIndexPageValueType;
