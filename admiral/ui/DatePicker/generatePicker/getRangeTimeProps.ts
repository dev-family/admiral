import { PickerMode } from 'rc-picker/lib/interface'
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel'
import { toArray } from './interfaces'

export function getRangeTimeProps<DateType>(
    props: {
        format?: string
        picker?: PickerMode
    } & Omit<SharedTimeProps<DateType>, 'defaultValue' | 'disabledTime'>,
) {
    const { format, picker, showHour, showMinute, showSecond, use12Hours } = props

    const firstFormat = toArray(format)[0]
    const showTimeObj: SharedTimeProps<DateType> = { ...props }

    if (firstFormat && typeof firstFormat === 'string') {
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

    if (typeof firstFormat === 'function') {
        // format of showTime should use default when format is custom format function
        delete showTimeObj.format
    }

    return {
        showTime: showTimeObj,
    }
}
