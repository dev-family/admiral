import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Input } from '../../ui'
import type { InputProps } from '../../ui/Input/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export interface TextInputProps extends InputProps, FormItemProps {
    name: string
    onChange?: (value: any) => void
}

export const TextInput: InputComponentWithName<(props: TextInputProps) => React.JSX.Element> =
    function TextInput({
        name,
        label,
        required,
        columnSpan,
        onChange,
        ...inputProps
    }: TextInputProps) {
        const { values, errors, setValues } = useForm()
        const value = values[name]
        const error = errors[name]?.[0]

        const _onChange = useCallback(
            (e: any) => {
                setValues((values: any) => ({ ...values, [name]: e.target.value }))
                onChange?.(e.target.value)
            },
            [name, onChange],
        )

        return (
            <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
                <Input
                    {...inputProps}
                    name={name}
                    value={value}
                    onChange={_onChange}
                    alert={!!error}
                />
            </Form.Item>
        )
    }

TextInput.inputName = 'TextInput'
