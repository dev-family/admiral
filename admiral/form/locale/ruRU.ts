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
    tabErrors: (count: number) => {
        const mod10 = count % 10
        const mod100 = count % 100
        if (mod10 === 1 && mod100 !== 11) return `${count} ошибка`
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} ошибки`
        return `${count} ошибок`
    },
}
