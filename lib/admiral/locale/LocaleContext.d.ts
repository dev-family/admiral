import React from 'react';
import { AdmiralLocale } from './interfaces';
export declare const defaultLocale: AdmiralLocale;
export declare const LocaleContext: React.Context<AdmiralLocale>;
export declare const LocaleContextProvider: React.FC<{
    value?: Partial<AdmiralLocale>;
}>;
export declare function useLocaleProvider(): AdmiralLocale;
