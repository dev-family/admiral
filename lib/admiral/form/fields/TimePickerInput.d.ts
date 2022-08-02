import React from 'react';
import { TimePickerProps as BaseTimePickerProps } from '../../ui';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
interface TimePickerProps extends Omit<BaseTimePickerProps, 'format'> {
}
export declare type TimePickerInputProps = FormItemProps & {
    name: string;
    format: string;
} & TimePickerProps;
export declare const TimePickerInput: InputComponentWithName<React.FC<TimePickerInputProps>>;
export declare const parseValue: (value: string, format: string) => Date | null;
export {};
