import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { DatePicker } from '../../ui'
import { PickerProps } from '../../ui/DatePicker/generatePicker/interfaces'
import { FormItemProps } from '../Item'
import parseISO from 'date-fns/parseISO'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'

export type DatePickerInputProps = FormItemProps & {
    name: string
    onChange?: (value: any) => void
} & PickerProps<Date>

export const DatePickerInput: InputComponentWithName<React.FC<DatePickerInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...pickerProps
}) => {
    const getPopupContainer = usePopupContainer()
    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.datePicker

    let value = values[name] ? parseISO(values[name]) : null
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (value: Date | null) => {
            setValues((values: any) => ({ ...values, [name]: value?.toISOString() }))
            onChange?.(value?.toISOString())
        },
        [onChange],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <DatePicker
                getPopupContainer={getPopupContainer}
                locale={locale}
                {...pickerProps}
                value={value}
                onChange={_onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

DatePickerInput.inputName = 'DatePickerInput'
