import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces';
import { FormItemProps } from '../Item';
export interface SelectInputProps extends SelectProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const SelectInput: React.FC<SelectInputProps> & {
    inputName: "ArrayInput" | "BooleanInput" | "ColorPickerInput" | "DatePickerInput" | "DraggerInput" | "EditorInput" | "FilePictureInput" | "MultilineTextInput" | "PasswordInput" | "SelectInput" | "TextInput" | "TimePickerInput" | "SlugInput" | "TranslatableInput" | "AjaxSelectInput" | "RadioInput";
} & {
    Option: import("rc-select/lib/Option").OptionFC;
    OptGroup: import("rc-select/lib/OptGroup").OptionGroupFC;
};
