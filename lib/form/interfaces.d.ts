import { SelectLocale } from '../ui/Select/interfaces.js';
import { PickerLocale } from '../ui/DatePicker/generatePicker/interfaces.js';
import { EditorLocaleType } from '../ui/Editor/interfaces.js';
import { UploadLocale } from '../ui/Upload/interfaces.js';
export type Locale = {
    successMessage: string;
    serverErrorMessage: string;
    fields: {
        array?: ArrayInputLocale;
        editor?: EditorLocaleType;
        datePicker?: PickerLocale;
        select?: SelectLocale;
        upload?: UploadLocale;
    };
};
export type ArrayInputLocale = {
    add: string;
    remove: string;
};
export declare const INPUT_NAMES: {
    readonly array: "ArrayInput";
    readonly boolean: "BooleanInput";
    readonly colorPicker: "ColorPickerInput";
    readonly datePicker: "DatePickerInput";
    readonly dateRangePicker: "DateRangePickerInput";
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
    readonly radio: "RadioInput";
};
export type FormInputType = (typeof INPUT_NAMES)[keyof typeof INPUT_NAMES];
export type InputComponentWithName<T> = T & {
    inputName: FormInputType;
};
