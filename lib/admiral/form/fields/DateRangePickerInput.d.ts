import React from 'react';
import { PickerRangeProps } from '../../ui/DatePicker/generatePicker/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export declare type DateRangePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
    showTime?: boolean;
} & PickerRangeProps<Date>;
export declare const DateRangePickerInput: InputComponentWithName<React.FC<DateRangePickerInputProps>>;
