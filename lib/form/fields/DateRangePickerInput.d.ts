import React from 'react';
import { PickerRangeProps } from '../../ui/DatePicker/generatePicker/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export type DateRangePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerRangeProps<Date>;
export declare const DateRangePickerInput: InputComponentWithName<(props: DateRangePickerInputProps) => React.JSX.Element>;
