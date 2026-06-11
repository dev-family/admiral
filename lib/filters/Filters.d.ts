import React from 'react';
import { Locale } from './interfaces.js';
import { GetFiltersFormDataResult } from '../dataProvider/index.js';
export type FiltersProps = {
    locale?: Locale;
    fetchInitialData?: (urlState: Record<string, any>) => Promise<GetFiltersFormDataResult>;
    children?: React.ReactNode;
};
export declare function Filters({ locale, fetchInitialData, children }: FiltersProps): import("react/jsx-runtime").JSX.Element;
