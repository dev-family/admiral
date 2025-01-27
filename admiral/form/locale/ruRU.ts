import { Locale } from '../interfaces'
import { ruRU as ruRuDatePickerLocale } from '../../ui/DatePicker/locales'
import { ruRU as ruRuSelectLocale } from '../../ui/Select/locales'
import { ruRU as ruRuUploadLocale } from '../../ui/Upload/locales'

export const ruRU: Locale = {
    fields: {
        array: {
            add: 'Добавить',
            remove: 'Удалить',
        },
        datePicker: ruRuDatePickerLocale,
        select: ruRuSelectLocale,
        upload: ruRuUploadLocale,
    },
    successMessage: 'Данные успешно сохранены!',
    serverErrorMessage: 'Произошла ошибка на сервере.',
}
