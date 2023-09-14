import { SelectLocale } from '../ui/Select/interfaces'
import { PickerLocale } from '../ui/DatePicker/generatePicker/interfaces'
import { EditorLocaleType } from '../ui/Editor/interfaces'
import { UploadLocale } from '../ui/Upload/interfaces'
import { tuple } from '../utils/type'

export type Locale = {
    successMessage: string
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

const inputTypes = tuple(...Object.values(INPUT_NAMES))
export type FormInputType = typeof inputTypes[number]

export type InputComponentWithName<T> = T & { inputName: FormInputType }
