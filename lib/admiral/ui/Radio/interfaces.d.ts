/// <reference types="react" />
import { CheckboxProps } from '../Checkbox/interfaces';
export interface RadioProps extends CheckboxProps {
}
export declare type RadioValueType = string | number | null;
export interface RadioOptionType {
    label: React.ReactNode;
    value: RadioValueType;
}
export interface RadioGroupProps extends Omit<RadioProps, 'defaultChecked' | 'checked' | 'type' | 'autofocus' | 'children' | 'id'> {
    options?: Array<RadioOptionType | string | number>;
    defaultValue?: any;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
