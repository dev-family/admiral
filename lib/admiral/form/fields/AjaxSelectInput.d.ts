import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
import { OptionType } from '../../dataProvider';
export interface AjaxSelectInputProps extends Omit<SelectProps, 'showSearch' | 'onSearch' | 'loading' | 'children' | 'filterOption'>, FormItemProps {
    name: string;
    fetchOptions: (field: string, query?: string) => Promise<OptionType[]>;
    fetchTimeout?: number;
}
export declare const AjaxSelectInput: InputComponentWithName<React.FC<AjaxSelectInputProps>>;
