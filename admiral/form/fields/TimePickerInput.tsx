import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { TimePicker, TimePickerProps as BaseTimePickerProps } from '../../ui'
import { FormItemProps } from '../Item'
import { parse, isValid, parseISO } from 'date-fns'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'
import { getTransformedDate } from '../../utils/helpers/getTransformedDate'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

interface TimePickerProps extends Omit<BaseTimePickerProps, 'format'> {}

export type TimePickerInputProps = FormItemProps &
    FieldRuleProps & {
        name: string
        format: string
        onChange?: (value: any) => void
    } & TimePickerProps

const TimePickerInputBase: InputComponentWithName<
    (props: TimePickerInputProps) => React.JSX.Element
> = function TimePickerInput({
    name,
    label,
    required,
    columnSpan,
    onChange,
    format = 'HH:mm:ss',
    dateOutputFormat = 'utc',
    ...pickerProps
}: TimePickerInputProps) {
    const getPopupContainer = usePopupContainer()
    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.datePicker

    const value = values[name] ? parseValue(values[name], format) : null

    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (value: Date | null) => {
            const transformedDate = value
                ? getTransformedDate({ date: value, type: dateOutputFormat })
                : null

            setValues((values: any) => ({ ...values, [name]: transformedDate }))
            onChange?.(transformedDate)
        },
        [onChange],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <TimePicker
                getPopupContainer={getPopupContainer}
                {...pickerProps}
                format={format}
                locale={locale}
                value={value}
                onChange={_onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

TimePickerInputBase.inputName = 'TimePickerInput'

export const TimePickerInput = withFieldRules(TimePickerInputBase)

export const parseValue = (value: string, format: string) => {
    const fullISO = parseISO(value)
    const timeOnlyISO = parse(value, format, new Date())

    if (isValid(fullISO)) return fullISO
    if (isValid(timeOnlyISO)) return timeOnlyISO

    return null
}
