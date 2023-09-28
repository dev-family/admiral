import React from 'react';
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export declare type DatePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerProps<Date>;
export declare const DatePickerInput: InputComponentWithName<React.FC<DatePickerInputProps>>;
