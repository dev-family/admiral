import React from 'react';
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export type DatePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerProps<Date>;
export declare const DatePickerInput: InputComponentWithName<(props: DatePickerInputProps) => React.JSX.Element>;
