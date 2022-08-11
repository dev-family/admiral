import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { TimePicker, TimePickerProps as BaseTimePickerProps } from '../../ui'
import { FormItemProps } from '../Item'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'

interface TimePickerProps extends Omit<BaseTimePickerProps, 'format'> {}

export type TimePickerInputProps = FormItemProps & {
    name: string
    format: string
} & TimePickerProps

export const TimePickerInput: InputComponentWithName<React.FC<TimePickerInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    ...pickerProps
}) => {
    const getPopupContainer = usePopupContainer()
    const { values, errors, setValues } = useForm()

    const value = values[name] ? parseValue(values[name], pickerProps.format) : null

    const error = errors[name]?.[0]

    const onChange = useCallback((value: Date | null) => {
        setValues((values: any) => ({ ...values, [name]: value?.toISOString() }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <TimePicker
                getPopupContainer={getPopupContainer}
                {...pickerProps}
                value={value}
                onChange={onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

TimePickerInput.defaultProps = {
    format: 'HH:mm:ss',
}

TimePickerInput.inputName = 'TimePickerInput'

export const parseValue = (value: string, format: string) => {
    const fullISO = parseISO(value)
    const timeOnlyISO = parse(value, format, new Date())

    if (isValid(fullISO)) return fullISO
    if (isValid(timeOnlyISO)) return timeOnlyISO

    return null
}
