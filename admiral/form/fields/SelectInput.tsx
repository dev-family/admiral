import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Select } from '@/admiral/ui'
import type { SelectProps } from '@/admiral/ui/Select/Select'

const { OptGroup, Option } = Select

interface SelectInputProps extends SelectProps {
    name: string
    label?: string
    required?: boolean
}

const InternalSelectInput: React.FC<SelectInputProps> = ({
    name,
    label,
    required = false,
    ...options
}) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const onChange = useCallback((value) => {
        setValues((values: any) => ({ ...values, [name]: value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error}>
            <Select {...options} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}

export const SelectInput = InternalSelectInput as typeof InternalSelectInput & {
    Option: typeof Option
    OptGroup: typeof OptGroup
}

SelectInput.Option = Option
SelectInput.OptGroup = OptGroup
