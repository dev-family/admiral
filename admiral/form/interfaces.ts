import { tuple } from '../utils/type'

export type Locale = {
    fields: {
        array: ArrayInputLocale
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
} as const

const inputTypes = tuple(...Object.values(INPUT_NAMES))
export type FormInputType = typeof inputTypes[number]

export type InputComponentWithName<T> = T & { inputName: FormInputType }
