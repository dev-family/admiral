import type { PickerMode } from 'rc-picker/es/interface'
import { TimeConfig, toArray } from './interfaces'

export function getTimeProps<DateType extends object>(
    props: { format?: string | string[]; picker?: PickerMode } & Omit<
        TimeConfig<DateType>,
        'format'
    >,
) {
    const { format, picker, showHour, showMinute, showSecond, use12Hours } = props

    const firstFormat = toArray(format)[0]
    const showTimeObj = { ...props }

    if (firstFormat) {
        if (!firstFormat.includes('s') && showSecond === undefined) {
            showTimeObj.showSecond = false
        }
        if (!firstFormat.includes('m') && showMinute === undefined) {
            showTimeObj.showMinute = false
        }
        if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
            showTimeObj.showHour = false
        }

        if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
            showTimeObj.use12Hours = true
        }
    }

    if (picker === 'time') {
        return showTimeObj
    }

    return {
        showTime: showTimeObj,
    }
}
