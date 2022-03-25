import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { DatePicker } from '../../ui'
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces'
import { FormItemProps } from '../Item'
import parseISO from 'date-fns/parseISO'

export type DatePickerInputProps = FormItemProps & {
    name: string
} & PickerProps<Date>

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
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
            <DatePicker {...pickerProps} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}
