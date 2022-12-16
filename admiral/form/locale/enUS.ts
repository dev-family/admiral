import { Locale } from '../interfaces'
import enUsDatePickerLocale from '../../ui/DatePicker/locale/en_US'
import { enUs as enUsSelectLocale } from '../../ui/Select/locales/enUS'
import { enUS as enUsUploadLocale } from '../../ui/Upload/locales/enUS'

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
}
