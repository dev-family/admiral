import React from 'react';
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export declare type DateRangePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & PickerProps<Date>;
export declare const DatePickerInput: InputComponentWithName<React.FC<DateRangePickerInputProps>>;
