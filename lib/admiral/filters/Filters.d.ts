import React from 'react';
import { Locale } from './interfaces';
import { GetFiltersFormDataResult } from '../dataProvider';
export declare type FiltersProps = {
    locale?: Locale;
    fetchInitialData?: (urlState: Record<string, any>) => Promise<GetFiltersFormDataResult>;
};
export declare const Filters: React.FC<FiltersProps>;
