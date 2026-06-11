import React from 'react';
import { TimePickerProps as BaseTimePickerProps } from '../../ui/index.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
interface TimePickerProps extends Omit<BaseTimePickerProps, 'format'> {
}
export type TimePickerInputProps = FormItemProps & {
    name: string;
    format: string;
    onChange?: (value: any) => void;
} & TimePickerProps;
export declare const TimePickerInput: InputComponentWithName<(props: TimePickerInputProps) => React.JSX.Element>;
export declare const parseValue: (value: string, format: string) => Date | null;
export {};
