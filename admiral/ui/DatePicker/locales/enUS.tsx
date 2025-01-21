import CalendarLocale from 'rc-picker/lib/locale/en_US'
import { PickerLocale } from '../generatePicker/interfaces'

export const enUS: PickerLocale = {
    lang: {
        placeholder: 'Select date',
        yearPlaceholder: 'Select year',
        quarterPlaceholder: 'Select quarter',
        monthPlaceholder: 'Select month',
        weekPlaceholder: 'Select week',
        rangePlaceholder: ['Start date', 'End date'],
        rangeYearPlaceholder: ['Start year', 'End year'],
        rangeMonthPlaceholder: ['Start month', 'End month'],
        rangeWeekPlaceholder: ['Start week', 'End week'],
        ...CalendarLocale,
    },
}
