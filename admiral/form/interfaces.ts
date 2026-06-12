import { SelectLocale } from '../ui/Select/interfaces'
import { PickerLocale } from '../ui/DatePicker/generatePicker/interfaces'
import { EditorLocaleType } from '../ui/Editor/interfaces'
import { UploadLocale } from '../ui/Upload/interfaces'

export type Locale = {
    successMessage: string
    serverErrorMessage: string
    /** Accessible label for the Form.Tabs error badge, e.g. "2 errors" */
    tabErrors?: (count: number) => string
    fields: {
        array?: ArrayInputLocale
        editor?: EditorLocaleType
        datePicker?: PickerLocale
        select?: SelectLocale
        upload?: UploadLocale
    }
}

export type ArrayInputLocale = {
    add: string
    remove: string
}

export const INPUT_NAMES = {
    array: 'ArrayInput',
    boolean: 'BooleanInput',
    colorPicker: 'ColorPickerInput',
    datePicker: 'DatePickerInput',
    dateRangePicker: 'DateRangePickerInput',
    dragger: 'DraggerInput',
    editor: 'EditorInput',
    filePicture: 'FilePictureInput',
    multilineText: 'MultilineTextInput',
    password: 'PasswordInput',
    select: 'SelectInput',
    text: 'TextInput',
    timePicker: 'TimePickerInput',
    slug: 'SlugInput',
    translatable: 'TranslatableInput',
    ajaxSelectInput: 'AjaxSelectInput',
    radio: 'RadioInput',
} as const

export type FormInputType = (typeof INPUT_NAMES)[keyof typeof INPUT_NAMES]

export type InputComponentWithName<T> = T & { inputName: FormInputType }
