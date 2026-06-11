import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
import { OptionType } from '../../dataProvider/index.js';
export interface AjaxSelectInputProps extends Omit<SelectProps, 'showSearch' | 'onSearch' | 'loading' | 'children' | 'filterOption'>, FormItemProps {
    name: string;
    fetchOptions: (field: string, query?: string) => Promise<OptionType[]>;
    fetchTimeout?: number;
    onChange?: (value: any) => void;
}
export declare const AjaxSelectInput: InputComponentWithName<(props: AjaxSelectInputProps) => React.JSX.Element>;
