import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces.js';
import { FormItemProps } from '../Item.js';
import { OptionType } from '../../dataProvider/index.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface AjaxSelectInputProps extends Omit<SelectProps, 'showSearch' | 'onSearch' | 'loading' | 'children' | 'filterOption'>, FormItemProps, FieldRuleProps {
    name: string;
    /**
     * Fetch the field's options. The third argument carries the field's scope
     * values (R6) so a cascade child can query by its parent (e.g. cities of the
     * selected country). The argument is additive — two-argument callbacks keep
     * working unchanged.
     */
    fetchOptions: (field: string, query?: string, values?: Record<string, any>) => Promise<OptionType[]>;
    fetchTimeout?: number;
    /**
     * Parent field names that, when changed by an operator, reset this field to
     * `null` and refetch its options (R7, KTD9). Paths are resolved within the
     * field's own scope (so an ArrayInput row resets only its own row).
     */
    resetOnChangeOf?: string[];
    onChange?: (value: any) => void;
}
export declare const AjaxSelectInput: (props: AjaxSelectInputProps) => React.JSX.Element | null;
