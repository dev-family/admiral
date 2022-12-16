import { Locale } from '../interfaces'
import ruDatePickerLocale from '../../ui/DatePicker/locale/ru_RU'
import { ruRu as ruRuSelectLocale } from '../../ui/Select/locales/ruRu'
import { ruRU as ruRuUploadLocale } from '../../ui/Upload/locales/ruRU'

export const ruRU: Locale = {
    fields: {
        array: {
            add: 'Добавить',
            remove: 'Удалить',
        },
        editor: 'ru',
        datePicker: ruDatePickerLocale,
        select: ruRuSelectLocale,
        upload: ruRuUploadLocale,
    },
    successMessage: 'Данные успешно сохранены!',
}
