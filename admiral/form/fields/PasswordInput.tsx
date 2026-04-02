import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Password } from '../../ui'
import type { InputProps } from '../../ui/Input/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export interface PasswordInputProps extends InputProps, FormItemProps {
    name: string
    onChange?: (value: any) => void
}

export const PasswordInput: InputComponentWithName<
    (props: PasswordInputProps) => React.JSX.Element
> = function PasswordInput({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...inputProps
}: PasswordInputProps) {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (e: any) => {
            setValues((values: any) => ({ ...values, [name]: e.target.value }))
            onChange?.(e.target.value)
        },
        [onChange],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Password
                autoComplete="new-password"
                {...inputProps}
                name={name}
                value={value}
                onChange={_onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

PasswordInput.inputName = 'PasswordInput'
