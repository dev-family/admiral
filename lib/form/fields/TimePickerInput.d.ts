import React from 'react';
import { TimePickerProps as BaseTimePickerProps } from '../../ui/index.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
interface TimePickerProps extends Omit<BaseTimePickerProps, 'format'> {
}
export type TimePickerInputProps = FormItemProps & FieldRuleProps & {
    name: string;
    format: string;
    onChange?: (value: any) => void;
} & TimePickerProps;
export declare const TimePickerInput: (props: TimePickerInputProps) => React.JSX.Element | null;
export declare const parseValue: (value: string, format: string) => Date | null;
export {};
