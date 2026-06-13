import React from 'react';
import { PickerRangeProps } from '../../ui/DatePicker/generatePicker/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export type DateRangePickerInputProps = FormItemProps & FieldRuleProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerRangeProps<Date>;
export declare const DateRangePickerInput: (props: DateRangePickerInputProps) => React.JSX.Element | null;
