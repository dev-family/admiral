import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { RangePicker } from '../../ui'
import { PickerRangeProps } from '../../ui/DatePicker/generatePicker/interfaces'
import { FormItemProps } from '../Item'
import { parseISO } from 'date-fns'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'
import type { NoUndefinedRangeValueType } from 'rc-picker/es/PickerInput/RangePicker'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export type DateRangePickerInputProps = FormItemProps &
    FieldRuleProps & {
        name: string
        onChange?: (value: any) => void
    } & PickerRangeProps<Date>

const DateRangePickerInputBase: InputComponentWithName<
    (props: DateRangePickerInputProps) => React.JSX.Element
> = function DateRangePickerInput({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...pickerProps
}: DateRangePickerInputProps) {
    const getPopupContainer = usePopupContainer()

    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.datePicker

    const value = values[name]
        ? values[name].map((rangeValue: string | Date) =>
              typeof rangeValue === 'string' ? parseISO(rangeValue) : rangeValue,
          )
        : undefined

    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (changeValues: NoUndefinedRangeValueType<Date> | null, _formatString: [string, string]) => {
            setValues((prevValues: any) => ({ ...prevValues, [name]: changeValues }))
            onChange?.(changeValues)
        },
        [onChange],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <RangePicker
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

DateRangePickerInputBase.inputName = 'DateRangePickerInput'

export const DateRangePickerInput = withFieldRules(DateRangePickerInputBase)
