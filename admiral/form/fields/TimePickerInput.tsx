import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { TimePicker, TimePickerProps } from '../../ui'
import { FormItemProps } from '../Item'
import parseISO from 'date-fns/parseISO'

export type TimePickerInputProps = FormItemProps & {
    name: string
} & TimePickerProps

export const TimePickerInput: React.FC<TimePickerInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    ...pickerProps
}) => {
    const { values, errors, setValues } = useForm()

    let value = values[name] ? parseISO(values[name]) : null
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
