import CalendarLocale from 'rc-picker/lib/locale/ru_RU'
import { PickerLocale } from '../generatePicker/interfaces'

const locale: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
        rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
        rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
        ...CalendarLocale,
        locale: 'ru',
    },
}

export default locale
