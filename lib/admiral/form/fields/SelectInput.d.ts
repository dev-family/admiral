import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces';
import { FormItemProps } from '../Item';
export interface SelectInputProps extends SelectProps, FormItemProps {
    name: string;
}
export declare const SelectInput: React.FC<SelectInputProps> & {
    inputName: "ArrayInput" | "BooleanInput" | "ColorPickerInput" | "DatePickerInput" | "DraggerInput" | "EditorInput" | "FilePictureInput" | "MultilineTextInput" | "PasswordInput" | "SelectInput" | "TextInput" | "TimePickerInput" | "SlugInput" | "TranslatableInput";
} & {
    Option: import("rc-select/lib/Option").OptionFC;
    OptGroup: import("rc-select/lib/OptGroup").OptionGroupFC;
};
