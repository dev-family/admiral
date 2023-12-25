import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { RangePicker } from '../../ui'
import { PickerRangeProps } from '../../ui/DatePicker/generatePicker/interfaces'
import { FormItemProps } from '../Item'
import parseISO from 'date-fns/parseISO'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'
import { RangeValue } from 'rc-picker/lib/interface'

export type DateRangePickerInputProps = FormItemProps & {
    name: string
    onChange?: (value: any) => void
    showTime?: boolean
} & PickerRangeProps<Date>

export const DateRangePickerInput: InputComponentWithName<React.FC<DateRangePickerInputProps>> = ({
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

    let value = values[name]
        ? values[name].map((rangeValue: string | Date) =>
              typeof rangeValue === 'string' ? parseISO(rangeValue) : rangeValue,
          )
        : undefined

    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (changeValues: RangeValue<Date>, formatString: [string, string]) => {
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

DateRangePickerInput.inputName = 'DateRangePickerInput'
