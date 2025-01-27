import { Locale } from '../interfaces'
import { enUS as enUsDatePickerLocale } from '../../ui/DatePicker/locales'
import { enUS as enUsSelectLocale } from '../../ui/Select/locales'
import { enUS as enUsUploadLocale } from '../../ui/Upload/locales'

export const enUS: Locale = {
    fields: {
        array: {
            add: 'Add',
            remove: 'Remove',
        },
        datePicker: enUsDatePickerLocale,
        select: enUsSelectLocale,
        upload: enUsUploadLocale,
    },
    successMessage: 'Data saved successfully!',
    serverErrorMessage: 'An error occurred on the server.',
}
