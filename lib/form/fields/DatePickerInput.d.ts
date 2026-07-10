import React from 'react';
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export type DatePickerInputProps = FormItemProps & FieldRuleProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerProps<Date>;
export declare const DatePickerInput: (props: DatePickerInputProps) => React.JSX.Element | null;
