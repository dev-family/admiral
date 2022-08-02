import React from 'react';
import { CrudIndexPageValueType } from './IndexPageContext/interfaces';
export declare const CrudIndexPageContext: React.Context<CrudIndexPageValueType>;
export declare const CrudIndexPageContextProvider: React.FC<{
    filterFields?: JSX.Element;
}>;
export declare function useCrudIndex(): CrudIndexPageValueType;
