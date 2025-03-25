import { format, formatISO } from 'date-fns'
import { DateOutputFormat } from '../../ui/DatePicker/generatePicker/interfaces'

export const getTransformedDate = ({ type, date }: { type: DateOutputFormat; date: Date }) => {
    switch (type) {
        case 'iso':
            return formatISO(date)
        case 'utc':
            return date.toISOString()
    }
}
