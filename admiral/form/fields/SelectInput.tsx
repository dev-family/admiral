import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Select } from '@/admiral/ui'
import type { SelectProps } from '@/admiral/ui/Select/Select'
import { FormItemProps } from '../Item'

const { OptGroup, Option } = Select

interface SelectInputProps extends SelectProps, FormItemProps {
    name: string
}

const InternalSelectInput: React.FC<SelectInputProps> = ({
    name,
    label,
    required = false,
    columnSpan,
    children,
    ...selectProps
}) => {
    const { values, errors, options, setValues } = useForm()
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
            <Select {...selectProps} value={value} onChange={onChange} alert={!!error}>
                {renderChildren()}
            </Select>
        </Form.Item>
    )
}

export const SelectInput = InternalSelectInput as typeof InternalSelectInput & {
    Option: typeof Option
    OptGroup: typeof OptGroup
}

SelectInput.Option = Option
SelectInput.OptGroup = OptGroup
