import { SelectLocale } from '../ui/Select/interfaces';
import { PickerLocale } from '../ui/DatePicker/generatePicker/interfaces';
import { EditorLocaleType } from '../ui/Editor/interfaces';
import { UploadLocale } from '../ui/Upload/interfaces';
export declare type Locale = {
    successMessage: string;
    fields: {
        array: ArrayInputLocale;
        editor?: EditorLocaleType;
        datePicker: PickerLocale;
        select: SelectLocale;
        upload: UploadLocale;
    };
};
export declare type ArrayInputLocale = {
    add: string;
    remove: string;
};
export declare const INPUT_NAMES: {
    readonly array: "ArrayInput";
    readonly boolean: "BooleanInput";
    readonly colorPicker: "ColorPickerInput";
    readonly datePicker: "DatePickerInput";
    readonly dragger: "DraggerInput";
    readonly editor: "EditorInput";
    readonly filePicture: "FilePictureInput";
    readonly multilineText: "MultilineTextInput";
    readonly password: "PasswordInput";
    readonly select: "SelectInput";
    readonly text: "TextInput";
    readonly timePicker: "TimePickerInput";
    readonly slug: "SlugInput";
    readonly translatable: "TranslatableInput";
    readonly ajaxSelectInput: "AjaxSelectInput";
};
declare const inputTypes: ("ArrayInput" | "BooleanInput" | "ColorPickerInput" | "DatePickerInput" | "DraggerInput" | "EditorInput" | "FilePictureInput" | "MultilineTextInput" | "PasswordInput" | "SelectInput" | "TextInput" | "TimePickerInput" | "SlugInput" | "TranslatableInput" | "AjaxSelectInput")[];
export declare type FormInputType = typeof inputTypes[number];
export declare type InputComponentWithName<T> = T & {
    inputName: FormInputType;
};
export {};
