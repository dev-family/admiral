import React from 'react';
import { CRUDLocale } from '../interfaces';
export declare const LocaleContext: React.Context<CRUDLocale>;
export declare const LocaleContextProvider: React.FC<{
    value?: Partial<CRUDLocale>;
}>;
export declare function useLocaleProvider(): CRUDLocale;
