import React from 'react';
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export type DatePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerProps<Date>;
export declare const DatePickerInput: InputComponentWithName<(props: DatePickerInputProps) => React.JSX.Element>;
