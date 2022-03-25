import React from 'react'
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces'
import { FormItemProps } from '../Item'
export declare type DatePickerInputProps = FormItemProps & {
    name: string
} & PickerProps<Date>
export declare const DatePickerInput: React.FC<DatePickerInputProps>
