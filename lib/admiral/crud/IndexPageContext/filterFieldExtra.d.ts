import React from 'react';
import { SelectInputProps, TimePickerInputProps } from '../../form';
import { TimePickerExtra, SelectExtra } from './interfaces';
export declare function getTimePickerExtra(timePicker: React.ReactElement<TimePickerInputProps>): TimePickerExtra;
export declare function getSelectExtra(select: React.ReactElement<SelectInputProps>): SelectExtra;
