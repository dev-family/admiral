export declare type Locale = {
    fields: {
        array: ArrayInputLocale;
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
};
declare const inputTypes: ("ArrayInput" | "BooleanInput" | "ColorPickerInput" | "DatePickerInput" | "DraggerInput" | "EditorInput" | "FilePictureInput" | "MultilineTextInput" | "PasswordInput" | "SelectInput" | "TextInput" | "TimePickerInput")[];
export declare type FormInputType = typeof inputTypes[number];
export declare type InputComponentWithName<T> = T & {
    inputName: FormInputType;
};
export {};
