import CalendarLocale from 'rc-picker/lib/locale/ru_RU'
import { PickerLocale } from '../generatePicker/interfaces'

export const ruRU: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Дата начала', 'Дата окончания'],
        rangeYearPlaceholder: ['Год начала', 'Год окончания'],
        rangeMonthPlaceholder: ['Месяц начала', 'Месяц окончания'],
        rangeWeekPlaceholder: ['Неделя начала', 'Неделя окончания'],
        ...CalendarLocale,
    },
}
