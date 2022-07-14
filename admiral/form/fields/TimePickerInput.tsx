import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { TimePicker, TimePickerProps as BaseTimePickerProps } from '../../ui'
import { FormItemProps } from '../Item'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'

interface TimePickerProps extends Omit<BaseTimePickerProps, 'format'> {}

export type TimePickerInputProps = FormItemProps & {
    name: string
    format: string
} & TimePickerProps

export const TimePickerInput: React.FC<TimePickerInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    ...pickerProps
}) => {
    const { values, errors, setValues } = useForm()

    const value = values[name] ? parseValue(values[name], pickerProps.format) : null

    const error = errors[name]?.[0]

    const onChange = useCallback((value: Date | null) => {
        setValues((values: any) => ({ ...values, [name]: value?.toISOString() }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <TimePicker {...pickerProps} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}

TimePickerInput.defaultProps = {
    format: 'HH:mm:ss',
}

export const parseValue = (value: string, format: string) => {
    const fullISO = parseISO(value)
    const timeOnlyISO = parse(value, format, new Date())

    if (isValid(fullISO)) return fullISO
    if (isValid(timeOnlyISO)) return timeOnlyISO

    return null
}
