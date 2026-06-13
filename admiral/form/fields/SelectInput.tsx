import React, { useCallback, useMemo } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Select } from '../../ui'
import type { SelectProps } from '../../ui/Select/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

const { OptGroup, Option } = Select

export interface SelectInputProps extends SelectProps, FormItemProps, FieldRuleProps {
    name: string
    onChange?: (value: any) => void
}

const InternalSelectInput: InputComponentWithName<(props: SelectInputProps) => React.JSX.Element> =
    function InternalSelectInput({
        name,
        label,
        required = false,
        columnSpan,
        children,
        onChange,
        ...selectProps
    }: SelectInputProps) {
        const getPopupContainer = usePopupContainer()
        const { values, errors, options, setValues, locale: formLocale } = useForm()
        const locale = formLocale.fields.select

        const value = values[name]
        const error = errors[name]?.[0]
        const opts = options[name]

        const _onChange = useCallback(
            (value: any) => {
                setValues((values: any) => ({ ...values, [name]: value }))
                onChange?.(value)
            },
            [name, onChange],
        )

        const renderChildren = useCallback(() => {
            if (children) return children
            if (opts?.length > 0)
                return (
                    <>
                        {opts.map(({ value, label }) => (
                            <Option key={value} value={value}>
                                {label}
                            </Option>
                        ))}
                    </>
                )

            return []
        }, [children, opts])

        const childrenToRender = useMemo(() => renderChildren(), [renderChildren])

        const hasAvailableOptions = (() => {
            if (children) {
                if (Array.isArray(children)) {
                    return children.length > 0
                }
                return !!children
            }

            return opts?.length > 0
        })()

        const isValueHidden = !!value && !hasAvailableOptions

        return (
            <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
                <Select
                    getPopupContainer={getPopupContainer}
                    {...selectProps}
                    locale={locale}
                    value={isValueHidden ? undefined : value}
                    onChange={_onChange}
                    alert={!!error}
                >
                    {childrenToRender}
                </Select>
            </Form.Item>
        )
    }

InternalSelectInput.inputName = 'SelectInput'

export const SelectInput = withFieldRules(InternalSelectInput) as InputComponentWithName<
    (props: SelectInputProps) => React.JSX.Element | null
> & {
    Option: typeof Option
    OptGroup: typeof OptGroup
}

SelectInput.Option = Option
SelectInput.OptGroup = OptGroup
