import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Select } from '../../ui'
import type { SelectProps } from '../../ui/Select/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'

const { OptGroup, Option } = Select

export interface SelectInputProps extends SelectProps, FormItemProps {
    name: string
}

const InternalSelectInput: InputComponentWithName<React.FC<SelectInputProps>> = ({
    name,
    label,
    required = false,
    columnSpan,
    children,
    ...selectProps
}) => {
    const getPopupContainer = usePopupContainer()
    const { values, errors, options, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.select

    const value = values[name]
    const error = errors[name]?.[0]
    const opts = options[name]

    const onChange = useCallback((value) => {
        setValues((values: any) => ({ ...values, [name]: value }))
    }, [])

    const renderChildren = useCallback(() => {
        if (children) return children
        if (opts?.length > 0)
            return (
                <>
                    {opts.map(({ value, label }, idx) => (
                        <SelectInput.Option key={idx} value={value}>
                            {label}
                        </SelectInput.Option>
                    ))}
                </>
            )

        return []
    }, [children, opts])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Select
                getPopupContainer={getPopupContainer}
                {...selectProps}
                locale={locale}
                value={value}
                onChange={onChange}
                alert={!!error}
            >
                {renderChildren()}
            </Select>
        </Form.Item>
    )
}

InternalSelectInput.inputName = 'SelectInput'

export const SelectInput = InternalSelectInput as typeof InternalSelectInput & {
    Option: typeof Option
    OptGroup: typeof OptGroup
}

SelectInput.Option = Option
SelectInput.OptGroup = OptGroup
