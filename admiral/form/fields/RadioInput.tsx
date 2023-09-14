import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { RadioGroup } from '../../ui'
import { FormItemProps } from '../Item'
import type { RadioGroupProps } from '../../ui/Radio/interfaces'
import { InputComponentWithName } from '../interfaces'

export interface RadioInputProps extends RadioGroupProps, FormItemProps {
    name: string
}

export const RadioInput: InputComponentWithName<React.FC<RadioInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    ...inputProps
}) => {
    const { values, errors, options, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]
    const opts = options[name]

    const onChange = useCallback((e) => {
        setValues((values: any) => ({ ...values, [name]: e.target.value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <RadioGroup
                options={opts}
                {...inputProps}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Form.Item>
    )
}

RadioInput.inputName = 'RadioInput'
