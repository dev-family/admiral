import React from 'react';
import { AdmiralLocale } from './interfaces.js';
export declare const defaultLocale: AdmiralLocale;
export declare const LocaleContext: React.Context<AdmiralLocale>;
export declare function LocaleContextProvider({ value, children, }: {
    value?: Partial<AdmiralLocale>;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useLocaleProvider(): AdmiralLocale;
