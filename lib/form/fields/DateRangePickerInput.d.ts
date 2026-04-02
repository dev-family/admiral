import React from 'react';
import { PickerRangeProps } from '../../ui/DatePicker/generatePicker/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export type DateRangePickerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
    showTime?: boolean;
} & PickerRangeProps<Date>;
export declare const DateRangePickerInput: InputComponentWithName<(props: DateRangePickerInputProps) => React.JSX.Element>;
