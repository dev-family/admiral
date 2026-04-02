import React from 'react'
import { TimePickerInputProps } from '../../form'
import { TimePickerExtra } from './interfaces'

export function getTimePickerExtra(
    timePicker: React.ReactElement<TimePickerInputProps>,
): TimePickerExtra {
    const {
        props: { format },
    } = timePicker

    return {
        format,
    }
}
