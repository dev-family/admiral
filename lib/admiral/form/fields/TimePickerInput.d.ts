import React from 'react';
import { TimePickerProps } from '../../ui';
import { FormItemProps } from '../Item';
export declare type TimePickerInputProps = FormItemProps & {
    name: string;
} & TimePickerProps;
export declare const TimePickerInput: React.FC<TimePickerInputProps>;
